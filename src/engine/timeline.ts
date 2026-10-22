import { Keyframe, evaluateKeyframes } from './keyframes';

export type TrackType = 'video' | 'graphics' | 'audio';

export type ClipType = 'generative' | 'text' | 'shape' | 'audio' | 'image';

export type BlendMode = 'source-over' | 'screen' | 'multiply' | 'overlay' | 'color-dodge' | 'luminosity';

export interface ClipTransform {
  x: number;
  y: number;
  scale: number;
  rotation: number; // degrees
  opacity: number; // 0..100
}

export interface ClipTextData {
  text: string;
  fontFamily: string;
  fontSize: number;
  textColor: string;
  strokeColor: string;
  strokeWidth: number;
  neonGlow: boolean;
  glowColor: string;
  textAlign: 'center' | 'left' | 'right';
}

export interface ClipShapeData {
  shapeType: 'rectangle' | 'rounded-rect' | 'circle' | 'star' | 'badge' | 'lower-third';
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
  cornerRadius: number;
  width: number;
  height: number;
  subText?: string;
}

export interface ClipAudioData {
  mood: 'synthwave' | 'kinfolk' | 'tiktok' | 'lofi';
  volume: number; // 0..1
}

export interface ClipGenerativeData {
  sceneType: 'cyber-grid' | 'aurora' | 'lofi-sunset' | 'matrix-code' | 'fluid-blobs' | 'particle-stars';
  colorA: string;
  colorB: string;
  speed: number;
}

export interface ClipImageData {
  url: string;
  width: number;
  height: number;
}

export interface TimelineClip {
  id: string;
  trackId: string;
  name: string;
  type: ClipType;
  startTime: number; // start in timeline (seconds)
  duration: number; // duration on timeline (seconds)
  color: string; // timeline UI bar color
  blendMode: BlendMode;
  transform: ClipTransform;
  keyframes: {
    x?: Keyframe[];
    y?: Keyframe[];
    scale?: Keyframe[];
    rotation?: Keyframe[];
    opacity?: Keyframe[];
  };
  textData?: ClipTextData;
  shapeData?: ClipShapeData;
  audioData?: ClipAudioData;
  generativeData?: ClipGenerativeData;
  imageData?: ClipImageData;
}

export interface TimelineTrack {
  id: string;
  nameKey: string;
  type: TrackType;
  order: number;
  muted: boolean;
  solo: boolean;
  locked: boolean;
  hidden: boolean;
}

export interface TimelineState {
  currentTime: number;
  duration: number;
  fps: number;
  isPlaying: boolean;
  isLooping: boolean;
  selectedClipId: string | null;
  tracks: TimelineTrack[];
  clips: TimelineClip[];
  aspectRatio: '16:9' | '9:16' | '1:1' | '4:5' | '21:9';
  canvasWidth: number;
  canvasHeight: number;
}

export function secondsToTimecode(sec: number, fps: number = 30): string {
  const safeSec = Math.max(0, sec);
  const hours = Math.floor(safeSec / 3600);
  const minutes = Math.floor((safeSec % 3600) / 60);
  const seconds = Math.floor(safeSec % 60);
  const frames = Math.floor((safeSec - Math.floor(safeSec)) * fps);

  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(frames)}`;
}

export function timecodeToSeconds(tc: string, fps: number = 30): number {
  const parts = tc.split(':').map(Number);
  if (parts.length < 4) return 0;
  const [h, m, s, f] = parts;
  return h * 3600 + m * 60 + s + (f / fps);
}

export function getResolutionForAspectRatio(ratio: '16:9' | '9:16' | '1:1' | '4:5' | '21:9'): { width: number; height: number } {
  switch (ratio) {
    case '16:9':
      return { width: 1920, height: 1080 };
    case '9:16':
      return { width: 1080, height: 1920 };
    case '1:1':
      return { width: 1080, height: 1080 };
    case '4:5':
      return { width: 1080, height: 1350 };
    case '21:9':
      return { width: 2560, height: 1080 };
    default:
      return { width: 1920, height: 1080 };
  }
}

export function getEffectiveClipTransform(clip: TimelineClip, timelineTime: number): ClipTransform {
  const clipTime = timelineTime - clip.startTime;
  const kf = clip.keyframes;

  return {
    x: evaluateKeyframes(kf.x || [], clipTime, clip.transform.x),
    y: evaluateKeyframes(kf.y || [], clipTime, clip.transform.y),
    scale: evaluateKeyframes(kf.scale || [], clipTime, clip.transform.scale),
    rotation: evaluateKeyframes(kf.rotation || [], clipTime, clip.transform.rotation),
    opacity: evaluateKeyframes(kf.opacity || [], clipTime, clip.transform.opacity)
  };
}
