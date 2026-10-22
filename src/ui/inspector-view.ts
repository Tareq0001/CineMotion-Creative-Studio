import { TimelineState, TimelineClip, BlendMode } from '../engine/timeline';
import { ShaderFXSettings } from '../engine/shaders';
import { ColorGradingSettings } from '../engine/color-grading';
import { AudioMood } from '../engine/audio';
import { EasingType, Keyframe } from '../engine/keyframes';
import { t } from './i18n';

export interface InspectorCallbacks {
  onClipPropertyChange: (clipId: string, updates: Partial<TimelineClip>) => void;
  onAddKeyframe: (clipId: string, property: 'x' | 'y' | 'scale' | 'rotation' | 'opacity', easing: EasingType) => void;
  onRemoveKeyframe: (clipId: string, property: 'x' | 'y' | 'scale' | 'rotation' | 'opacity') => void;
  onShaderFXChange: (fx: Partial<ShaderFXSettings>) => void;
  onColorGradingChange: (grading: Partial<ColorGradingSettings>) => void;
  onAudioMoodChange: (mood: AudioMood) => void;
  onAudioVolumeChange: (vol: number) => void;
  onVisualizerOverlayToggle: (enabled: boolean) => void;
}

export class InspectorView {
  private container: HTMLElement;
  private state: TimelineState;
  private shaderFX: ShaderFXSettings;
  private colorGrading: ColorGradingSettings;
  private audioMood: AudioMood;
  private audioVolume: number;
  private showVisualizer: boolean;
  private callbacks: InspectorCallbacks;
  private activeTab: 'clip' | 'shaders' | 'grading' | 'audio' = 'clip';

  constructor(
    container: HTMLElement,
    state: TimelineState,
    shaderFX: ShaderFXSettings,
    colorGrading: ColorGradingSettings,
    audioMood: AudioMood,
    audioVolume: number,
    showVisualizer: boolean,
    callbacks: InspectorCallbacks
  ) {
    this.container = container;
    this.state = state;
    this.shaderFX = shaderFX;
    this.colorGrading = colorGrading;
    this.audioMood = audioMood;
    this.audioVolume = audioVolume;
    this.showVisualizer = showVisualizer;
    this.callbacks = callbacks;

    this.render();
  }

  public update(
    state: TimelineState,
    shaderFX: ShaderFXSettings,
    colorGrading: ColorGradingSettings,
    audioMood: AudioMood,
    audioVolume: number,
    showVisualizer: boolean
  ) {
    this.state = state;
    this.shaderFX = shaderFX;
    this.colorGrading = colorGrading;
    this.audioMood = audioMood;
    this.audioVolume = audioVolume;
    this.showVisualizer = showVisualizer;
    this.render();
  }

  public render() {
    this.container.innerHTML = `
      <div class="inspector-tabs-nav">
        <button class="insp-tab-btn ${this.activeTab === 'clip' ? 'active' : ''}" data-tab="clip" title="${t('inspector')}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          <span>${t('inspector')}</span>
        </button>
        <button class="insp-tab-btn ${this.activeTab === 'shaders' ? 'active' : ''}" data-tab="shaders" title="${t('shadersAndFX')}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <span>FX</span>
        </button>
        <button class="insp-tab-btn ${this.activeTab === 'grading' ? 'active' : ''}" data-tab="grading" title="${t('colorGrading')}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 0 0 20v-20z"/></svg>
          <span>LUT</span>
        </button>
        <button class="insp-tab-btn ${this.activeTab === 'audio' ? 'active' : ''}" data-tab="audio" title="${t('audioEngine')}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
          <span>AUDIO</span>
        </button>
      </div>

      <div class="inspector-scroll-area">
        ${this.renderActiveTabContent()}
      </div>
    `;

    this.attachEvents();
  }

  private renderActiveTabContent(): string {
    switch (this.activeTab) {
      case 'clip':
        return this.renderClipInspector();
      case 'shaders':
        return this.renderShadersInspector();
      case 'grading':
        return this.renderColorGradingInspector();
      case 'audio':
        return this.renderAudioInspector();
    }
  }

