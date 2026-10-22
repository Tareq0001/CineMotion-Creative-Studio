import './style.css';
import { TimelineState, TimelineClip, getResolutionForAspectRatio, secondsToTimecode } from './engine/timeline';
import { defaultTracks, turnkeyTemplates, ProjectTemplate } from './engine/templates';
import { defaultShaderFX, ShaderFXSettings } from './engine/shaders';
import { defaultColorGrading, ColorGradingSettings } from './engine/color-grading';
import { AudioEngine, AudioMood } from './engine/audio';
import { ViewportView } from './ui/viewport-view';
import { TimelineView } from './ui/timeline-view';
import { InspectorView } from './ui/inspector-view';
import { AssetsView } from './ui/assets-view';
import { t, setLanguage, getLanguage, onLanguageChange } from './ui/i18n';

class CineMotionApp {
  private state: TimelineState;
  private shaderFX: ShaderFXSettings;
  private colorGrading: ColorGradingSettings;
  private audioEngine: AudioEngine;
  private audioMood: AudioMood = 'synthwave';
  private audioVolume: number = 0.8;
  private showVisualizer: boolean = false;

  // Views
  private viewportView!: ViewportView;
  private timelineView!: TimelineView;
  private inspectorView!: InspectorView;
  private assetsView!: AssetsView;

  // Animation Loop
  private lastTime: number = 0;
  private animationFrameId: number | null = null;

  // Video Export Recorder
  private mediaRecorder: MediaRecorder | null = null;
  private recordedChunks: Blob[] = [];
  private isExportingVideo: boolean = false;

  constructor() {
    // Initial Project: Load Cyberpunk Trailer by default
    const initialTmpl = turnkeyTemplates[0];
    const res = getResolutionForAspectRatio(initialTmpl.aspectRatio);

    this.state = {
      currentTime: 0,
      duration: initialTmpl.duration,
      fps: 30,
      isPlaying: false,
      isLooping: true,
      selectedClipId: initialTmpl.clips[1]?.id || null, // Select main title clip
      tracks: JSON.parse(JSON.stringify(initialTmpl.tracks)),
      clips: JSON.parse(JSON.stringify(initialTmpl.clips)),
      aspectRatio: initialTmpl.aspectRatio,
      canvasWidth: res.width,
      canvasHeight: res.height
    };

    this.shaderFX = { ...defaultShaderFX, ...initialTmpl.shaderFX };
    this.colorGrading = { ...defaultColorGrading, ...initialTmpl.colorGrading };
    this.audioMood = initialTmpl.audioMood;
    this.showVisualizer = initialTmpl.showVisualizer;

    this.audioEngine = new AudioEngine();
    this.audioEngine.setMood(this.audioMood);
    this.audioEngine.setVolume(this.audioVolume);

    this.initDOM();
    this.initViews();
    this.startRenderLoop();
  }

  private initDOM() {
    const appEl = document.getElementById('app')!;
    appEl.innerHTML = `
      <!-- Top Navigation Bar -->
      <header class="studio-topbar">
        <div class="topbar-brand">
          <div class="brand-icon-box">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </div>
          <div class="brand-title">
            <span>CINEMOTION</span>
            <span class="brand-badge">STUDIO PRO</span>
          </div>
        </div>

        <div class="topbar-actions">
          <button id="btn-save-project" class="studio-btn-sm" title="${t('saveProject')}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
            <span>${t('saveProject')}</span>
          </button>

          <label class="studio-btn-sm" title="${t('loadProject')}" style="cursor: pointer; margin: 0;">
            <input type="file" id="input-load-project" accept=".json,.cinemotion" style="display: none;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            <span>${t('loadProject')}</span>
          </label>

          <button id="btn-lang-toggle" class="lang-btn">
            ${getLanguage() === 'ar' ? 'English' : 'العربية'}
          </button>

          <button id="btn-export-video" class="studio-btn-accent" title="${t('exportVideo')}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
            <span>${t('exportVideo')}</span>
          </button>
        </div>
      </header>

      <!-- Main Workspace -->
      <main class="studio-workspace-main">
        <!-- Left Dock: Assets & AI -->
        <aside class="studio-left-dock" id="left-dock"></aside>

        <!-- Center Stage: Viewport -->
        <section class="studio-center-stage" id="center-stage"></section>

        <!-- Right Dock: Inspector -->
        <aside class="studio-right-dock" id="right-dock"></aside>
      </main>

      <!-- Bottom Dock: NLE Multi-Track Timeline -->
      <footer class="studio-bottom-timeline" id="bottom-timeline"></footer>

      <!-- Export Modal Container -->
      <div id="export-modal-root"></div>
    `;

    // Global Topbar Events
    document.getElementById('btn-save-project')?.addEventListener('click', () => this.saveProjectJSON());

    const loadInput = document.getElementById('input-load-project') as HTMLInputElement;
    loadInput?.addEventListener('change', (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        this.loadProjectJSON(files[0]);
      }
    });

