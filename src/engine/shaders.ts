export interface ShaderFXSettings {
  filmGrain: number; // 0..100
  chromaticAberration: number; // 0..100
  crtGlitch: number; // 0..100
  bloom: number; // 0..100
  vignette: number; // 0..100
  duotone: boolean;
  duotoneColor1: string; // Shadow color (hex)
  duotoneColor2: string; // Highlight color (hex)
  vhsRetro: number; // 0..100
}

export const defaultShaderFX: ShaderFXSettings = {
  filmGrain: 0,
  chromaticAberration: 0,
  crtGlitch: 0,
  bloom: 0,
  vignette: 0,
  duotone: false,
  duotoneColor1: '#0f172a',
  duotoneColor2: '#00f0ff',
  vhsRetro: 0
};

export class ShaderCompositor {
  private grainCanvas: HTMLCanvasElement;
  private grainCtx: CanvasRenderingContext2D | null;
  private offscreenCanvas: HTMLCanvasElement;
  private offscreenCtx: CanvasRenderingContext2D | null;
  private grainPattern: CanvasPattern | null = null;
  private frameCount: number = 0;

  constructor() {
    this.grainCanvas = document.createElement('canvas');
    this.grainCanvas.width = 256;
    this.grainCanvas.height = 256;
    this.grainCtx = this.grainCanvas.getContext('2d');

    this.offscreenCanvas = document.createElement('canvas');
    this.offscreenCtx = this.offscreenCanvas.getContext('2d');

    this.generateGrainNoise();
  }