  // --- TAB 1: Selected Clip Inspector ---
  private renderClipInspector(): string {
    const selected = this.state.clips.find(c => c.id === this.state.selectedClipId);
    if (!selected) {
      return `
        <div class="empty-inspector-state">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
          <p>${t('noClipSelected')}</p>
        </div>
      `;
    }

    const tr = selected.transform;
    const clipLocalTime = Math.max(0, this.state.currentTime - selected.startTime);

    return `
      <!-- Transform & Motion -->
      <div class="inspector-section">
        <div class="section-title">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
          <span>${t('transform')}</span>
        </div>

        <div class="insp-field-row">
          <label>${t('posX')}</label>
          <div class="insp-input-group">
            <input type="number" id="inp-pos-x" class="studio-input-num" value="${tr.x}">
            <button class="kf-toggle-btn ${this.hasKeyframe(selected, 'x', clipLocalTime) ? 'active' : ''}" data-prop="x" title="${t('keyframes')}">◆</button>
          </div>
        </div>

        <div class="insp-field-row">
          <label>${t('posY')}</label>
          <div class="insp-input-group">
            <input type="number" id="inp-pos-y" class="studio-input-num" value="${tr.y}">
            <button class="kf-toggle-btn ${this.hasKeyframe(selected, 'y', clipLocalTime) ? 'active' : ''}" data-prop="y" title="${t('keyframes')}">◆</button>
          </div>
        </div>

        <div class="insp-field-row">
          <label>${t('scale')}</label>
          <div class="insp-input-group">
            <input type="range" id="inp-scale" min="10" max="300" value="${tr.scale}" class="studio-slider">
            <span class="val-display">${tr.scale}%</span>
            <button class="kf-toggle-btn ${this.hasKeyframe(selected, 'scale', clipLocalTime) ? 'active' : ''}" data-prop="scale" title="${t('keyframes')}">◆</button>
          </div>
        </div>

        <div class="insp-field-row">
          <label>${t('rotation')}</label>
          <div class="insp-input-group">
            <input type="range" id="inp-rotation" min="-180" max="180" value="${tr.rotation}" class="studio-slider">
            <span class="val-display">${tr.rotation}°</span>
            <button class="kf-toggle-btn ${this.hasKeyframe(selected, 'rotation', clipLocalTime) ? 'active' : ''}" data-prop="rotation" title="${t('keyframes')}">◆</button>
          </div>
        </div>

        <div class="insp-field-row">
          <label>${t('opacity')}</label>
          <div class="insp-input-group">
            <input type="range" id="inp-opacity" min="0" max="100" value="${tr.opacity}" class="studio-slider">
            <span class="val-display">${tr.opacity}%</span>
            <button class="kf-toggle-btn ${this.hasKeyframe(selected, 'opacity', clipLocalTime) ? 'active' : ''}" data-prop="opacity" title="${t('keyframes')}">◆</button>
          </div>
        </div>

        <div class="insp-field-row">
          <label>${t('blendMode')}</label>
          <select id="inp-blend" class="studio-select">
            <option value="source-over" ${selected.blendMode === 'source-over' ? 'selected' : ''}>Normal</option>
            <option value="screen" ${selected.blendMode === 'screen' ? 'selected' : ''}>Screen</option>
            <option value="multiply" ${selected.blendMode === 'multiply' ? 'selected' : ''}>Multiply</option>
            <option value="overlay" ${selected.blendMode === 'overlay' ? 'selected' : ''}>Overlay</option>
            <option value="color-dodge" ${selected.blendMode === 'color-dodge' ? 'selected' : ''}>Color Dodge</option>
            <option value="luminosity" ${selected.blendMode === 'luminosity' ? 'selected' : ''}>Luminosity</option>
          </select>
        </div>
      </div>

      <!-- Text Properties (if Text Clip) -->
      ${selected.type === 'text' && selected.textData ? this.renderTextInspector(selected) : ''}

      <!-- Shape Properties (if Shape Clip) -->
      ${selected.type === 'shape' && selected.shapeData ? this.renderShapeInspector(selected) : ''}
    `;
  }

