export type EasingType = 'linear' | 'easeIn' | 'easeOut' | 'easeInOut' | 'spring';

export interface Keyframe {
  time: number; // in seconds relative to clip start
  value: number;
  easing?: EasingType;
}

export type AnimatableProperty = 'x' | 'y' | 'scale' | 'rotation' | 'opacity';

export interface PropertyAnimation {
  property: AnimatableProperty;
  keyframes: Keyframe[];
}

export function evaluateEasing(t: number, easing: EasingType = 'easeInOut'): number {
  // t is clamped 0..1
  const clamped = Math.max(0, Math.min(1, t));
  switch (easing) {
    case 'linear':
      return clamped;
    case 'easeIn':
      return clamped * clamped * clamped;
    case 'easeOut':
      return 1 - Math.pow(1 - clamped, 3);
    case 'easeInOut':
      return clamped < 0.5
        ? 4 * clamped * clamped * clamped
        : 1 - Math.pow(-2 * clamped + 2, 3) / 2;
    case 'spring': {
      // Elastic overshoot spring curve
      const c4 = (2 * Math.PI) / 3;
      return clamped === 0
        ? 0
        : clamped === 1
        ? 1
        : Math.pow(2, -10 * clamped) * Math.sin((clamped * 10 - 0.75) * c4) + 1;
    }
    default:
      return clamped;
  }
}

export function evaluateKeyframes(
  keyframes: Keyframe[],
  clipTime: number,
  defaultValue: number
): number {
  if (!keyframes || keyframes.length === 0) {
    return defaultValue;
  }

  // Sort keyframes by time
  const sorted = [...keyframes].sort((a, b) => a.time - b.time);

  // Before first keyframe
  if (clipTime <= sorted[0].time) {
    return sorted[0].value;
  }

  // After last keyframe
  if (clipTime >= sorted[sorted.length - 1].time) {
    return sorted[sorted.length - 1].value;
  }

  // Find surrounding keyframes
  for (let i = 0; i < sorted.length - 1; i++) {
    const k1 = sorted[i];
    const k2 = sorted[i + 1];
    if (clipTime >= k1.time && clipTime <= k2.time) {
      const duration = k2.time - k1.time;
      if (duration === 0) return k1.value;
      const progress = (clipTime - k1.time) / duration;
      const eased = evaluateEasing(progress, k2.easing || 'easeInOut');
      return k1.value + (k2.value - k1.value) * eased;
    }
  }

  return defaultValue;
}
