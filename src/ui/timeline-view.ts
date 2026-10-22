import { TimelineState, TimelineClip, TimelineTrack, secondsToTimecode } from '../engine/timeline';
import { t } from './i18n';

export interface TimelineCallbacks {
  onPlayToggle: () => void;
  onSeek: (time: number) => void;
  onLoopToggle: () => void;
  onClipMove: (clipId: string, newStart: number) => void;
  onClipTrim: (clipId: string, newStart: number, newDur: number) => void;
  onClipSelect: (clipId: string | null) => void;
  onClipSplit: (clipId: string) => void;
  onClipDuplicate: (clipId: string) => void;
  onClipDelete: (clipId: string) => void;
  onTrackToggle: (trackId: string, prop: 'muted' | 'solo' | 'locked' | 'hidden') => void;
}

export class TimelineView {
  private container: HTMLElement;
  private state: TimelineState;
  private callbacks: TimelineCallbacks;

  // Visual Timeline scaling
  private pixelsPerSecond: number = 40; // Zoom factor
  private isScrubbing: boolean = false;
  private draggingClipId: string | null = null;
  private dragMode: 'move' | 'trim-start' | 'trim-end' | 'none' = 'none';
  private dragStartX: number = 0;
  private initialClipStart: number = 0;
  private initialClipDur: number = 0;

  constructor(container: HTMLElement, state: TimelineState, callbacks: TimelineCallbacks) {
    this.container = container;
    this.state = state;
    this.callbacks = callbacks;

    this.render();
    this.setupGlobalEvents();
  }

  public updateState(state: TimelineState) {
    this.state = state;
    this.updatePlayheadOnly();
    this.updateTimecodeDisplay();
    this.renderClipsOnly();
    this.updateTransportButtons();
  }

