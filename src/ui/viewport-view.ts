import { Compositor, GizmoHitResult } from '../engine/compositor';
import { TimelineState, TimelineClip, getEffectiveClipTransform, getResolutionForAspectRatio } from '../engine/timeline';
import { t } from './i18n';

export interface ViewportCallbacks {
  onClipTransformChange: (clipId: string, transform: { x: number; y: number; scale: number; rotation: number }) => void;
  onClipSelect: (clipId: string | null) => void;
  onAspectRatioChange: (ratio: '16:9' | '9:16' | '1:1' | '4:5' | '21:9') => void;
}

export class ViewportView {
  private container: HTMLElement;
  public canvas: HTMLCanvasElement;
  public compositor: Compositor;
  private callbacks: ViewportCallbacks;
  private state: TimelineState;

  // Interaction State
  private isDragging: boolean = false;
  private dragMode: 'body' | 'scale' | 'rotate' | 'none' = 'none';
  private dragStartMouse = { x: 0, y: 0 };
  private initialTransform = { x: 0, y: 0, scale: 100, rotation: 0 };
  private initialBounds = { w: 300, h: 160 };

  constructor(container: HTMLElement, state: TimelineState, callbacks: ViewportCallbacks) {
    this.container = container;
    this.state = state;
    this.callbacks = callbacks;

    this.container.innerHTML = `
      <div class="viewport-toolbar">
        <div class="viewport-left-tools">
          <div class="ratio-selector-group">
            <span class="toolbar-label">${t('aspectRatio')}:</span>
            <select id="ratio-select" class="studio-select">
              <option value="16:9" ${state.aspectRatio === '16:9' ? 'selected' : ''}>16:9 (Cinema / YouTube)</option>
              <option value="9:16" ${state.aspectRatio === '9:16' ? 'selected' : ''}>9:16 (TikTok / Reels)</option>
              <option value="1:1" ${state.aspectRatio === '1:1' ? 'selected' : ''}>1:1 (Square Feed)</option>
              <option value="4:5" ${state.aspectRatio === '4:5' ? 'selected' : ''}>4:5 (Portrait)</option>
              <option value="21:9" ${state.aspectRatio === '21:9' ? 'selected' : ''}>21:9 (Anamorphic UltraWide)</option>
            </select>
          </div>
          <span class="res-badge" id="viewport-res-badge">${state.canvasWidth} × ${state.canvasHeight}</span>
        </div>

        <div class="viewport-right-tools">
          <button id="btn-snapshot" class="studio-btn-sm" title="${t('exportSnapshot')}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
            <span>${t('exportSnapshot')}</span>
          </button>
        </div>
      </div>

      <div class="canvas-viewport-container" id="canvas-wrapper">
        <div class="canvas-frame" id="canvas-frame">
          <canvas id="studio-canvas"></canvas>
        </div>
      </div>
    `;

    this.canvas = this.container.querySelector('#studio-canvas') as HTMLCanvasElement;
    this.compositor = new Compositor(this.canvas);
    this.resizeCanvas();
    this.setupEventListeners();
  }

  public updateState(state: TimelineState) {
    this.state = state;
    const badge = this.container.querySelector('#viewport-res-badge');
    if (badge) {
      badge.textContent = `${state.canvasWidth} × ${state.canvasHeight}`;
    }
  }

  public resizeCanvas() {
    this.canvas.width = this.state.canvasWidth;
    this.canvas.height = this.state.canvasHeight;
    this.updateViewportFit();
  }

  public updateViewportFit() {
    const wrapper = this.container.querySelector('#canvas-wrapper') as HTMLElement;
    const frame = this.container.querySelector('#canvas-frame') as HTMLElement;
    if (!wrapper || !frame) return;

    const availableW = wrapper.clientWidth - 40;
    const availableH = wrapper.clientHeight - 40;

    const scale = Math.min(
      availableW / this.state.canvasWidth,
      availableH / this.state.canvasHeight,
      1
    );

    const displayW = this.state.canvasWidth * scale;
    const displayH = this.state.canvasHeight * scale;

    frame.style.width = `${displayW}px`;
    frame.style.height = `${displayH}px`;
  }

  private setupEventListeners() {
    const ratioSelect = this.container.querySelector('#ratio-select') as HTMLSelectElement;
    ratioSelect?.addEventListener('change', (e) => {
      const val = (e.target as HTMLSelectElement).value as any;
      this.callbacks.onAspectRatioChange(val);
    });

    const btnSnapshot = this.container.querySelector('#btn-snapshot') as HTMLButtonElement;
    btnSnapshot?.addEventListener('click', () => {
      this.exportSnapshot();
    });

    // Viewport resize observer
    window.addEventListener('resize', () => this.updateViewportFit());

    // Mouse interactions for Gizmo
    this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
    window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    window.addEventListener('mouseup', () => this.handleMouseUp());
  }