  private generateGrainNoise() {
    if (!this.grainCtx) return;
    const imgData = this.grainCtx.createImageData(256, 256);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      const v = (Math.random() * 255) | 0;
      data[i] = v;
      data[i + 1] = v;
      data[i + 2] = v;
      data[i + 3] = (Math.random() * 120) | 0;
    }
    this.grainCtx.putImageData(imgData, 0, 0);
    this.grainPattern = this.grainCtx.createPattern(this.grainCanvas, 'repeat');
  }

  public applyPostProcessing(
    targetCtx: CanvasRenderingContext2D,
    width: number,
    height: number,
    time: number,
    fx: ShaderFXSettings
  ) {
    this.frameCount++;
    if (this.frameCount % 4 === 0) {
      this.generateGrainNoise();
    }

    // 1. Chromatic Aberration (RGB Shift)
    if (fx.chromaticAberration > 0) {
      this.applyChromaticAberration(targetCtx, width, height, fx.chromaticAberration);
    }

    // 2. Cinematic Bloom
    if (fx.bloom > 0) {
      this.applyBloom(targetCtx, width, height, fx.bloom);
    }

    // 3. CRT Scanlines & Glitch
    if (fx.crtGlitch > 0) {
      this.applyCrtGlitch(targetCtx, width, height, time, fx.crtGlitch);
    }

    // 4. VHS Retro
    if (fx.vhsRetro > 0) {
      this.applyVhsRetro(targetCtx, width, height, time, fx.vhsRetro);
    }

    // 5. Duotone
    if (fx.duotone) {
      this.applyDuotone(targetCtx, width, height, fx.duotoneColor1, fx.duotoneColor2);
    }

    // 6. 35mm Film Grain
    if (fx.filmGrain > 0) {
      this.applyFilmGrain(targetCtx, width, height, fx.filmGrain);
    }

    // 7. Vignette
    if (fx.vignette > 0) {
      this.applyVignette(targetCtx, width, height, fx.vignette);
    }
  }

  private applyChromaticAberration(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    intensity: number
  ) {
    const shift = (intensity / 100) * 16;
    if (shift <= 0.5) return;

    this.ensureOffscreen(width, height);
    if (!this.offscreenCtx) return;

    this.offscreenCtx.clearRect(0, 0, width, height);
    this.offscreenCtx.drawImage(ctx.canvas, 0, 0);

    ctx.save();
    // Red Channel Shift
    ctx.globalCompositeOperation = 'screen';
    ctx.fillStyle = 'rgba(255, 0, 0, 0.4)';
    ctx.drawImage(this.offscreenCanvas, -shift, 0, width, height);

    // Cyan Channel Shift
    ctx.fillStyle = 'rgba(0, 255, 255, 0.4)';
    ctx.drawImage(this.offscreenCanvas, shift, 0, width, height);
    ctx.restore();
  }

  private applyBloom(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    intensity: number
  ) {
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    ctx.filter = `blur(${Math.max(4, (intensity / 100) * 24)}px) brightness(1.3)`;
    ctx.globalAlpha = (intensity / 100) * 0.7;
    ctx.drawImage(ctx.canvas, 0, 0);
    ctx.restore();
  }

  private applyCrtGlitch(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    time: number,
    intensity: number
  ) {
    ctx.save();
    const alpha = (intensity / 100) * 0.35;

    // Scanlines
    ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
    for (let y = 0; y < height; y += 4) {
      ctx.fillRect(0, y, width, 1.5);
    }

    // Random glitch slice twitch
    const glitchChance = (intensity / 100) * 0.4;
    if (Math.random() < glitchChance) {
      const sliceY = Math.random() * height;
      const sliceH = Math.random() * 40 + 10;
      const sliceOffset = (Math.random() - 0.5) * (intensity / 100) * 50;

      ctx.drawImage(
        ctx.canvas,
        0, sliceY, width, sliceH,
        sliceOffset, sliceY, width, sliceH
      );

      // Neon glitch tint slice
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(0, 255, 255, 0.2)' : 'rgba(255, 0, 128, 0.2)';
      ctx.fillRect(0, sliceY, width, sliceH);
    }
    ctx.restore();
  }

  private applyVhsRetro(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    time: number,
    intensity: number
  ) {
    ctx.save();
    // VHS tracking line at bottom or moving
    const trackingY = (Math.sin(time * 3) * 0.5 + 0.5) * height;
    ctx.fillStyle = `rgba(255, 255, 255, ${(intensity / 100) * 0.25})`;
    ctx.fillRect(0, trackingY, width, 6);

    // Warm VHS color bleed
    ctx.globalCompositeOperation = 'color-dodge';
    ctx.fillStyle = `rgba(180, 100, 20, ${(intensity / 100) * 0.15})`;
    ctx.fillRect(0, 0, width, height);

    // Jitter
    if (Math.random() < 0.15 * (intensity / 100)) {
      ctx.drawImage(ctx.canvas, (Math.random() - 0.5) * 8, 0, width, height);
    }
    ctx.restore();
  }

  private applyDuotone(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    color1: string,
    color2: string
  ) {
    ctx.save();
    // Shadows
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillStyle = color1;
    ctx.fillRect(0, 0, width, height);

    // Highlights
    ctx.globalCompositeOperation = 'screen';
    ctx.fillStyle = color2;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  }

  private applyFilmGrain(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    intensity: number
  ) {
    if (!this.grainPattern) return;
    ctx.save();
    ctx.globalCompositeOperation = 'overlay';
    ctx.globalAlpha = (intensity / 100) * 0.5;
    ctx.fillStyle = this.grainPattern;
    // Offset pattern randomly for live jitter
    const ox = (Math.random() * 256) | 0;
    const oy = (Math.random() * 256) | 0;
    ctx.translate(ox, oy);
    ctx.fillRect(-ox, -oy, width + ox, height + oy);
    ctx.restore();
  }

  private applyVignette(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    intensity: number
  ) {
    ctx.save();
    const cx = width / 2;
    const cy = height / 2;
    const maxRadius = Math.sqrt(cx * cx + cy * cy);
    const grad = ctx.createRadialGradient(cx, cy, maxRadius * 0.35, cx, cy, maxRadius);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
    grad.addColorStop(1, `rgba(0, 0, 0, ${(intensity / 100) * 0.85})`);

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  }

  private ensureOffscreen(width: number, height: number) {
    if (this.offscreenCanvas.width !== width || this.offscreenCanvas.height !== height) {
      this.offscreenCanvas.width = width;
      this.offscreenCanvas.height = height;
    }
  }
}