  private renderTextInspector(clip: TimelineClip): string {
    const td = clip.textData!;
    return `
      <div class="inspector-section">
        <div class="section-title">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>
          <span>${t('textProperties')}</span>
        </div>

        <div class="insp-field-col">
          <label>${t('textContent')}</label>
          <textarea id="inp-text-content" class="studio-textarea" rows="2">${td.text}</textarea>
        </div>

        <div class="insp-field-row">
          <label>${t('fontFamily')}</label>
          <select id="inp-font-family" class="studio-select">
            <option value="Cairo" ${td.fontFamily === 'Cairo' ? 'selected' : ''}>Cairo (عربي عريض)</option>
            <option value="Tajawal" ${td.fontFamily === 'Tajawal' ? 'selected' : ''}>Tajawal (عربي رشيق)</option>
            <option value="Orbitron" ${td.fontFamily === 'Orbitron' ? 'selected' : ''}>Orbitron (Cyberpunk)</option>
            <option value="Inter" ${td.fontFamily === 'Inter' ? 'selected' : ''}>Inter (Modern Sans)</option>
            <option value="Bebas Neue" ${td.fontFamily === 'Bebas Neue' ? 'selected' : ''}>Bebas Neue (Headline)</option>
            <option value="Playfair Display" ${td.fontFamily === 'Playfair Display' ? 'selected' : ''}>Playfair Display (Editorial)</option>
          </select>
        </div>

        <div class="insp-field-row">
          <label>${t('fontSize')}</label>
          <input type="number" id="inp-font-size" class="studio-input-num" value="${td.fontSize}" min="16" max="200">
        </div>

        <div class="insp-field-row">
          <label>${t('textColor')}</label>
          <input type="color" id="inp-text-color" class="studio-color-picker" value="${td.textColor}">
        </div>

        <div class="insp-field-row">
          <label>${t('strokeColor')}</label>
          <input type="color" id="inp-stroke-color" class="studio-color-picker" value="${td.strokeColor}">
        </div>

        <div class="insp-field-row">
          <label>${t('strokeWidth')}</label>
          <input type="range" id="inp-stroke-width" min="0" max="20" value="${td.strokeWidth}" class="studio-slider">
        </div>

        <div class="insp-field-row">
          <label>${t('neonGlow')}</label>
          <input type="checkbox" id="inp-neon-glow" ${td.neonGlow ? 'checked' : ''} class="studio-checkbox">
          <input type="color" id="inp-glow-color" class="studio-color-picker" value="${td.glowColor || '#00f0ff'}">
        </div>
      </div>
    `;
  }

  private renderShapeInspector(clip: TimelineClip): string {
    const sd = clip.shapeData!;
    return `
      <div class="inspector-section">
        <div class="section-title">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>
          <span>${t('shapeProperties')}</span>
        </div>

        <div class="insp-field-row">
          <label>${t('fillColor')}</label>
          <input type="color" id="inp-shape-fill" class="studio-color-picker" value="${sd.fillColor}">
        </div>

        <div class="insp-field-row">
          <label>${t('strokeColor')}</label>
          <input type="color" id="inp-shape-stroke" class="studio-color-picker" value="${sd.strokeColor}">
        </div>

        <div class="insp-field-row">
          <label>${t('strokeWidth')}</label>
          <input type="range" id="inp-shape-strokewidth" min="0" max="20" value="${sd.strokeWidth}" class="studio-slider">
        </div>

        <div class="insp-field-row">
          <label>${t('cornerRadius')}</label>
          <input type="range" id="inp-shape-radius" min="0" max="60" value="${sd.cornerRadius}" class="studio-slider">
        </div>
      </div>
    `;
  }