  public render() {
    this.container.innerHTML = `
      <div class="timeline-header-bar">
        <div class="transport-controls">
          <button id="btn-rewind" class="transport-btn" title="${t('rewind')}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 19 2 12 11 5 11 19"/><polygon points="22 19 13 12 22 5 22 19"/></svg>
          </button>
          <button id="btn-play" class="transport-btn play-btn" title="${t('play')} / ${t('pause')}">
            <svg id="play-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </button>
          <button id="btn-loop" class="transport-btn ${this.state.isLooping ? 'active' : ''}" title="${t('loop')}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
          </button>
        </div>

        <div class="timecode-display-box" id="timecode-box">
          <span class="tc-label">TC</span>
          <span class="tc-digits" id="timecode-digits">00:00:00:00</span>
          <span class="fps-badge">30 FPS</span>
        </div>

        <div class="timeline-action-tools">
          <button id="btn-split" class="tool-btn" title="${t('splitClip')}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>
            <span>${t('splitClip')}</span>
          </button>
          <button id="btn-dup" class="tool-btn" title="${t('duplicateClip')}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            <span>${t('duplicateClip')}</span>
          </button>
          <button id="btn-del" class="tool-btn danger" title="${t('deleteClip')}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            <span>${t('deleteClip')}</span>
          </button>
        </div>

        <div class="timeline-zoom-control">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
          <input type="range" id="zoom-slider" min="20" max="100" value="${this.pixelsPerSecond}" class="studio-slider-sm">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
        </div>
      </div>

      <div class="timeline-workspace-wrapper">
        <!-- Left Tracks Header -->
        <div class="tracks-header-column">
          <div class="ruler-corner-spacer">
            <span>TRACKS</span>
          </div>
          <div class="tracks-header-list" id="tracks-header-list">
            ${this.renderTrackHeaders()}
          </div>
        </div>

        <!-- Right Tracks Timeline Grid & Ruler -->
        <div class="tracks-content-scroll" id="tracks-content-scroll">
          <div class="timeline-inner-canvas" id="timeline-inner-canvas" style="width: ${this.state.duration * this.pixelsPerSecond + 200}px;">
            <!-- Interactive Time Ruler -->
            <div class="timeline-ruler" id="timeline-ruler">
              ${this.renderRulerTicks()}
            </div>

            <!-- Playhead Needle -->
            <div class="timeline-playhead" id="timeline-playhead">
              <div class="playhead-handle"></div>
              <div class="playhead-line"></div>
            </div>

            <!-- Tracks lanes container -->
            <div class="tracks-lanes-container" id="tracks-lanes-container">
              ${this.renderTrackLanes()}
            </div>
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
    this.updatePlayheadOnly();
    this.updateTimecodeDisplay();
  }

  private renderTrackHeaders(): string {
    return this.state.tracks.map(tData => `
      <div class="track-header-item ${tData.locked ? 'locked' : ''} ${tData.muted ? 'muted' : ''}" data-track-id="${tData.id}">
        <div class="track-info">
          <span class="track-indicator ${tData.type}"></span>
          <span class="track-name">${t(tData.nameKey as any)}</span>
        </div>
        <div class="track-toggles">
          <button class="track-toggle-btn ${tData.muted ? 'active' : ''}" data-action="muted" title="${t('mute')}">M</button>
          <button class="track-toggle-btn ${tData.solo ? 'active' : ''}" data-action="solo" title="${t('solo')}">S</button>
          <button class="track-toggle-btn ${tData.locked ? 'active' : ''}" data-action="locked" title="${t('lock')}">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </button>
        </div>
      </div>
    `).join('');
  }

  private renderRulerTicks(): string {
    const totalSec = Math.ceil(this.state.duration) + 2;
    let html = '';
    for (let s = 0; s <= totalSec; s++) {
      const left = s * this.pixelsPerSecond;
      const tc = secondsToTimecode(s, 30);
      html += `
        <div class="ruler-major-tick" style="left: ${left}px;">
          <span class="tick-label">${tc.slice(3, 8)}</span>
        </div>
      `;
      // Minor ticks for half-seconds
      const halfLeft = (s + 0.5) * this.pixelsPerSecond;
      html += `<div class="ruler-minor-tick" style="left: ${halfLeft}px;"></div>`;
    }
    return html;
  }

  private renderTrackLanes(): string {
    return this.state.tracks.map(track => {
      const clips = this.state.clips.filter(c => c.trackId === track.id);
      return `
        <div class="track-lane-row" data-track-id="${track.id}">
          <div class="lane-grid-lines"></div>
          ${clips.map(clip => this.renderClipPill(clip)).join('')}
        </div>
      `;
    }).join('');
  }

  private renderClipPill(clip: TimelineClip): string {
    const left = clip.startTime * this.pixelsPerSecond;
    const width = Math.max(16, clip.duration * this.pixelsPerSecond);
    const isSelected = clip.id === this.state.selectedClipId;

    // Count keyframes
    const kfCount = Object.values(clip.keyframes || {}).reduce((acc, kfs) => acc + (kfs?.length || 0), 0);

    return `
      <div class="timeline-clip-pill ${isSelected ? 'selected' : ''}"
           data-clip-id="${clip.id}"
           style="left: ${left}px; width: ${width}px; --clip-color: ${clip.color};">
        <div class="clip-trim-handle start" data-handle="start"></div>
        <div class="clip-content-body" data-handle="body">
          <span class="clip-pill-icon">${this.getClipIcon(clip.type)}</span>
          <span class="clip-pill-title">${clip.name}</span>
          <span class="clip-pill-dur">${clip.duration.toFixed(1)}s</span>
          ${kfCount > 0 ? `<span class="clip-kf-badge">◆ ${kfCount}</span>` : ''}
        </div>
        <div class="clip-trim-handle end" data-handle="end"></div>
      </div>
    `;
  }

  private getClipIcon(type: string): string {
    switch (type) {
      case 'generative': return '✦';
      case 'text': return 'T';
      case 'shape': return '◆';
      case 'audio': return '♫';
      case 'image': return '🖼';
      default: return '▶';
    }
  }

  private renderClipsOnly() {
    const container = this.container.querySelector('#tracks-lanes-container');
    if (container) {
      container.innerHTML = this.renderTrackLanes();
    }
  }

  private updatePlayheadOnly() {
    const playhead = this.container.querySelector('#timeline-playhead') as HTMLElement;
    if (playhead) {
      const left = this.state.currentTime * this.pixelsPerSecond;
      playhead.style.left = `${left}px`;
    }
  }

  private updateTimecodeDisplay() {
    const digits = this.container.querySelector('#timecode-digits');
    if (digits) {
      digits.textContent = secondsToTimecode(this.state.currentTime, 30);
    }
  }

  private updateTransportButtons() {
    const playIcon = this.container.querySelector('#play-icon');
    if (playIcon) {
      if (this.state.isPlaying) {
        playIcon.outerHTML = `<svg id="play-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`;
      } else {
        playIcon.outerHTML = `<svg id="play-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;
      }
    }

    const loopBtn = this.container.querySelector('#btn-loop');
    if (loopBtn) {
      loopBtn.classList.toggle('active', this.state.isLooping);
    }
  }

  private attachEvents() {
    // Play/Pause
    this.container.querySelector('#btn-play')?.addEventListener('click', () => {
      this.callbacks.onPlayToggle();
    });

    // Rewind
    this.container.querySelector('#btn-rewind')?.addEventListener('click', () => {
      this.callbacks.onSeek(0);
    });

    // Loop
    this.container.querySelector('#btn-loop')?.addEventListener('click', () => {
      this.callbacks.onLoopToggle();
    });

    // Split clip
    this.container.querySelector('#btn-split')?.addEventListener('click', () => {
      if (this.state.selectedClipId) {
        this.callbacks.onClipSplit(this.state.selectedClipId);
      }
    });

    // Duplicate clip
    this.container.querySelector('#btn-dup')?.addEventListener('click', () => {
      if (this.state.selectedClipId) {
        this.callbacks.onClipDuplicate(this.state.selectedClipId);
      }
    });

    // Delete clip
    this.container.querySelector('#btn-del')?.addEventListener('click', () => {
      if (this.state.selectedClipId) {
        this.callbacks.onClipDelete(this.state.selectedClipId);
      }
    });

    // Zoom Slider
    const zoom = this.container.querySelector('#zoom-slider') as HTMLInputElement;
    zoom?.addEventListener('input', (e) => {
      this.pixelsPerSecond = Number((e.target as HTMLInputElement).value);
      this.render();
    });

    // Track toggles (Mute, Solo, Lock)
    this.container.querySelector('#tracks-header-list')?.addEventListener('click', (e) => {
      const btn = (e.target as HTMLElement).closest('.track-toggle-btn') as HTMLElement;
      if (!btn) return;
      const trackItem = btn.closest('.track-header-item') as HTMLElement;
      const trackId = trackItem?.dataset.trackId;
      const action = btn.dataset.action as any;
      if (trackId && action) {
        this.callbacks.onTrackToggle(trackId, action);
      }
    });

    // Ruler click / drag scrub
    const ruler = this.container.querySelector('#timeline-ruler') as HTMLElement;
    ruler?.addEventListener('mousedown', (e) => {
      this.isScrubbing = true;
      this.scrubToMouse(e);
    });

    // Tracks lanes container interaction
    const lanes = this.container.querySelector('#tracks-lanes-container') as HTMLElement;
    lanes?.addEventListener('mousedown', (e) => {
      const handle = (e.target as HTMLElement).dataset.handle;
      const pill = (e.target as HTMLElement).closest('.timeline-clip-pill') as HTMLElement;

      if (pill && handle) {
        const clipId = pill.dataset.clipId!;
        this.callbacks.onClipSelect(clipId);

        const clip = this.state.clips.find(c => c.id === clipId);
        if (!clip) return;

        this.draggingClipId = clipId;
        this.dragStartX = e.clientX;
        this.initialClipStart = clip.startTime;
        this.initialClipDur = clip.duration;

        if (handle === 'start') {
          this.dragMode = 'trim-start';
        } else if (handle === 'end') {
          this.dragMode = 'trim-end';
        } else {
          this.dragMode = 'move';
        }
        e.stopPropagation();
      } else {
        // Click on empty space in track: scrub playhead or deselect
        this.callbacks.onClipSelect(null);
        this.isScrubbing = true;
        this.scrubToMouse(e);
      }
    });
  }

  private setupGlobalEvents() {
    window.addEventListener('mousemove', (e) => {
      if (this.isScrubbing) {
        this.scrubToMouse(e);
      } else if (this.draggingClipId && this.dragMode !== 'none') {
        const deltaPx = e.clientX - this.dragStartX;
        const deltaSec = deltaPx / this.pixelsPerSecond;

        if (this.dragMode === 'move') {
          const newStart = Math.max(0, this.initialClipStart + deltaSec);
          this.callbacks.onClipMove(this.draggingClipId, Math.round(newStart * 30) / 30);
        } else if (this.dragMode === 'trim-start') {
          const newStart = Math.max(0, this.initialClipStart + deltaSec);
          const maxStart = this.initialClipStart + this.initialClipDur - 0.2;
          const clampedStart = Math.min(newStart, maxStart);
          const newDur = (this.initialClipStart + this.initialClipDur) - clampedStart;
          this.callbacks.onClipTrim(this.draggingClipId, Math.round(clampedStart * 30) / 30, Math.round(newDur * 30) / 30);
        } else if (this.dragMode === 'trim-end') {
          const newDur = Math.max(0.2, this.initialClipDur + deltaSec);
          this.callbacks.onClipTrim(this.draggingClipId, this.initialClipStart, Math.round(newDur * 30) / 30);
        }
      }
    });

    window.addEventListener('mouseup', () => {
      this.isScrubbing = false;
      this.draggingClipId = null;
      this.dragMode = 'none';
    });

    // Spacebar to play/pause
    window.addEventListener('keydown', (e) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === 'Space') {
        e.preventDefault();
        this.callbacks.onPlayToggle();
      } else if (e.code === 'Delete' || e.code === 'Backspace') {
        if (this.state.selectedClipId) {
          e.preventDefault();
          this.callbacks.onClipDelete(this.state.selectedClipId);
        }
      }
    });
  }

  private scrubToMouse(e: MouseEvent) {
    const scrollContainer = this.container.querySelector('#tracks-content-scroll') as HTMLElement;
    if (!scrollContainer) return;
    const rect = scrollContainer.getBoundingClientRect();
    const x = e.clientX - rect.left + scrollContainer.scrollLeft;
    const time = Math.max(0, Math.min(this.state.duration, x / this.pixelsPerSecond));
    this.callbacks.onSeek(Math.round(time * 30) / 30);
  }
}
