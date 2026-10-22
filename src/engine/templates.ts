import { TimelineState, TimelineTrack, TimelineClip } from './timeline';
import { ShaderFXSettings } from './shaders';
import { ColorGradingSettings } from './color-grading';
import { AudioMood } from './audio';

export interface ProjectTemplate {
  id: string;
  nameKey: string;
  descKey: string;
  aspectRatio: '16:9' | '9:16' | '1:1' | '4:5' | '21:9';
  duration: number;
  shaderFX: Partial<ShaderFXSettings>;
  colorGrading: Partial<ColorGradingSettings>;
  audioMood: AudioMood;
  showVisualizer: boolean;
  tracks: TimelineTrack[];
  clips: TimelineClip[];
}

export const defaultTracks: TimelineTrack[] = [
  { id: 'track-v2', nameKey: 'videoTrack2', type: 'video', order: 2, muted: false, solo: false, locked: false, hidden: false },
  { id: 'track-g1', nameKey: 'graphicsTrack', type: 'graphics', order: 1, muted: false, solo: false, locked: false, hidden: false },
  { id: 'track-v1', nameKey: 'videoTrack1', type: 'video', order: 0, muted: false, solo: false, locked: false, hidden: false },
  { id: 'track-a1', nameKey: 'audioTrack', type: 'audio', order: 3, muted: false, solo: false, locked: false, hidden: false }
];

