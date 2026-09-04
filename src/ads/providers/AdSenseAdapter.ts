import { AdProviderAdapter, AdProviderConfig, AdSlotConfig, AdConsentState } from '../types';

export class AdSenseAdapter implements AdProviderAdapter {
  id: 'adsense' = 'adsense';
  name = 'Google AdSense';
  private config: AdProviderConfig | null = null;
  private consent: AdConsentState | null = null;

  async initialize(config: AdProviderConfig, consent: AdConsentState): Promise<boolean> {
    this.config = config;
    this.consent = consent;
    if (!config.enabled || config.killSwitch) return false;
    return true;
  }

  isAvailable(): boolean {
    return Boolean(this.config?.enabled && !this.config?.killSwitch);
  }

  async render(container: HTMLElement, slotConfig: AdSlotConfig): Promise<boolean> {
    if (!this.isAvailable()) return false;
    container.innerHTML = '';

    // Create clearly distinguishable ad container adhering to AdSense separation guidelines
    const adWrapper = document.createElement('div');
    adWrapper.className = 'w-full py-4 px-3 flex flex-col items-center justify-center';

    const label = document.createElement('div');
    label.className = 'text-[11px] uppercase tracking-widest text-slate-500 font-semibold mb-2';
    label.textContent = 'Advertisement';
    adWrapper.appendChild(label);

    const bannerBox = document.createElement('div');
    bannerBox.className = 'w-full max-w-4xl h-24 border border-dashed border-slate-700/60 bg-slate-900/40 rounded-lg flex flex-col items-center justify-center text-center p-4 transition-colors hover:border-slate-600';
    
    // In dev / production placeholder until live client ID is supplied
    bannerBox.innerHTML = `
      <div class="flex items-center gap-2 text-slate-400 text-xs font-mono">
        <span class="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
        <span>AdSense Banner Slot [${slotConfig.placement}]</span>
      </div>
      <span class="text-[11px] text-slate-500 mt-1">Configured Client: ${this.config?.clientId || 'ca-pub-0000000000000000'}</span>
    `;

    adWrapper.appendChild(bannerBox);
    container.appendChild(adWrapper);
    return true;
  }

  destroy(container: HTMLElement): void {
    container.innerHTML = '';
  }
}