  // --- TAB 2: WebGL Post-Processing FX Inspector ---
  private renderShadersInspector(): string {
    const fx = this.shaderFX;
    return `
      <div class="inspector-section">
        <div class="section-title">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <span>${t('shadersAndFX')}</span>
        </div>

        <div class="insp-field-row">
          <label>${t('filmGrain')}</label>
          <div class="insp-input-group">
            <input type="range" id="fx-film-grain" min="0" max="100" value="${fx.filmGrain}" class="studio-slider">
            <span class="val-display">${fx.filmGrain}%</span>
          </div>
        </div>

        <div class="insp-field-row">
          <label>${t('chromaticAberration')}</label>
          <div class="insp-input-group">
            <input type="range" id="fx-chromatic" min="0" max="100" value="${fx.chromaticAberration}" class="studio-slider">
            <span class="val-display">${fx.chromaticAberration}%</span>
          </div>
        </div>

        <div class="insp-field-row">
          <label>${t('crtGlitch')}</label>
          <div class="insp-input-group">
            <input type="range" id="fx-crt-glitch" min="0" max="100" value="${fx.crtGlitch}" class="studio-slider">
            <span class="val-display">${fx.crtGlitch}%</span>
          </div>
        </div>

        <div class="insp-field-row">
          <label>${t('bloom')}</label>
          <div class="insp-input-group">
            <input type="range" id="fx-bloom" min="0" max="100" value="${fx.bloom}" class="studio-slider">
            <span class="val-display">${fx.bloom}%</span>
          </div>
        </div>

        <div class="insp-field-row">
          <label>${t('vignette')}</label>
          <div class="insp-input-group">
            <input type="range" id="fx-vignette" min="0" max="100" value="${fx.vignette}" class="studio-slider">
            <span class="val-display">${fx.vignette}%</span>
          </div>
        </div>

        <div class="insp-field-row">
          <label>${t('vhsRetro')}</label>
          <div class="insp-input-group">
            <input type="range" id="fx-vhs" min="0" max="100" value="${fx.vhsRetro}" class="studio-slider">
            <span class="val-display">${fx.vhsRetro}%</span>
          </div>
        </div>

        <div class="insp-field-row">
          <label>${t('duotone')}</label>
          <div class="insp-input-group">
            <input type="checkbox" id="fx-duotone-toggle" ${fx.duotone ? 'checked' : ''} class="studio-checkbox">
            <input type="color" id="fx-duotone-col1" class="studio-color-picker" value="${fx.duotoneColor1}">
            <input type="color" id="fx-duotone-col2" class="studio-color-picker" value="${fx.duotoneColor2}">
          </div>
        </div>
      </div>
    `;
  }

