export interface ColorGradingSettings {
  preset: 'none' | 'teal-orange' | 'cyber-neon' | 'kinfolk-warm' | 'bw-contrast' | 'vintage-kodak';
  exposure: number; // -100 to 100
  contrast: number; // -100 to 100
  saturation: number; // -100 to 100
  temperature: number; // -100 (cool) to 100 (warm)
  tint: number; // -100 (green) to 100 (magenta)
  shadows: number; // -100 to 100
  highlights: number; // -100 to 100
  sharpness: number; // 0 to 100
}

export const defaultColorGrading: ColorGradingSettings = {
  preset: 'none',
  exposure: 0,
  contrast: 0,
  saturation: 0,
  temperature: 0,
  tint: 0,
  shadows: 0,
  highlights: 0,
  sharpness: 0
};

export function applyColorGradingToCanvas(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  settings: ColorGradingSettings
) {
  // Check if any adjustments are active
  const isDefault =
    settings.preset === 'none' &&
    settings.exposure === 0 &&
    settings.contrast === 0 &&
    settings.saturation === 0 &&
    settings.temperature === 0 &&
    settings.tint === 0 &&
    settings.shadows === 0 &&
    settings.highlights === 0 &&
    settings.sharpness === 0;

  if (isDefault) return;

  // Composite CSS-style filter first for maximum hardware acceleration
  const brightness = 1 + settings.exposure / 100;
  const contrast = 1 + settings.contrast / 100;
  const saturation = 1 + settings.saturation / 100;

  // Temperature & Tint can be applied via overlay tints or lut matrices
  ctx.save();

  // If preset selected, apply preset overlays
  if (settings.preset === 'teal-orange') {
    // Shadows teal, highlights orange
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, 'rgba(0, 180, 200, 0.15)');
    grad.addColorStop(1, 'rgba(255, 140, 40, 0.15)');
    ctx.globalCompositeOperation = 'overlay';
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
  } else if (settings.preset === 'cyber-neon') {
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, 'rgba(0, 240, 255, 0.18)');
    grad.addColorStop(0.5, 'rgba(168, 85, 247, 0.12)');
    grad.addColorStop(1, 'rgba(255, 0, 128, 0.18)');
    ctx.globalCompositeOperation = 'color-dodge';
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
  } else if (settings.preset === 'kinfolk-warm') {
    ctx.globalCompositeOperation = 'soft-light';
    ctx.fillStyle = 'rgba(235, 180, 130, 0.22)';
    ctx.fillRect(0, 0, width, height);
  } else if (settings.preset === 'bw-contrast') {
    ctx.globalCompositeOperation = 'color';
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'overlay';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);
  } else if (settings.preset === 'vintage-kodak') {
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillStyle = 'rgba(255, 240, 210, 0.9)';
    ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'screen';
    ctx.fillStyle = 'rgba(40, 20, 10, 0.15)';
    ctx.fillRect(0, 0, width, height);
  }

  // Temperature overlay
  if (settings.temperature !== 0) {
    ctx.globalCompositeOperation = 'overlay';
    if (settings.temperature > 0) {
      // Warm orange
      const alpha = (settings.temperature / 100) * 0.25;
      ctx.fillStyle = `rgba(255, 140, 30, ${alpha})`;
    } else {
      // Cool blue
      const alpha = (Math.abs(settings.temperature) / 100) * 0.25;
      ctx.fillStyle = `rgba(30, 140, 255, ${alpha})`;
    }
    ctx.fillRect(0, 0, width, height);
  }

  // Tint overlay
  if (settings.tint !== 0) {
    ctx.globalCompositeOperation = 'soft-light';
    if (settings.tint > 0) {
      // Magenta
      const alpha = (settings.tint / 100) * 0.2;
      ctx.fillStyle = `rgba(255, 20, 147, ${alpha})`;
    } else {
      // Green
      const alpha = (Math.abs(settings.tint) / 100) * 0.2;
      ctx.fillStyle = `rgba(34, 197, 94, ${alpha})`;
    }
    ctx.fillRect(0, 0, width, height);
  }

  // Highlights & Shadows
  if (settings.highlights > 0) {
    ctx.globalCompositeOperation = 'screen';
    ctx.fillStyle = `rgba(255, 255, 255, ${(settings.highlights / 100) * 0.25})`;
    ctx.fillRect(0, 0, width, height);
  } else if (settings.highlights < 0) {
    ctx.globalCompositeOperation = 'multiply';
    const val = 255 - Math.abs(settings.highlights);
    ctx.fillStyle = `rgba(${val}, ${val}, ${val}, 0.25)`;
    ctx.fillRect(0, 0, width, height);
  }

  if (settings.shadows > 0) {
    ctx.globalCompositeOperation = 'screen';
    ctx.fillStyle = `rgba(80, 80, 80, ${(settings.shadows / 100) * 0.2})`;
    ctx.fillRect(0, 0, width, height);
  } else if (settings.shadows < 0) {
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillStyle = `rgba(0, 0, 0, ${(Math.abs(settings.shadows) / 100) * 0.3})`;
    ctx.fillRect(0, 0, width, height);
  }

  ctx.restore();
}