  private getCanvasPoint(e: MouseEvent): { x: number; y: number } {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  }

  private handleMouseDown(e: MouseEvent) {
    if (!this.state.selectedClipId) return;
    const selected = this.state.clips.find(c => c.id === this.state.selectedClipId);
    if (!selected) return;

    const pt = this.getCanvasPoint(e);
    const transform = getEffectiveClipTransform(selected, this.state.currentTime);
    const centerX = (this.canvas.width / 2) + transform.x;
    const centerY = (this.canvas.height / 2) + transform.y;

    // Check hit test relative to selected clip center
    const dx = pt.x - centerX;
    const dy = pt.y - centerY;

    // Un-rotate the point
    const rad = (-transform.rotation * Math.PI) / 180;
    const localX = (dx * Math.cos(rad) - dy * Math.sin(rad)) / (transform.scale / 100);
    const localY = (dx * Math.sin(rad) + dy * Math.cos(rad)) / (transform.scale / 100);

    const bounds = this.compositor.getClipBaseBounds(selected);
    const halfW = bounds.w / 2;
    const halfH = bounds.h / 2;

    // 1. Check rotate handle (above top center)
    const rotateDist = 30 / (transform.scale / 100);
    const distToRotate = Math.hypot(localX - 0, localY - (-halfH - rotateDist));
    if (distToRotate < 25) {
      this.isDragging = true;
      this.dragMode = 'rotate';
      this.dragStartMouse = { x: pt.x, y: pt.y };
      this.initialTransform = { ...transform };
      return;
    }

    // 2. Check corners
    const cornerHitRadius = 25;
    const corners = [
      [-halfW, -halfH],
      [halfW, -halfH],
      [-halfW, halfH],
      [halfW, halfH]
    ];

    for (const [cx, cy] of corners) {
      if (Math.hypot(localX - cx, localY - cy) < cornerHitRadius) {
        this.isDragging = true;
        this.dragMode = 'scale';
        this.dragStartMouse = { x: pt.x, y: pt.y };
        this.initialTransform = { ...transform };
        this.initialBounds = { ...bounds };
        return;
      }
    }

    // 3. Check inside bounding box
    if (Math.abs(localX) <= halfW && Math.abs(localY) <= halfH) {
      this.isDragging = true;
      this.dragMode = 'body';
      this.dragStartMouse = { x: pt.x, y: pt.y };
      this.initialTransform = { ...transform };
    }
  }

  private handleMouseMove(e: MouseEvent) {
    if (!this.isDragging || !this.state.selectedClipId) return;
    const selected = this.state.clips.find(c => c.id === this.state.selectedClipId);
    if (!selected) return;

    const pt = this.getCanvasPoint(e);

    if (this.dragMode === 'body') {
      const deltaX = pt.x - this.dragStartMouse.x;
      const deltaY = pt.y - this.dragStartMouse.y;
      this.callbacks.onClipTransformChange(selected.id, {
        x: Math.round(this.initialTransform.x + deltaX),
        y: Math.round(this.initialTransform.y + deltaY),
        scale: this.initialTransform.scale,
        rotation: this.initialTransform.rotation
      });
    } else if (this.dragMode === 'scale') {
      const centerX = (this.canvas.width / 2) + this.initialTransform.x;
      const centerY = (this.canvas.height / 2) + this.initialTransform.y;
      const initDist = Math.hypot(this.dragStartMouse.x - centerX, this.dragStartMouse.y - centerY);
      const currDist = Math.hypot(pt.x - centerX, pt.y - centerY);
      if (initDist > 0) {
        const factor = currDist / initDist;
        const newScale = Math.max(10, Math.min(500, Math.round(this.initialTransform.scale * factor)));
        this.callbacks.onClipTransformChange(selected.id, {
          x: this.initialTransform.x,
          y: this.initialTransform.y,
          scale: newScale,
          rotation: this.initialTransform.rotation
        });
      }
    } else if (this.dragMode === 'rotate') {
      const centerX = (this.canvas.width / 2) + this.initialTransform.x;
      const centerY = (this.canvas.height / 2) + this.initialTransform.y;
      const angleRad = Math.atan2(pt.y - centerY, pt.x - centerX);
      const deg = Math.round((angleRad * 180) / Math.PI) + 90;
      this.callbacks.onClipTransformChange(selected.id, {
        x: this.initialTransform.x,
        y: this.initialTransform.y,
        scale: this.initialTransform.scale,
        rotation: (deg + 360) % 360
      });
    }
  }

  private handleMouseUp() {
    this.isDragging = false;
    this.dragMode = 'none';
  }

  public exportSnapshot() {
    // Generate high-resolution snapshot download
    const link = document.createElement('a');
    link.download = `CineMotion_Snapshot_${Date.now()}.png`;
    link.href = this.canvas.toDataURL('image/png');
    link.click();
  }
}