export const turnkeyTemplates: ProjectTemplate[] = [
  // 1. Neo-Tokyo Cyberpunk Trailer
  {
    id: 'cyberpunk-trailer',
    nameKey: 'template1Title',
    descKey: 'template1Desc',
    aspectRatio: '16:9',
    duration: 15,
    audioMood: 'synthwave',
    showVisualizer: false,
    shaderFX: {
      filmGrain: 25,
      chromaticAberration: 45,
      crtGlitch: 35,
      bloom: 40,
      vignette: 40,
      duotone: false
    },
    colorGrading: {
      preset: 'cyber-neon',
      exposure: 5,
      contrast: 20,
      saturation: 30,
      temperature: -15,
      tint: 25
    },
    tracks: defaultTracks,
    clips: [
      // V1: Cyber Grid Base
      {
        id: 'clip-cyber-bg',
        trackId: 'track-v1',
        name: 'Cyber Horizon 3D Grid',
        type: 'generative',
        startTime: 0,
        duration: 15,
        color: '#3b82f6',
        blendMode: 'source-over',
        transform: { x: 0, y: 0, scale: 100, rotation: 0, opacity: 100 },
        keyframes: {
          scale: [
            { time: 0, value: 100, easing: 'linear' },
            { time: 15, value: 115, easing: 'linear' }
          ]
        },
        generativeData: {
          sceneType: 'cyber-grid',
          colorA: '#00f0ff',
          colorB: '#a855f7',
          speed: 1.2
        }
      },
      // G1: Main Title
      {
        id: 'clip-cyber-title',
        trackId: 'track-g1',
        name: 'Neo-Tokyo 2099 // نيو طوكيو',
        type: 'text',
        startTime: 1,
        duration: 13,
        color: '#00f0ff',
        blendMode: 'source-over',
        transform: { x: 0, y: -60, scale: 100, rotation: 0, opacity: 100 },
        keyframes: {
          scale: [
            { time: 0, value: 70, easing: 'spring' },
            { time: 1.2, value: 100, easing: 'spring' }
          ],
          opacity: [
            { time: 0, value: 0, easing: 'easeOut' },
            { time: 0.8, value: 100, easing: 'easeOut' }
          ]
        },
        textData: {
          text: 'NEO-TOKYO 2099 // صَحوة السايبورغ',
          fontFamily: 'Orbitron',
          fontSize: 68,
          textColor: '#ffffff',
          strokeColor: '#00f0ff',
          strokeWidth: 2,
          neonGlow: true,
          glowColor: '#00f0ff',
          textAlign: 'center'
        }
      },
      // G1: Lower Third Badge
      {
        id: 'clip-cyber-badge',
        trackId: 'track-g1',
        name: 'Cyber Lower-Third Banner',
        type: 'shape',
        startTime: 2.5,
        duration: 11,
        color: '#a855f7',
        blendMode: 'source-over',
        transform: { x: 0, y: 380, scale: 100, rotation: 0, opacity: 100 },
        keyframes: {
          y: [
            { time: 0, value: 500, easing: 'spring' },
            { time: 1.0, value: 380, easing: 'spring' }
          ]
        },
        shapeData: {
          shapeType: 'lower-third',
          fillColor: '#00f0ff',
          strokeColor: '#a855f7',
          strokeWidth: 1,
          cornerRadius: 12,
          width: 720,
          height: 80,
          subText: 'CINEMOTION DIGITAL ENGINE // الجيل القادم للإنتاج المرئي'
        }
      },
      // A1: Synthwave Beat
      {
        id: 'clip-cyber-audio',
        trackId: 'track-a1',
        name: 'Cyber Synthwave 120 BPM',
        type: 'audio',
        startTime: 0,
        duration: 15,
        color: '#10b981',
        blendMode: 'source-over',
        transform: { x: 0, y: 0, scale: 100, rotation: 0, opacity: 100 },
        keyframes: {},
        audioData: {
          mood: 'synthwave',
          volume: 0.85
        }
      }
    ]
  },

  // 2. Kinfolk Organic Moodboard
  {
    id: 'kinfolk-moodboard',
    nameKey: 'template2Title',
    descKey: 'template2Desc',
    aspectRatio: '4:5',
    duration: 12,
    audioMood: 'kinfolk',
    showVisualizer: false,
    shaderFX: {
      filmGrain: 65,
      chromaticAberration: 0,
      crtGlitch: 0,
      bloom: 15,
      vignette: 55,
      duotone: false
    },
    colorGrading: {
      preset: 'kinfolk-warm',
      exposure: 0,
      contrast: -10,
      saturation: -15,
      temperature: 30,
      tint: -5
    },
    tracks: defaultTracks,
    clips: [
      // V1: Fluid Blobs
      {
        id: 'clip-kinfolk-bg',
        trackId: 'track-v1',
        name: 'Earth Tone Organic Waves',
        type: 'generative',
        startTime: 0,
        duration: 12,
        color: '#d97706',
        blendMode: 'source-over',
        transform: { x: 0, y: 0, scale: 100, rotation: 0, opacity: 100 },
        keyframes: {},
        generativeData: {
          sceneType: 'fluid-blobs',
          colorA: '#d4a373',
          colorB: '#ccd5ae',
          speed: 0.6
        }
      },
      // G1: Minimalist Title
      {
        id: 'clip-kinfolk-title',
        trackId: 'track-g1',
        name: 'Kinfolk Serenity Typography',
        type: 'text',
        startTime: 0.5,
        duration: 11.5,
        color: '#78350f',
        blendMode: 'source-over',
        transform: { x: 0, y: -40, scale: 100, rotation: 0, opacity: 100 },
        keyframes: {
          opacity: [
            { time: 0, value: 0, easing: 'easeInOut' },
            { time: 1.5, value: 100, easing: 'easeInOut' }
          ]
        },
        textData: {
          text: 'SERENITY // إشراقة السكينة والطبيعة',
          fontFamily: 'Playfair Display',
          fontSize: 54,
          textColor: '#292524',
          strokeColor: '#000000',
          strokeWidth: 0,
          neonGlow: false,
          glowColor: '',
          textAlign: 'center'
        }
      },
      // G1: Subtle Border
      {
        id: 'clip-kinfolk-frame',
        trackId: 'track-g1',
        name: 'Minimalist Frame Border',
        type: 'shape',
        startTime: 0,
        duration: 12,
        color: '#a16207',
        blendMode: 'source-over',
        transform: { x: 0, y: 0, scale: 100, rotation: 0, opacity: 100 },
        keyframes: {},
        shapeData: {
          shapeType: 'rectangle',
          fillColor: 'transparent',
          strokeColor: '#57534e',
          strokeWidth: 2,
          cornerRadius: 0,
          width: 900,
          height: 1150
        }
      },
      // A1: Ambient
      {
        id: 'clip-kinfolk-audio',
        trackId: 'track-a1',
        name: 'Kinfolk Organic Ambient',
        type: 'audio',
        startTime: 0,
        duration: 12,
        color: '#10b981',
        blendMode: 'source-over',
        transform: { x: 0, y: 0, scale: 100, rotation: 0, opacity: 100 },
        keyframes: {},
        audioData: {
          mood: 'kinfolk',
          volume: 0.75
        }
      }
    ]
  },

  // 3. Viral TikTok Product Ad
  {
    id: 'tiktok-ad',
    nameKey: 'template3Title',
    descKey: 'template3Desc',
    aspectRatio: '9:16',
    duration: 10,
    audioMood: 'tiktok',
    showVisualizer: false,
    shaderFX: {
      filmGrain: 15,
      chromaticAberration: 20,
      crtGlitch: 0,
      bloom: 30,
      vignette: 25,
      duotone: false
    },
    colorGrading: {
      preset: 'teal-orange',
      exposure: 10,
      contrast: 30,
      saturation: 35,
      temperature: 10,
      tint: 0
    },
    tracks: defaultTracks,
    clips: [
      // V1: Aurora / Energetic Gradient
      {
        id: 'clip-tiktok-bg',
        trackId: 'track-v1',
        name: 'Kinetic Neon Aurora BG',
        type: 'generative',
        startTime: 0,
        duration: 10,
        color: '#ec4899',
        blendMode: 'source-over',
        transform: { x: 0, y: 0, scale: 100, rotation: 0, opacity: 100 },
        keyframes: {},
        generativeData: {
          sceneType: 'aurora',
          colorA: '#ec4899',
          colorB: '#3b82f6',
          speed: 1.8
        }
      },
      // G1: Kinetic Bouncing Title
      {
        id: 'clip-tiktok-title',
        trackId: 'track-g1',
        name: 'SUPER SALE 70% OFF',
        type: 'text',
        startTime: 0.5,
        duration: 9.5,
        color: '#f43f5e',
        blendMode: 'source-over',
        transform: { x: 0, y: -200, scale: 100, rotation: 0, opacity: 100 },
        keyframes: {
          scale: [
            { time: 0, value: 40, easing: 'spring' },
            { time: 0.8, value: 110, easing: 'spring' },
            { time: 1.4, value: 100, easing: 'easeInOut' }
          ],
          rotation: [
            { time: 0, value: -12, easing: 'spring' },
            { time: 0.8, value: 0, easing: 'spring' }
          ]
        },
        textData: {
          text: 'خصم حارق 70% // FLASH SALE',
          fontFamily: 'Tajawal',
          fontSize: 76,
          textColor: '#ffe600',
          strokeColor: '#000000',
          strokeWidth: 4,
          neonGlow: true,
          glowColor: '#ff007f',
          textAlign: 'center'
        }
      },
      // G1: Sale Badge
      {
        id: 'clip-tiktok-badge',
        trackId: 'track-g1',
        name: 'Limited Offer Badge',
        type: 'shape',
        startTime: 1.2,
        duration: 8.8,
        color: '#e11d48',
        blendMode: 'source-over',
        transform: { x: 0, y: 140, scale: 100, rotation: -6, opacity: 100 },
        keyframes: {
          scale: [
            { time: 0, value: 0, easing: 'spring' },
            { time: 0.6, value: 105, easing: 'spring' }
          ]
        },
        shapeData: {
          shapeType: 'badge',
          fillColor: '#ff0055',
          strokeColor: '#ffffff',
          strokeWidth: 3,
          cornerRadius: 16,
          width: 520,
          height: 110,
          subText: '⚡ اطلب الآن قبل نفاد الكمية! ⚡'
        }
      },
      // A1: Upbeat TikTok
      {
        id: 'clip-tiktok-audio',
        trackId: 'track-a1',
        name: 'Punchy Pop 128 BPM',
        type: 'audio',
        startTime: 0,
        duration: 10,
        color: '#10b981',
        blendMode: 'source-over',
        transform: { x: 0, y: 0, scale: 100, rotation: 0, opacity: 100 },
        keyframes: {},
        audioData: {
          mood: 'tiktok',
          volume: 0.9
        }
      }
    ]
  },

  // 4. Lofi Sunset Music Audiogram
  {
    id: 'lofi-audiogram',
    nameKey: 'template4Title',
    descKey: 'template4Desc',
    aspectRatio: '1:1',
    duration: 15,
    audioMood: 'lofi',
    showVisualizer: true,
    shaderFX: {
      filmGrain: 40,
      chromaticAberration: 15,
      crtGlitch: 10,
      bloom: 20,
      vignette: 50,
      duotone: true,
      duotoneColor1: '#240046',
      duotoneColor2: '#ff9e00',
      vhsRetro: 45
    },
    colorGrading: {
      preset: 'vintage-kodak',
      exposure: 0,
      contrast: 15,
      saturation: 10,
      temperature: 25,
      tint: 15
    },
    tracks: defaultTracks,
    clips: [
      // V1: Lofi Sunset Wireframe
      {
        id: 'clip-lofi-bg',
        trackId: 'track-v1',
        name: 'Sliced Sunset Sun & Sea',
        type: 'generative',
        startTime: 0,
        duration: 15,
        color: '#f97316',
        blendMode: 'source-over',
        transform: { x: 0, y: 0, scale: 100, rotation: 0, opacity: 100 },
        keyframes: {},
        generativeData: {
          sceneType: 'lofi-sunset',
          colorA: '#ff8359',
          colorB: '#a2395b',
          speed: 0.8
        }
      },
      // G1: Lofi Typography
      {
        id: 'clip-lofi-text',
        trackId: 'track-g1',
        name: 'Chill Beats Typography',
        type: 'text',
        startTime: 0.5,
        duration: 14.5,
        color: '#fbbf24',
        blendMode: 'source-over',
        transform: { x: 0, y: -260, scale: 100, rotation: 0, opacity: 100 },
        keyframes: {},
        textData: {
          text: 'CHILL BEATS TO CODE // نغمات الغروب',
          fontFamily: 'Cairo',
          fontSize: 52,
          textColor: '#ffffff',
          strokeColor: '#000000',
          strokeWidth: 3,
          neonGlow: true,
          glowColor: '#ff9e00',
          textAlign: 'center'
        }
      },
      // A1: Lofi Audio
      {
        id: 'clip-lofi-audio',
        trackId: 'track-a1',
        name: 'Lofi Sunset Chords 84 BPM',
        type: 'audio',
        startTime: 0,
        duration: 15,
        color: '#10b981',
        blendMode: 'source-over',
        transform: { x: 0, y: 0, scale: 100, rotation: 0, opacity: 100 },
        keyframes: {},
        audioData: {
          mood: 'lofi',
          volume: 0.85
        }
      }
    ]
  }
];
