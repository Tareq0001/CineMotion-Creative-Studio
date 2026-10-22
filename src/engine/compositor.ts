import { TimelineClip, TimelineState, getEffectiveClipTransform, BlendMode } from './timeline';
import { ShaderCompositor, ShaderFXSettings, defaultShaderFX } from './shaders';
import { applyColorGradingToCanvas, ColorGradingSettings, defaultColorGrading } from './color-grading';

export interface GizmoHitResult {
  type: 'body' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'rotate' | 'none';
  clipId?: string;
}

export class Compositor {
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  private shaderEngine: ShaderCompositor;
  public shaderFX: ShaderFXSettings = { ...defaultShaderFX };
  public colorGrading: ColorGradingSettings = { ...defaultColorGrading };
  public showVisualizerOverlay: boolean = false;
  private imageCache: Map<string, HTMLImageElement> = new Map();

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) throw new Error('Could not acquire 2D canvas context');
    this.ctx = ctx;
    this.shaderEngine = new ShaderCompositor();
  }

  public render(
    state: TimelineState,
    frequencyData?: Uint8Array,
    drawGizmo: boolean = true
  ) {
    const width = this.canvas.width;
    const height = this.canvas.height;
    const ctx = this.ctx;
    const time = state.currentTime;

    // Clear background with dark studio slate
    ctx.save();
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#0a0d14';
    ctx.fillRect(0, 0, width, height);
    ctx.restore();

    // Collect active clips at current time, ordered by track hierarchy
    // Track order: lower order number = rendered first (background)
    const sortedTracks = [...state.tracks].sort((a, b) => a.order - b.order);

    for (const track of sortedTracks) {
      if (track.hidden || track.muted) continue;

      const trackClips = state.clips.filter(
        c => c.trackId === track.id &&
             time >= c.startTime &&
             time <= (c.startTime + c.duration)
      );

      for (const clip of trackClips) {
        this.renderClip(clip, time, width, height);
      }
    }

    // Audio Visualizer Overlay (if enabled)
    if (this.showVisualizerOverlay && frequencyData) {
      this.renderAudioSpectrumOverlay(frequencyData, width, height);
    }

    // Color Grading Suite
    applyColorGradingToCanvas(ctx, width, height, this.colorGrading);

    // WebGL / Post-Processing Shaders
    this.shaderEngine.applyPostProcessing(ctx, width, height, time, this.shaderFX);

    // Transform Gizmo on selected clip
    if (drawGizmo && state.selectedClipId) {
      const selected = state.clips.find(c => c.id === state.selectedClipId);
      if (selected && time >= selected.startTime && time <= (selected.startTime + selected.duration)) {
        this.drawTransformGizmo(selected, time, width, height);
      }
    }
  }

  private renderClip(clip: TimelineClip, timelineTime: number, canvasW: number, canvasH: number) {
    const transform = getEffectiveClipTransform(clip, timelineTime);
    const clipLocalTime = timelineTime - clip.startTime;
    const ctx = this.ctx;

    ctx.save();
    ctx.globalAlpha = Math.max(0, Math.min(1, transform.opacity / 100));
    ctx.globalCompositeOperation = (clip.blendMode || 'source-over') as GlobalCompositeOperation;

    // Apply transformation matrix (translate to center point, rotate, scale)
    const centerX = (canvasW / 2) + transform.x;
    const centerY = (canvasH / 2) + transform.y;
    ctx.translate(centerX, centerY);
    ctx.rotate((transform.rotation * Math.PI) / 180);
    ctx.scale(transform.scale / 100, transform.scale / 100);

    switch (clip.type) {
      case 'generative':
        this.renderGenerativeClip(clip, clipLocalTime, canvasW, canvasH);
        break;
      case 'text':
        this.renderTextClip(clip);
        break;
      case 'shape':
        this.renderShapeClip(clip, clipLocalTime);
        break;
      case 'image':
        this.renderImageClip(clip);
        break;
    }

    ctx.restore();
  }

  // --- Generative Background Renderer ---
  private renderGenerativeClip(clip: TimelineClip, t: number, w: number, h: number) {
    const ctx = this.ctx;
    const gen = clip.generativeData;
    const scene = gen?.sceneType || 'cyber-grid';
    const colA = gen?.colorA || '#00f0ff';
    const colB = gen?.colorB || '#a855f7';
    const speed = gen?.speed || 1;

    // Render in bounds relative to origin (center)
    const halfW = w / 2;
    const halfH = h / 2;

    if (scene === 'cyber-grid') {
      // Synthwave Cyber Grid
      const grad = ctx.createLinearGradient(0, -halfH, 0, halfH);
      grad.addColorStop(0, '#050710');
      grad.addColorStop(0.5, '#120b29');
      grad.addColorStop(1, '#020308');
      ctx.fillStyle = grad;
      ctx.fillRect(-halfW, -halfH, w, h);

      // Horizon line
      ctx.strokeStyle = colA;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-halfW, 0);
      ctx.lineTo(halfW, 0);
      ctx.stroke();

      // Perspective grid lines moving towards viewer
      ctx.save();
      ctx.beginPath();
      ctx.rect(-halfW, 0, w, halfH);
      ctx.clip();

      const numVLines = 18;
      ctx.strokeStyle = colB;
      ctx.lineWidth = 1.5;
      for (let i = -numVLines; i <= numVLines; i++) {
        ctx.beginPath();
        ctx.moveTo((i * w) / (numVLines * 0.4), 0);
        ctx.lineTo((i * w) / (numVLines * 0.08), halfH);
        ctx.stroke();
      }

      // Horizontal lines with exponential perspective and speed
      const offset = (t * speed * 60) % 40;
      for (let y = 10; y < halfH; y += (y * 0.22) + 2) {
        const lineY = y + (offset * (y / halfH));
        if (lineY > halfH) continue;
        ctx.strokeStyle = colA;
        ctx.globalAlpha = Math.min(1, lineY / (halfH * 0.7));
        ctx.beginPath();
        ctx.moveTo(-halfW, lineY);
        ctx.lineTo(halfW, lineY);
        ctx.stroke();
      }
      ctx.restore();

      // Cyber Sun in top half
      const sunGrad = ctx.createLinearGradient(0, -halfH * 0.7, 0, 0);
      sunGrad.addColorStop(0, '#ff007f');
      sunGrad.addColorStop(1, '#ffe600');
      ctx.fillStyle = sunGrad;
      ctx.beginPath();
      ctx.arc(0, -50, 160, Math.PI, 0, false);
      ctx.fill();

    } else if (scene === 'aurora') {
      // Flowing Northern Lights / Ethereal Waves
      const grad = ctx.createLinearGradient(-halfW, -halfH, halfW, halfH);
      grad.addColorStop(0, '#02101e');
      grad.addColorStop(1, '#081e19');
      ctx.fillStyle = grad;
      ctx.fillRect(-halfW, -halfH, w, h);

      for (let wave = 0; wave < 3; wave++) {
        ctx.beginPath();
        ctx.moveTo(-halfW, halfH);
        for (let x = -halfW; x <= halfW; x += 30) {
          const y = Math.sin((x * 0.004) + (t * speed * 1.5) + wave) * 120 +
                    Math.cos((x * 0.008) - (t * speed * 0.8)) * 80;
          ctx.lineTo(x, y - (wave * 60));
        }
        ctx.lineTo(halfW, halfH);
        ctx.closePath();

        const waveGrad = ctx.createLinearGradient(0, -halfH, 0, halfH);
        waveGrad.addColorStop(0, wave % 2 === 0 ? colA : colB);
        waveGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = waveGrad;
        ctx.globalAlpha = 0.45;
        ctx.fill();
      }

    } else if (scene === 'lofi-sunset') {
      // Lofi Sunset with warm gradient & horizontal sun slices
      const bg = ctx.createLinearGradient(0, -halfH, 0, halfH);
      bg.addColorStop(0, '#1b0d2b');
      bg.addColorStop(0.5, '#4a154b');
      bg.addColorStop(0.7, '#a2395b');
      bg.addColorStop(1, '#ff8359');
      ctx.fillStyle = bg;
      ctx.fillRect(-halfW, -halfH, w, h);

      // Sliced Sun
      const sunRadius = 150;
      const sunY = -20;
      ctx.save();
      for (let i = 0; i < 10; i++) {
        const sliceY = sunY - sunRadius + (i * (sunRadius * 2 / 10));
        const sliceH = (sunRadius * 2 / 10) - (i * 2);
        if (sliceH <= 0) continue;

        ctx.fillStyle = i % 2 === 0 ? '#ffea00' : '#ff5500';
        ctx.beginPath();
        ctx.arc(0, sunY, sunRadius, 0, Math.PI * 2);
        ctx.clip();
        ctx.fillRect(-sunRadius, sliceY, sunRadius * 2, sliceH);
      }
      ctx.restore();

      // Sea reflection ripples
      ctx.fillStyle = 'rgba(255, 230, 0, 0.2)';
      for (let r = 0; r < halfH; r += 25) {
        const rw = (halfW * 0.6) * (1 - r / halfH);
        ctx.fillRect(-rw / 2, r, rw, 4);
      }

    } else if (scene === 'matrix-code') {
      // Digital Rain Stream
      ctx.fillStyle = '#010803';
      ctx.fillRect(-halfW, -halfH, w, h);
      ctx.font = '16px monospace';

      const cols = 40;
      const colWidth = w / cols;
      for (let i = 0; i < cols; i++) {
        const x = -halfW + i * colWidth;
        const dropY = ((-halfH) + ((t * speed * 200 + i * 150) % (h + 300)));
        ctx.fillStyle = colA;
        ctx.fillText(String.fromCharCode(0x30A0 + ((i + (t * 10 | 0)) % 96)), x, dropY);
        ctx.fillStyle = '#16a34a';
        for (let j = 1; j < 8; j++) {
          ctx.globalAlpha = 1 - (j * 0.12);
          ctx.fillText(String.fromCharCode(0x30A0 + ((i + j) % 96)), x, dropY - (j * 18));
        }
      }

    } else if (scene === 'fluid-blobs') {
      // Organic Minimalist Blobs (Kinfolk)
      ctx.fillStyle = '#f6f4ee';
      ctx.fillRect(-halfW, -halfH, w, h);

      for (let b = 0; b < 3; b++) {
        const bx = Math.sin(t * speed * 0.8 + b * 2) * 200;
        const by = Math.cos(t * speed * 0.6 + b * 3) * 150;
        const grad = ctx.createRadialGradient(bx, by, 40, bx, by, 320);
        grad.addColorStop(0, b === 0 ? colA : colB);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.globalAlpha = 0.35;
        ctx.beginPath();
        ctx.arc(bx, by, 320, 0, Math.PI * 2);
        ctx.fill();
      }

    } else if (scene === 'particle-stars') {
      // Hyperspace Particle Starfield
      ctx.fillStyle = '#030308';
      ctx.fillRect(-halfW, -halfH, w, h);

      const numStars = 120;
      for (let i = 0; i < numStars; i++) {
        const seed = i * 137.5;
        const angle = seed % (Math.PI * 2);
        const dist = ((t * speed * 180 + (i * 25)) % (Math.max(w, h) * 0.7));
        const px = Math.cos(angle) * dist;
        const py = Math.sin(angle) * dist;
        const size = Math.max(1, (dist / (Math.max(w, h) * 0.7)) * 4.5);

        ctx.fillStyle = i % 3 === 0 ? colA : (i % 3 === 1 ? colB : '#ffffff');
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  // --- Typography / Text Renderer ---
  private renderTextClip(clip: TimelineClip) {
    const textData = clip.textData;
    if (!textData) return;
    const ctx = this.ctx;

    ctx.font = `bold ${textData.fontSize}px '${textData.fontFamily || 'Cairo'}', sans-serif`;
    ctx.textAlign = textData.textAlign || 'center';
    ctx.textBaseline = 'middle';

    // Neon Glow multi-pass shadow
    if (textData.neonGlow) {
      ctx.save();
      ctx.shadowColor = textData.glowColor || '#00f0ff';
      ctx.shadowBlur = 30;
      ctx.fillStyle = textData.glowColor || '#00f0ff';
      ctx.fillText(textData.text, 0, 0);
      ctx.shadowBlur = 15;
      ctx.fillText(textData.text, 0, 0);
      ctx.restore();
    }

    // Text Outline / Stroke
    if (textData.strokeWidth > 0) {
      ctx.strokeStyle = textData.strokeColor || '#000000';
      ctx.lineWidth = textData.strokeWidth;
      ctx.strokeText(textData.text, 0, 0);
    }

    // Main Text Fill
    ctx.fillStyle = textData.textColor || '#ffffff';
    ctx.fillText(textData.text, 0, 0);
  }

  // --- Vector Shape Renderer ---
  private renderShapeClip(clip: TimelineClip, t: number) {
    const shape = clip.shapeData;
    if (!shape) return;
    const ctx = this.ctx;
    const w = shape.width || 300;
    const h = shape.height || 160;
    const halfW = w / 2;
    const halfH = h / 2;

    ctx.fillStyle = shape.fillColor || '#00f0ff';
    ctx.strokeStyle = shape.strokeColor || '#ffffff';
    ctx.lineWidth = shape.strokeWidth || 0;

    switch (shape.shapeType) {
      case 'rectangle':
        ctx.fillRect(-halfW, -halfH, w, h);
        if (shape.strokeWidth > 0) ctx.strokeRect(-halfW, -halfH, w, h);
        break;

      case 'rounded-rect': {
        const r = shape.cornerRadius || 16;
        ctx.beginPath();
        ctx.roundRect(-halfW, -halfH, w, h, r);
        ctx.fill();
        if (shape.strokeWidth > 0) ctx.stroke();
        break;
      }

      case 'circle': {
        const radius = Math.min(w, h) / 2;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.fill();
        if (shape.strokeWidth > 0) ctx.stroke();
        break;
      }

      case 'star': {
        const spikes = 5;
        const outer = Math.min(w, h) / 2;
        const inner = outer * 0.45;
        let rot = (Math.PI / 2) * 3;
        const step = Math.PI / spikes;

        ctx.beginPath();
        ctx.moveTo(0, -outer);
        for (let i = 0; i < spikes; i++) {
          let x = Math.cos(rot) * outer;
          let y = Math.sin(rot) * outer;
          ctx.lineTo(x, y);
          rot += step;
          x = Math.cos(rot) * inner;
          y = Math.sin(rot) * inner;
          ctx.lineTo(x, y);
          rot += step;
        }
        ctx.lineTo(0, -outer);
        ctx.closePath();
        ctx.fill();
        if (shape.strokeWidth > 0) ctx.stroke();
        break;
      }

      case 'badge': {
        // High-contrast angled promotional badge
        ctx.beginPath();
        ctx.moveTo(-halfW + 20, -halfH);
        ctx.lineTo(halfW, -halfH);
        ctx.lineTo(halfW - 20, halfH);
        ctx.lineTo(-halfW, halfH);
        ctx.closePath();
        ctx.fill();
        if (shape.strokeWidth > 0) ctx.stroke();

        if (shape.subText) {
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 20px Cairo, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(shape.subText, 0, 0);
        }
        break;
      }

      case 'lower-third': {
        // Animated Broadcast Lower Third Banner
        const bannerW = Math.max(w, 540);
        const bannerH = Math.max(h, 90);
        const bHalfW = bannerW / 2;
        const bHalfH = bannerH / 2;

        // Dark frosted backdrop
        ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
        ctx.beginPath();
        ctx.roundRect(-bHalfW, -bHalfH, bannerW, bannerH, 12);
        ctx.fill();

        // Neon Accent Stripe on left/right
        ctx.fillStyle = shape.fillColor || '#00f0ff';
        ctx.beginPath();
        ctx.roundRect(-bHalfW, -bHalfH, 10, bannerH, [12, 0, 0, 12]);
        ctx.fill();

        // Title and Subtitle
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 24px Cairo, sans-serif';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillText(clip.name, bHalfW - 30, -12);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '16px Cairo, sans-serif';
        ctx.fillText(shape.subText || 'CineMotion Digital Broadcast // بث حي ومباشر', bHalfW - 30, 18);
        break;
      }
    }
  }

  // --- Image Clip Renderer ---
  private renderImageClip(clip: TimelineClip) {
    const imgData = clip.imageData;
    if (!imgData || !imgData.url) return;

    let img = this.imageCache.get(imgData.url);
    if (!img) {
      img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = imgData.url;
      this.imageCache.set(imgData.url, img);
    }

    if (img.complete && img.naturalWidth > 0) {
      const w = imgData.width || img.naturalWidth;
      const h = imgData.height || img.naturalHeight;
      this.ctx.drawImage(img, -w / 2, -h / 2, w, h);
    }
  }

  // --- Audio Spectrum Overlay ---
  private renderAudioSpectrumOverlay(data: Uint8Array, w: number, h: number) {
    const ctx = this.ctx;
    ctx.save();
    const barCount = 48;
    const barWidth = 6;
    const spacing = 4;
    const totalW = barCount * (barWidth + spacing);
    const startX = (w - totalW) / 2;
    const baseY = h - 90;

    for (let i = 0; i < barCount; i++) {
      const val = data[i % data.length] || 0;
      const barH = (val / 255) * 80;
      const x = startX + i * (barWidth + spacing);

      // Cyan to purple gradient
      const grad = ctx.createLinearGradient(x, baseY, x, baseY - barH);
      grad.addColorStop(0, '#00f0ff');
      grad.addColorStop(1, '#ec4899');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(x, baseY - barH, barWidth, barH, 3);
      ctx.fill();
    }
    ctx.restore();
  }

  // --- Interactive Transform Gizmo ---
  private drawTransformGizmo(clip: TimelineClip, time: number, canvasW: number, canvasH: number) {
    const transform = getEffectiveClipTransform(clip, time);
    const ctx = this.ctx;

    ctx.save();
    const cx = (canvasW / 2) + transform.x;
    const cy = (canvasH / 2) + transform.y;
    ctx.translate(cx, cy);
    ctx.rotate((transform.rotation * Math.PI) / 180);
    const scale = transform.scale / 100;
    ctx.scale(scale, scale);

    const bounds = this.getClipBaseBounds(clip);
    const halfW = bounds.w / 2;
    const halfH = bounds.h / 2;

    // Bounding Box Rectangle (Cyan wireframe with shadow)
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 2 / scale;
    ctx.strokeRect(-halfW, -halfH, bounds.w, bounds.h);

    // Corner Scale Handles
    const handleSize = 10 / scale;
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 2 / scale;

    const corners = [
      [-halfW, -halfH],
      [halfW, -halfH],
      [-halfW, halfH],
      [halfW, halfH]
    ];

    for (const [x, y] of corners) {
      ctx.fillRect(x - handleSize / 2, y - handleSize / 2, handleSize, handleSize);
      ctx.strokeRect(x - handleSize / 2, y - handleSize / 2, handleSize, handleSize);
    }

    // Rotation Handle at top
    const rotateDist = 30 / scale;
    ctx.beginPath();
    ctx.moveTo(0, -halfH);
    ctx.lineTo(0, -halfH - rotateDist);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, -halfH - rotateDist, handleSize / 1.5, 0, Math.PI * 2);
    ctx.fillStyle = '#00f0ff';
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }

  public getClipBaseBounds(clip: TimelineClip): { w: number; h: number } {
    if (clip.shapeData) {
      return { w: clip.shapeData.width || 300, h: clip.shapeData.height || 160 };
    }
    if (clip.textData) {
      // Rough estimation based on text length and font size
      const len = clip.textData.text.length || 10;
      return { w: len * (clip.textData.fontSize * 0.65), h: clip.textData.fontSize * 1.4 };
    }
    if (clip.imageData) {
      return { w: clip.imageData.width || 400, h: clip.imageData.height || 300 };
    }
    return { w: 600, h: 400 };
  }
}