  // --- TAB 3: Color Grading & LUT Inspector ---
  private renderColorGradingInspector(): string {
    const cg = this.colorGrading;
    return `
      <div class="inspector-section">
        <div class="section-title">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 0 0 20v-20z"/></svg>
          <span>${t('colorGrading')}</span>
        </div>

        <div class="insp-field-row">
          <label>${t('lutPreset')}</label>
          <select id="cg-preset" class="studio-select">
            <option value="none" ${cg.preset === 'none' ? 'selected' : ''}>None (Rec.709 Clean)</option>
            <option value="teal-orange" ${cg.preset === 'teal-orange' ? 'selected' : ''}>Teal & Orange Blockbuster</option>
            <option value="cyber-neon" ${cg.preset === 'cyber-neon' ? 'selected' : ''}>Cyberpunk Neon Matrix</option>
            <option value="kinfolk-warm" ${cg.preset === 'kinfolk-warm' ? 'selected' : ''}>Kinfolk Warm Earth Film</option>
            <option value="bw-contrast" ${cg.preset === 'bw-contrast' ? 'selected' : ''}>B&W High Contrast Noir</option>
            <option value="vintage-kodak" ${cg.preset === 'vintage-kodak' ? 'selected' : ''}>70s Vintage Kodachrome</option>
          </select>
        </div>

        <div class="insp-field-row">
          <label>${t('exposure')}</label>
          <div class="insp-input-group">
            <input type="range" id="cg-exposure" min="-100" max="100" value="${cg.exposure}" class="studio-slider">
            <span class="val-display">${cg.exposure}</span>
          </div>
        </div>

        <div class="insp-field-row">
          <label>${t('contrast')}</label>
          <div class="insp-input-group">
            <input type="range" id="cg-contrast" min="-100" max="100" value="${cg.contrast}" class="studio-slider">
            <span class="val-display">${cg.contrast}</span>
          </div>
        </div>

        <div class="insp-field-row">
          <label>${t('saturation')}</label>
          <div class="insp-input-group">
            <input type="range" id="cg-saturation" min="-100" max="100" value="${cg.saturation}" class="studio-slider">
            <span class="val-display">${cg.saturation}</span>
          </div>
        </div>

        <div class="insp-field-row">
          <label>${t('temperature')}</label>
          <div class="insp-input-group">
            <input type="range" id="cg-temp" min="-100" max="100" value="${cg.temperature}" class="studio-slider">
            <span class="val-display">${cg.temperature}</span>
          </div>
        </div>

        <div class="insp-field-row">
          <label>${t('tint')}</label>
          <div class="insp-input-group">
            <input type="range" id="cg-tint" min="-100" max="100" value="${cg.tint}" class="studio-slider">
            <span class="val-display">${cg.tint}</span>
          </div>
        </div>

        <div class="insp-field-row">
          <label>${t('highlights')}</label>
          <div class="insp-input-group">
            <input type="range" id="cg-highlights" min="-100" max="100" value="${cg.highlights}" class="studio-slider">
            <span class="val-display">${cg.highlights}</span>
          </div>
        </div>

        <div class="insp-field-row">
          <label>${t('shadows')}</label>
          <div class="insp-input-group">
            <input type="range" id="cg-shadows" min="-100" max="100" value="${cg.shadows}" class="studio-slider">
            <span class="val-display">${cg.shadows}</span>
          </div>
        </div>
      </div>
    `;
  }

  // --- TAB 4: Audio Engine Inspector ---
  private renderAudioInspector(): string {
    return `
      <div class="inspector-section">
        <div class="section-title">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
          <span>${t('audioEngine')}</span>
        </div>

        <div class="insp-field-row">
          <label>${t('audioMood')}</label>
          <select id="audio-mood-select" class="studio-select">
            <option value="synthwave" ${this.audioMood === 'synthwave' ? 'selected' : ''}>Synthwave Cyber 120 BPM</option>
            <option value="kinfolk" ${this.audioMood === 'kinfolk' ? 'selected' : ''}>Kinfolk Organic Ambient 72 BPM</option>
            <option value="tiktok" ${this.audioMood === 'tiktok' ? 'selected' : ''}>TikTok Punchy Pop 128 BPM</option>
            <option value="lofi" ${this.audioMood === 'lofi' ? 'selected' : ''}>Lofi Sunset Rhodes 84 BPM</option>
          </select>
        </div>

        <div class="insp-field-row">
          <label>${t('audioVolume')}</label>
          <div class="insp-input-group">
            <input type="range" id="audio-vol-slider" min="0" max="100" value="${Math.round(this.audioVolume * 100)}" class="studio-slider">
            <span class="val-display">${Math.round(this.audioVolume * 100)}%</span>
          </div>
        </div>

        <div class="insp-field-row">
          <label>${t('visualizerOverlay')}</label>
          <input type="checkbox" id="audio-viz-overlay" ${this.showVisualizer ? 'checked' : ''} class="studio-checkbox">
        </div>
      </div>
    `;
  }

  private hasKeyframe(clip: TimelineClip, prop: 'x' | 'y' | 'scale' | 'rotation' | 'opacity', localTime: number): boolean {
    const kfs = clip.keyframes[prop];
    if (!kfs) return false;
    return kfs.some(k => Math.abs(k.time - localTime) < 0.1);
  }

