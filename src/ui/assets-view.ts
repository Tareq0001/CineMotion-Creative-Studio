import { turnkeyTemplates, ProjectTemplate } from '../engine/templates';
import { TimelineClip } from '../engine/timeline';
import { t } from './i18n';

export interface AssetsCallbacks {
  onLoadTemplate: (template: ProjectTemplate) => void;
  onAddTextLayer: (preset?: { text: string; fontSize: number; neon: boolean }) => void;
  onAddShapeLayer: (shapeType: 'rectangle' | 'rounded-rect' | 'circle' | 'star' | 'badge') => void;
  onAddLowerThird: () => void;
  onAddGenerativeScene: (sceneType: 'cyber-grid' | 'aurora' | 'lofi-sunset' | 'matrix-code' | 'fluid-blobs' | 'particle-stars', styleTag: string) => void;
  onUploadMedia: (file: File) => void;
}

export class AssetsView {
  private container: HTMLElement;
  private callbacks: AssetsCallbacks;
  private activeTab: 'templates' | 'ai' | 'layers' = 'templates';

  constructor(container: HTMLElement, callbacks: AssetsCallbacks) {
    this.container = container;
    this.callbacks = callbacks;
    this.render();
  }

  public render() {
    this.container.innerHTML = `
      <div class="assets-tabs-nav">
        <button class="asset-tab-btn ${this.activeTab === 'templates' ? 'active' : ''}" data-tab="templates">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          <span>${t('templates')}</span>
        </button>
        <button class="asset-tab-btn ${this.activeTab === 'ai' ? 'active' : ''}" data-tab="ai">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
          <span>AI STUDIO</span>
        </button>
        <button class="asset-tab-btn ${this.activeTab === 'layers' ? 'active' : ''}" data-tab="layers">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
          <span>${t('tracks')}</span>
        </button>
      </div>

      <div class="assets-content-area">
        ${this.renderActiveTab()}
      </div>
    `;

    this.attachEvents();
  }

  private renderActiveTab(): string {
    switch (this.activeTab) {
      case 'templates':
        return this.renderTemplatesTab();
      case 'ai':
        return this.renderAiTab();
      case 'layers':
        return this.renderLayersTab();
    }
  }

  // --- TAB 1: Turnkey Templates ---
  private renderTemplatesTab(): string {
    return `
      <div class="templates-grid">
        ${turnkeyTemplates.map(tmpl => `
          <div class="template-card" data-template-id="${tmpl.id}">
            <div class="template-card-header">
              <span class="template-ratio-tag">${tmpl.aspectRatio}</span>
              <span class="template-dur-tag">${tmpl.duration}s</span>
            </div>
            <div class="template-card-body">
              <h4 class="template-title">${t(tmpl.nameKey as any)}</h4>
              <p class="template-desc">${t(tmpl.descKey as any)}</p>
            </div>
            <button class="template-load-btn" data-template-id="${tmpl.id}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              <span>تحميل المشروع الفوري</span>
            </button>
          </div>
        `).join('')}
      </div>
    `;
  }

  // --- TAB 2: Generative AI Studio ---
  private renderAiTab(): string {
    const styleTags = [
      { id: 'cyber', label: 'Cyberpunk Neo-Tokyo', scene: 'cyber-grid' },
      { id: 'cinema', label: 'Cinematic Film 8K', scene: 'aurora' },
      { id: 'kinfolk', label: 'Kinfolk Minimalist', scene: 'fluid-blobs' },
      { id: 'lofi', label: 'Lofi Sunset Polaroid', scene: 'lofi-sunset' },
      { id: 'matrix', label: 'Digital Matrix Stream', scene: 'matrix-code' },
      { id: 'stars', label: '3D Hyperspace Stars', scene: 'particle-stars' }
    ];

    return `
      <div class="ai-studio-panel">
        <div class="ai-header-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
          <span>CINEMOTION NEURAL ENGINE // استوديو التوليد الرقمي</span>
        </div>

        <div class="ai-input-group">
          <label class="ai-label">${t('aiPrompt')}:</label>
          <textarea id="ai-prompt-input" class="studio-textarea" rows="3" placeholder="مثال: أفق مستقبلي نيون مع شبكة رقمية متوهجة وسماء أرجوانية..."></textarea>
        </div>

        <div class="ai-styles-section">
          <label class="ai-label">${t('aiStyles')}:</label>
          <div class="ai-tags-cloud">
            ${styleTags.map(st => `
              <button class="ai-tag-chip" data-scene="${st.scene}" data-tag="${st.label}">
                ✦ ${st.label}
              </button>
            `).join('')}
          </div>
        </div>

        <button id="btn-generate-scene" class="studio-btn-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
          <span>${t('generateScene')}</span>
        </button>
      </div>
    `;
  }