    document.getElementById('btn-lang-toggle')?.addEventListener('click', () => {
      const nextLang = getLanguage() === 'ar' ? 'en' : 'ar';
      setLanguage(nextLang);
      this.initDOM();
      this.initViews();
    });

    document.getElementById('btn-export-video')?.addEventListener('click', () => {
      this.startVideoExport();
    });
  }

  private initViews() {
    const leftDock = document.getElementById('left-dock')!;
    const centerStage = document.getElementById('center-stage')!;
    const rightDock = document.getElementById('right-dock')!;
    const bottomTimeline = document.getElementById('bottom-timeline')!;

    // 1. Assets View
    this.assetsView = new AssetsView(leftDock, {
      onLoadTemplate: (tmpl) => this.loadTemplate(tmpl),
      onAddTextLayer: (preset) => this.addTextLayer(preset),
      onAddShapeLayer: (shapeType) => this.addShapeLayer(shapeType),
      onAddLowerThird: () => this.addLowerThird(),
      onAddGenerativeScene: (scene, tag) => this.addGenerativeScene(scene, tag),
      onUploadMedia: (file) => this.uploadMediaFile(file)
    });

    // 2. Viewport View
    this.viewportView = new ViewportView(centerStage, this.state, {
      onClipTransformChange: (clipId, tr) => {
        const clip = this.state.clips.find(c => c.id === clipId);
        if (clip) {
          clip.transform.x = tr.x;
          clip.transform.y = tr.y;
          clip.transform.scale = tr.scale;
          clip.transform.rotation = tr.rotation;
          this.syncInspector();
        }
      },
      onClipSelect: (clipId) => {
        this.state.selectedClipId = clipId;
        this.syncViews();
      },
      onAspectRatioChange: (ratio) => {
        this.state.aspectRatio = ratio;
        const res = getResolutionForAspectRatio(ratio);
        this.state.canvasWidth = res.width;
        this.state.canvasHeight = res.height;
        this.viewportView.resizeCanvas();
        this.viewportView.updateState(this.state);
      }
    });

    this.viewportView.compositor.shaderFX = this.shaderFX;
    this.viewportView.compositor.colorGrading = this.colorGrading;
    this.viewportView.compositor.showVisualizerOverlay = this.showVisualizer;

    // 3. Inspector View
    this.inspectorView = new InspectorView(
      rightDock,
      this.state,
      this.shaderFX,
      this.colorGrading,
      this.audioMood,
      this.audioVolume,
      this.showVisualizer,
      {
        onClipPropertyChange: (clipId, updates) => {
          const clip = this.state.clips.find(c => c.id === clipId);
          if (clip) {
            Object.assign(clip, updates);
            this.syncTimeline();
          }
        },
        onAddKeyframe: (clipId, prop, easing) => {
          const clip = this.state.clips.find(c => c.id === clipId);
          if (!clip) return;
          if (!clip.keyframes[prop]) clip.keyframes[prop] = [];
          const localTime = Math.max(0, this.state.currentTime - clip.startTime);
          // Remove existing keyframe at same time if any
          clip.keyframes[prop] = clip.keyframes[prop]!.filter(k => Math.abs(k.time - localTime) >= 0.1);
          clip.keyframes[prop]!.push({
            time: Math.round(localTime * 30) / 30,
            value: (clip.transform as any)[prop],
            easing
          });
          this.syncViews();
        },
        onRemoveKeyframe: (clipId, prop) => {
          const clip = this.state.clips.find(c => c.id === clipId);
          if (!clip || !clip.keyframes[prop]) return;
          const localTime = Math.max(0, this.state.currentTime - clip.startTime);
          clip.keyframes[prop] = clip.keyframes[prop]!.filter(k => Math.abs(k.time - localTime) >= 0.1);
          this.syncViews();
        },
        onShaderFXChange: (fx) => {
          Object.assign(this.shaderFX, fx);
          this.viewportView.compositor.shaderFX = this.shaderFX;
        },
        onColorGradingChange: (grading) => {
          Object.assign(this.colorGrading, grading);
          this.viewportView.compositor.colorGrading = this.colorGrading;
        },
        onAudioMoodChange: (mood) => {
          this.audioMood = mood;
          this.audioEngine.setMood(mood);
        },
        onAudioVolumeChange: (vol) => {
          this.audioVolume = vol;
          this.audioEngine.setVolume(vol);
        },
        onVisualizerOverlayToggle: (enabled) => {
          this.showVisualizer = enabled;
          this.viewportView.compositor.showVisualizerOverlay = enabled;
        }
      }
    );

    // 4. Timeline View
    this.timelineView = new TimelineView(bottomTimeline, this.state, {
      onPlayToggle: () => this.togglePlayback(),
      onSeek: (time) => {
        this.state.currentTime = time;
        this.syncViews();
      },
      onLoopToggle: () => {
        this.state.isLooping = !this.state.isLooping;
        this.syncTimeline();
      },
      onClipMove: (clipId, newStart) => {
        const clip = this.state.clips.find(c => c.id === clipId);
        if (clip) {
          clip.startTime = newStart;
          this.syncTimeline();
        }
      },
      onClipTrim: (clipId, newStart, newDur) => {
        const clip = this.state.clips.find(c => c.id === clipId);
        if (clip) {
          clip.startTime = newStart;
          clip.duration = newDur;
          this.syncTimeline();
        }
      },
      onClipSelect: (clipId) => {
        this.state.selectedClipId = clipId;
        this.syncViews();
      },
      onClipSplit: (clipId) => {
        this.splitClipAtPlayhead(clipId);
      },
      onClipDuplicate: (clipId) => {
        this.duplicateClip(clipId);
      },
      onClipDelete: (clipId) => {
        this.deleteClip(clipId);
      },
      onTrackToggle: (trackId, prop) => {
        const track = this.state.tracks.find(t => t.id === trackId);
        if (track) {
          (track as any)[prop] = !(track as any)[prop];
          this.syncViews();
        }
      }
    });
  }

  // --- Animation & Render Loop ---
  private startRenderLoop() {
    this.lastTime = performance.now();

    const loop = (timestamp: number) => {
      const dt = (timestamp - this.lastTime) / 1000;
      this.lastTime = timestamp;

      if (this.state.isPlaying) {
        this.state.currentTime += dt;
        if (this.state.currentTime >= this.state.duration) {
          if (this.state.isLooping) {
            this.state.currentTime = 0;
          } else {
            this.state.currentTime = this.state.duration;
            this.stopPlayback();
          }
        }
        this.timelineView.updateState(this.state);
      }

      // Render Viewport
      const freqData = this.audioEngine.getFrequencyData();
      this.viewportView.compositor.render(this.state, freqData, true);

      this.animationFrameId = requestAnimationFrame(loop);
    };

    this.animationFrameId = requestAnimationFrame(loop);
  }

  // --- Playback Controls ---
  private togglePlayback() {
    if (this.state.isPlaying) {
      this.stopPlayback();
    } else {
      this.startPlayback();
    }
  }

  private startPlayback() {
    if (this.state.currentTime >= this.state.duration) {
      this.state.currentTime = 0;
    }
    this.state.isPlaying = true;
    this.audioEngine.play();
    this.syncTimeline();
  }

  private stopPlayback() {
    this.state.isPlaying = false;
    this.audioEngine.stop();
    this.syncTimeline();
  }

  // --- Synchronization Helpers ---
  private syncViews() {
    this.viewportView.updateState(this.state);
    this.timelineView.updateState(this.state);
    this.inspectorView.update(
      this.state,
      this.shaderFX,
      this.colorGrading,
      this.audioMood,
      this.audioVolume,
      this.showVisualizer
    );
  }

  private syncTimeline() {
    this.timelineView.updateState(this.state);
  }

  private syncInspector() {
    this.inspectorView.update(
      this.state,
      this.shaderFX,
      this.colorGrading,
      this.audioMood,
      this.audioVolume,
      this.showVisualizer
    );
  }

  // --- Template Loader ---
  private loadTemplate(tmpl: ProjectTemplate) {
    this.stopPlayback();
    this.state.aspectRatio = tmpl.aspectRatio;
    const res = getResolutionForAspectRatio(tmpl.aspectRatio);
    this.state.canvasWidth = res.width;
    this.state.canvasHeight = res.height;
    this.state.duration = tmpl.duration;
    this.state.currentTime = 0;
    this.state.tracks = JSON.parse(JSON.stringify(tmpl.tracks));
    this.state.clips = JSON.parse(JSON.stringify(tmpl.clips));
    this.state.selectedClipId = tmpl.clips[0]?.id || null;

    this.shaderFX = { ...defaultShaderFX, ...tmpl.shaderFX };
    this.colorGrading = { ...defaultColorGrading, ...tmpl.colorGrading };
    this.audioMood = tmpl.audioMood;
    this.showVisualizer = tmpl.showVisualizer;

    this.audioEngine.setMood(this.audioMood);
    this.viewportView.compositor.shaderFX = this.shaderFX;
    this.viewportView.compositor.colorGrading = this.colorGrading;
    this.viewportView.compositor.showVisualizerOverlay = this.showVisualizer;

    this.viewportView.resizeCanvas();
    this.viewportView.updateState(this.state);
    this.timelineView.render();
    this.syncViews();
  }

  // --- Clip Manipulations ---
  private splitClipAtPlayhead(clipId: string) {
    const clip = this.state.clips.find(c => c.id === clipId);
    if (!clip) return;
    const t = this.state.currentTime;
    if (t <= clip.startTime || t >= clip.startTime + clip.duration) return;

    const firstDur = t - clip.startTime;
    const secondDur = clip.duration - firstDur;

    clip.duration = Math.round(firstDur * 30) / 30;

    const newClip: TimelineClip = JSON.parse(JSON.stringify(clip));
    newClip.id = 'clip_' + Date.now();
    newClip.startTime = Math.round(t * 30) / 30;
    newClip.duration = Math.round(secondDur * 30) / 30;
    newClip.name = clip.name + ' (Part 2)';

    this.state.clips.push(newClip);
    this.state.selectedClipId = newClip.id;
    this.syncViews();
  }

  private duplicateClip(clipId: string) {
    const clip = this.state.clips.find(c => c.id === clipId);
    if (!clip) return;

    const newClip: TimelineClip = JSON.parse(JSON.stringify(clip));
    newClip.id = 'clip_' + Date.now();
    newClip.startTime = Math.min(this.state.duration - clip.duration, clip.startTime + 1);
    newClip.name = clip.name + ' (Copy)';

    this.state.clips.push(newClip);
    this.state.selectedClipId = newClip.id;
    this.syncViews();
  }

  private deleteClip(clipId: string) {
    this.state.clips = this.state.clips.filter(c => c.id !== clipId);
    if (this.state.selectedClipId === clipId) {
      this.state.selectedClipId = null;
    }
    this.syncViews();
  }

  // --- Add Layer Helpers ---
  private addTextLayer(preset?: { text: string; fontSize: number; neon: boolean }) {
    const id = 'text_' + Date.now();
    const clip: TimelineClip = {
      id,
      trackId: 'track-g1',
      name: 'نص موشن جرافيك جديد',
      type: 'text',
      startTime: Math.round(this.state.currentTime * 30) / 30,
      duration: 6,
      color: '#00f0ff',
      blendMode: 'source-over',
      transform: { x: 0, y: 0, scale: 100, rotation: 0, opacity: 100 },
      keyframes: {
        scale: [
          { time: 0, value: 50, easing: 'spring' },
          { time: 0.8, value: 100, easing: 'spring' }
        ]
      },
      textData: {
        text: preset?.text || 'نص احترافي جديد // CineMotion',
        fontFamily: 'Cairo',
        fontSize: preset?.fontSize || 60,
        textColor: '#ffffff',
        strokeColor: '#000000',
        strokeWidth: 2,
        neonGlow: preset?.neon ?? true,
        glowColor: '#00f0ff',
        textAlign: 'center'
      }
    };
    this.state.clips.push(clip);
    this.state.selectedClipId = id;
    this.syncViews();
  }

  private addShapeLayer(shapeType: 'rectangle' | 'rounded-rect' | 'circle' | 'star' | 'badge') {
    const id = 'shape_' + Date.now();
    const clip: TimelineClip = {
      id,
      trackId: 'track-g1',
      name: `شكل ${shapeType}`,
      type: 'shape',
      startTime: Math.round(this.state.currentTime * 30) / 30,
      duration: 5,
      color: '#a855f7',
      blendMode: 'source-over',
      transform: { x: 0, y: 0, scale: 100, rotation: 0, opacity: 100 },
      keyframes: {},
      shapeData: {
        shapeType,
        fillColor: '#00f0ff',
        strokeColor: '#ffffff',
        strokeWidth: 2,
        cornerRadius: 16,
        width: 320,
        height: 180,
        subText: shapeType === 'badge' ? '⚡ خصم حصري ومميز ⚡' : undefined
      }
    };
    this.state.clips.push(clip);
    this.state.selectedClipId = id;
    this.syncViews();
  }

  private addLowerThird() {
    const id = 'l3_' + Date.now();
    const clip: TimelineClip = {
      id,
      trackId: 'track-g1',
      name: 'أ. طارق ابوعشي // معلم المهارات الرقمية',
      type: 'shape',
      startTime: Math.round(this.state.currentTime * 30) / 30,
      duration: 8,
      color: '#00f0ff',
      blendMode: 'source-over',
      transform: { x: 0, y: 380, scale: 100, rotation: 0, opacity: 100 },
      keyframes: {
        y: [
          { time: 0, value: 500, easing: 'spring' },
          { time: 0.8, value: 380, easing: 'spring' }
        ]
      },
      shapeData: {
        shapeType: 'lower-third',
        fillColor: '#00f0ff',
        strokeColor: '#a855f7',
        strokeWidth: 1,
        cornerRadius: 12,
        width: 760,
        height: 84,
        subText: 'متوسطة أبها الأهلية // استوديو سينيموشن الرقمي'
      }
    };
    this.state.clips.push(clip);
    this.state.selectedClipId = id;
    this.syncViews();
  }

  private addGenerativeScene(sceneType: any, styleTag: string) {
    const id = 'gen_' + Date.now();
    const clip: TimelineClip = {
      id,
      trackId: 'track-v1',
      name: `AI: ${styleTag}`,
      type: 'generative',
      startTime: Math.round(this.state.currentTime * 30) / 30,
      duration: 10,
      color: '#3b82f6',
      blendMode: 'source-over',
      transform: { x: 0, y: 0, scale: 100, rotation: 0, opacity: 100 },
      keyframes: {},
      generativeData: {
        sceneType,
        colorA: '#00f0ff',
        colorB: '#a855f7',
        speed: 1.0
      }
    };
    this.state.clips.push(clip);
    this.state.selectedClipId = id;
    this.syncViews();
  }

  private uploadMediaFile(file: File) {
    const url = URL.createObjectURL(file);
    const id = 'media_' + Date.now();
    const clip: TimelineClip = {
      id,
      trackId: 'track-v2',
      name: file.name,
      type: 'image',
      startTime: Math.round(this.state.currentTime * 30) / 30,
      duration: 8,
      color: '#ec4899',
      blendMode: 'source-over',
      transform: { x: 0, y: 0, scale: 100, rotation: 0, opacity: 100 },
      keyframes: {},
      imageData: {
        url,
        width: 600,
        height: 400
      }
    };
    this.state.clips.push(clip);
    this.state.selectedClipId = id;
    this.syncViews();
  }

  // --- Project JSON Save & Load ---
  private saveProjectJSON() {
    const data = {
      version: '1.0.0',
      appName: 'CineMotion Creative Studio',
      state: this.state,
      shaderFX: this.shaderFX,
      colorGrading: this.colorGrading,
      audioMood: this.audioMood,
      audioVolume: this.audioVolume,
      showVisualizer: this.showVisualizer
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `CineMotion_Project_${Date.now()}.cinemotion`;
    link.click();
  }

  private loadProjectJSON(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data.state && Array.isArray(data.state.clips)) {
          this.state = data.state;
          if (data.shaderFX) this.shaderFX = data.shaderFX;
          if (data.colorGrading) this.colorGrading = data.colorGrading;
          if (data.audioMood) this.audioMood = data.audioMood;
          if (data.audioVolume) this.audioVolume = data.audioVolume;
          if (data.showVisualizer !== undefined) this.showVisualizer = data.showVisualizer;

          this.audioEngine.setMood(this.audioMood);
          this.viewportView.compositor.shaderFX = this.shaderFX;
          this.viewportView.compositor.colorGrading = this.colorGrading;
          this.viewportView.compositor.showVisualizerOverlay = this.showVisualizer;

          this.viewportView.resizeCanvas();
          this.timelineView.render();
          this.syncViews();
        }
      } catch (err) {
        alert('ملف المشروع غير صالح أو تالف');
      }
    };
    reader.readAsText(file);
  }

  // --- Real-time WebM Video Exporter ---
  private startVideoExport() {
    if (this.isExportingVideo) return;
    this.isExportingVideo = true;
    this.stopPlayback();

    const canvas = this.viewportView.canvas;
    const stream = canvas.captureStream(30);

    this.recordedChunks = [];
    try {
      this.mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9',
        videoBitsPerSecond: 8000000
      });
    } catch (e) {
      this.mediaRecorder = new MediaRecorder(stream);
    }

    this.mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        this.recordedChunks.push(e.data);
      }
    };

    this.mediaRecorder.onstop = () => {
      const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `CineMotion_Render_${Date.now()}.webm`;
      link.click();

      this.isExportingVideo = false;
      this.closeExportModal();
    };

    this.showExportModal();

    // Start playback from 0 to duration
    this.state.currentTime = 0;
    this.state.isPlaying = true;
    this.mediaRecorder.start();

    const durationMs = this.state.duration * 1000;
    const startExportTime = performance.now();

    const progressInterval = setInterval(() => {
      const elapsed = performance.now() - startExportTime;
      const progress = Math.min(100, (elapsed / durationMs) * 100);
      const fillEl = document.getElementById('modal-export-fill');
      const textEl = document.getElementById('modal-export-pct');
      if (fillEl) fillEl.style.width = `${progress}%`;
      if (textEl) textEl.textContent = `${Math.round(progress)}%`;

      if (elapsed >= durationMs) {
        clearInterval(progressInterval);
        this.stopPlayback();
        if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
          this.mediaRecorder.stop();
        }
      }
    }, 100);
  }

  private showExportModal() {
    const root = document.getElementById('export-modal-root')!;
    root.innerHTML = `
      <div class="studio-modal-backdrop">
        <div class="studio-modal-card">
          <div class="modal-header">
            <h3>${t('exportModalTitle')}</h3>
            <span id="modal-export-pct" style="color: var(--accent-cyan); font-weight: 700;">0%</span>
          </div>
          <p style="color: var(--text-secondary); font-size: 12px;">${t('renderingVideo')}</p>
          <div class="modal-progress-bar">
            <div class="modal-progress-fill" id="modal-export-fill"></div>
          </div>
        </div>
      </div>
    `;
  }

  private closeExportModal() {
    const root = document.getElementById('export-modal-root');
    if (root) root.innerHTML = '';
  }
}

// Bootstrap application on DOM ready
window.addEventListener('DOMContentLoaded', () => {
  new CineMotionApp();
});