  private attachEvents() {
    // Tab switching
    this.container.querySelectorAll('.insp-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = (e.currentTarget as HTMLElement).dataset.tab as any;
        if (tab) {
          this.activeTab = tab;
          this.render();
        }
      });
    });

    const selected = this.state.clips.find(c => c.id === this.state.selectedClipId);

    // Transform inputs
    if (selected) {
      const getVal = (id: string) => Number((this.container.querySelector(id) as HTMLInputElement)?.value || 0);

      const updateTransform = () => {
        this.callbacks.onClipPropertyChange(selected.id, {
          transform: {
            x: getVal('#inp-pos-x'),
            y: getVal('#inp-pos-y'),
            scale: getVal('#inp-scale'),
            rotation: getVal('#inp-rotation'),
            opacity: getVal('#inp-opacity')
          }
        });
      };

      this.container.querySelector('#inp-pos-x')?.addEventListener('input', updateTransform);
      this.container.querySelector('#inp-pos-y')?.addEventListener('input', updateTransform);
      this.container.querySelector('#inp-scale')?.addEventListener('input', updateTransform);
      this.container.querySelector('#inp-rotation')?.addEventListener('input', updateTransform);
      this.container.querySelector('#inp-opacity')?.addEventListener('input', updateTransform);

      this.container.querySelector('#inp-blend')?.addEventListener('change', (e) => {
        this.callbacks.onClipPropertyChange(selected.id, {
          blendMode: (e.target as HTMLSelectElement).value as BlendMode
        });
      });

      // Keyframe toggles
      this.container.querySelectorAll('.kf-toggle-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const prop = (e.currentTarget as HTMLElement).dataset.prop as any;
          const clipLocalTime = Math.max(0, this.state.currentTime - selected.startTime);
          if (this.hasKeyframe(selected, prop, clipLocalTime)) {
            this.callbacks.onRemoveKeyframe(selected.id, prop);
          } else {
            this.callbacks.onAddKeyframe(selected.id, prop, 'easeInOut');
          }
        });
      });

      // Text property events
      if (selected.type === 'text' && selected.textData) {
        const updateText = () => {
          const text = (this.container.querySelector('#inp-text-content') as HTMLTextAreaElement)?.value || '';
          const fontFamily = (this.container.querySelector('#inp-font-family') as HTMLSelectElement)?.value || 'Cairo';
          const fontSize = Number((this.container.querySelector('#inp-font-size') as HTMLInputElement)?.value || 48);
          const textColor = (this.container.querySelector('#inp-text-color') as HTMLInputElement)?.value || '#ffffff';
          const strokeColor = (this.container.querySelector('#inp-stroke-color') as HTMLInputElement)?.value || '#000000';
          const strokeWidth = Number((this.container.querySelector('#inp-stroke-width') as HTMLInputElement)?.value || 0);
          const neonGlow = (this.container.querySelector('#inp-neon-glow') as HTMLInputElement)?.checked || false;
          const glowColor = (this.container.querySelector('#inp-glow-color') as HTMLInputElement)?.value || '#00f0ff';

          this.callbacks.onClipPropertyChange(selected.id, {
            textData: {
              ...selected.textData!,
              text,
              fontFamily,
              fontSize,
              textColor,
              strokeColor,
              strokeWidth,
              neonGlow,
              glowColor
            }
          });
        };

        this.container.querySelector('#inp-text-content')?.addEventListener('input', updateText);
        this.container.querySelector('#inp-font-family')?.addEventListener('change', updateText);
        this.container.querySelector('#inp-font-size')?.addEventListener('input', updateText);
        this.container.querySelector('#inp-text-color')?.addEventListener('input', updateText);
        this.container.querySelector('#inp-stroke-color')?.addEventListener('input', updateText);
        this.container.querySelector('#inp-stroke-width')?.addEventListener('input', updateText);
        this.container.querySelector('#inp-neon-glow')?.addEventListener('change', updateText);
        this.container.querySelector('#inp-glow-color')?.addEventListener('input', updateText);
      }

      // Shape property events
      if (selected.type === 'shape' && selected.shapeData) {
        const updateShape = () => {
          const fillColor = (this.container.querySelector('#inp-shape-fill') as HTMLInputElement)?.value || '#00f0ff';
          const strokeColor = (this.container.querySelector('#inp-shape-stroke') as HTMLInputElement)?.value || '#ffffff';
          const strokeWidth = Number((this.container.querySelector('#inp-shape-strokewidth') as HTMLInputElement)?.value || 0);
          const cornerRadius = Number((this.container.querySelector('#inp-shape-radius') as HTMLInputElement)?.value || 0);

          this.callbacks.onClipPropertyChange(selected.id, {
            shapeData: {
              ...selected.shapeData!,
              fillColor,
              strokeColor,
              strokeWidth,
              cornerRadius
            }
          });
        };

        this.container.querySelector('#inp-shape-fill')?.addEventListener('input', updateShape);
        this.container.querySelector('#inp-shape-stroke')?.addEventListener('input', updateShape);
        this.container.querySelector('#inp-shape-strokewidth')?.addEventListener('input', updateShape);
        this.container.querySelector('#inp-shape-radius')?.addEventListener('input', updateShape);
      }
    }

    // Shader FX inputs
    const getSlider = (id: string) => Number((this.container.querySelector(id) as HTMLInputElement)?.value || 0);

    const updateShaders = () => {
      this.callbacks.onShaderFXChange({
        filmGrain: getSlider('#fx-film-grain'),
        chromaticAberration: getSlider('#fx-chromatic'),
        crtGlitch: getSlider('#fx-crt-glitch'),
        bloom: getSlider('#fx-bloom'),
        vignette: getSlider('#fx-vignette'),
        vhsRetro: getSlider('#fx-vhs'),
        duotone: (this.container.querySelector('#fx-duotone-toggle') as HTMLInputElement)?.checked || false,
        duotoneColor1: (this.container.querySelector('#fx-duotone-col1') as HTMLInputElement)?.value || '#0f172a',
        duotoneColor2: (this.container.querySelector('#fx-duotone-col2') as HTMLInputElement)?.value || '#00f0ff'
      });
    };

    ['#fx-film-grain', '#fx-chromatic', '#fx-crt-glitch', '#fx-bloom', '#fx-vignette', '#fx-vhs'].forEach(id => {
      this.container.querySelector(id)?.addEventListener('input', updateShaders);
    });
    this.container.querySelector('#fx-duotone-toggle')?.addEventListener('change', updateShaders);
    this.container.querySelector('#fx-duotone-col1')?.addEventListener('input', updateShaders);
    this.container.querySelector('#fx-duotone-col2')?.addEventListener('input', updateShaders);

    // Color Grading inputs
    const updateGrading = () => {
      this.callbacks.onColorGradingChange({
        preset: (this.container.querySelector('#cg-preset') as HTMLSelectElement)?.value as any || 'none',
        exposure: getSlider('#cg-exposure'),
        contrast: getSlider('#cg-contrast'),
        saturation: getSlider('#cg-saturation'),
        temperature: getSlider('#cg-temp'),
        tint: getSlider('#cg-tint'),
        highlights: getSlider('#cg-highlights'),
        shadows: getSlider('#cg-shadows')
      });
    };

    this.container.querySelector('#cg-preset')?.addEventListener('change', updateGrading);
    ['#cg-exposure', '#cg-contrast', '#cg-saturation', '#cg-temp', '#cg-tint', '#cg-highlights', '#cg-shadows'].forEach(id => {
      this.container.querySelector(id)?.addEventListener('input', updateGrading);
    });

    // Audio Engine inputs
    this.container.querySelector('#audio-mood-select')?.addEventListener('change', (e) => {
      this.callbacks.onAudioMoodChange((e.target as HTMLSelectElement).value as AudioMood);
    });

    this.container.querySelector('#audio-vol-slider')?.addEventListener('input', (e) => {
      const val = Number((e.target as HTMLInputElement).value) / 100;
      this.callbacks.onAudioVolumeChange(val);
    });

    this.container.querySelector('#audio-viz-overlay')?.addEventListener('change', (e) => {
      this.callbacks.onVisualizerOverlayToggle((e.target as HTMLInputElement).checked);
    });
  }
}