  // --- TAB 3: Layer Factory ---
  private renderLayersTab(): string {
    return `
      <div class="layer-factory-grid">
        <!-- Text Layers -->
        <div class="factory-group">
          <span class="group-title">${t('textProperties')}</span>
          <button class="factory-action-card" id="btn-add-text-title">
            <span class="card-icon">T</span>
            <div class="card-info">
              <strong>عنوان نيون سينمائي</strong>
              <small>نص ضخم بتوهج نيون مستقبلي</small>
            </div>
          </button>
          <button class="factory-action-card" id="btn-add-text-sub">
            <span class="card-icon">t</span>
            <div class="card-info">
              <strong>نص توضيحي عربي أنيق</strong>
              <small>خط تجوال ناصع وواضح</small>
            </div>
          </button>
        </div>

        <!-- Lower Thirds & Badges -->
        <div class="factory-group">
          <span class="group-title">الشارات والأشرطة التلفزيونية</span>
          <button class="factory-action-card" id="btn-add-lower-third">
            <span class="card-icon">▬</span>
            <div class="card-info">
              <strong>${t('addLowerThird')}</strong>
              <small>شريط إخباري أو تعريفي متحرك</small>
            </div>
          </button>
          <button class="factory-action-card" id="btn-add-badge">
            <span class="card-icon">🏷</span>
            <div class="card-info">
              <strong>شارة عروض وتخفيضات</strong>
              <small>شارة مائلة ذات تباين مرتفع</small>
            </div>
          </button>
        </div>

        <!-- Geometric Shapes -->
        <div class="factory-group">
          <span class="group-title">${t('shapeProperties')}</span>
          <div class="shape-buttons-row">
            <button class="shape-btn" data-shape="rectangle" title="مستطيل">▭</button>
            <button class="shape-btn" data-shape="rounded-rect" title="مستطيل مستدير">▢</button>
            <button class="shape-btn" data-shape="circle" title="دائرة">◯</button>
            <button class="shape-btn" data-shape="star" title="نجمة">★</button>
          </div>
        </div>

        <!-- Media Upload -->
        <div class="factory-group">
          <span class="group-title">${t('uploadMedia')}</span>
          <label class="media-upload-dropzone">
            <input type="file" id="media-file-input" accept="image/*,video/*" style="display: none;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            <span>اختر صورة أو فيديو محلي</span>
          </label>
        </div>
      </div>
    `;
  }

  private attachEvents() {
    // Tab switching
    this.container.querySelectorAll('.asset-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = (e.currentTarget as HTMLElement).dataset.tab as any;
        if (tab) {
          this.activeTab = tab;
          this.render();
        }
      });
    });

    // Load templates
    this.container.querySelectorAll('.template-load-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tid = (e.currentTarget as HTMLElement).dataset.templateId;
        const tmpl = turnkeyTemplates.find(t => t.id === tid);
        if (tmpl) {
          this.callbacks.onLoadTemplate(tmpl);
        }
      });
    });

    // AI Studio Tags
    let selectedScene: any = 'cyber-grid';
    let selectedTag = 'Cyberpunk Neo-Tokyo';

    this.container.querySelectorAll('.ai-tag-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        this.container.querySelectorAll('.ai-tag-chip').forEach(c => c.classList.remove('selected'));
        const el = e.currentTarget as HTMLElement;
        el.classList.add('selected');
        selectedScene = el.dataset.scene || 'cyber-grid';
        selectedTag = el.dataset.tag || 'Cyberpunk';
        const promptInput = this.container.querySelector('#ai-prompt-input') as HTMLTextAreaElement;
        if (promptInput) {
          promptInput.value = `${selectedTag} with vibrant volumetric lighting, 8K ultra detail`;
        }
      });
    });

    this.container.querySelector('#btn-generate-scene')?.addEventListener('click', () => {
      this.callbacks.onAddGenerativeScene(selectedScene, selectedTag);
    });

    // Layer buttons
    this.container.querySelector('#btn-add-text-title')?.addEventListener('click', () => {
      this.callbacks.onAddTextLayer({
        text: 'CINEMOTION // رؤية رقمية خارقة',
        fontSize: 64,
        neon: true
      });
    });

    this.container.querySelector('#btn-add-text-sub')?.addEventListener('click', () => {
      this.callbacks.onAddTextLayer({
        text: 'إبداع تصميم ومونتاج رقمي في المتصفح',
        fontSize: 36,
        neon: false
      });
    });

    this.container.querySelector('#btn-add-lower-third')?.addEventListener('click', () => {
      this.callbacks.onAddLowerThird();
    });

    this.container.querySelector('#btn-add-badge')?.addEventListener('click', () => {
      this.callbacks.onAddShapeLayer('badge');
    });

    this.container.querySelectorAll('.shape-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const shape = (e.currentTarget as HTMLElement).dataset.shape as any;
        if (shape) {
          this.callbacks.onAddShapeLayer(shape);
        }
      });
    });

    // Upload media file input
    const fileInput = this.container.querySelector('#media-file-input') as HTMLInputElement;
    fileInput?.addEventListener('change', (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        this.callbacks.onUploadMedia(files[0]);
      }
    });
  }
}
