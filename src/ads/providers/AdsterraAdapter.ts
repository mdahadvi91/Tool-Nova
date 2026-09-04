import { AdProviderAdapter, AdProviderConfig, AdSlotConfig, AdConsentState } from '../types';

export class AdsterraAdapter implements AdProviderAdapter {
  id: 'adsterra' = 'adsterra';
  name = 'Adsterra';
  private config: AdProviderConfig | null = null;

  async initialize(config: AdProviderConfig, _consent: AdConsentState): Promise<boolean> {
    this.config = config;
    if (!config.enabled || config.killSwitch) return false;
    return true;
  }

  isAvailable(): boolean {
    return Boolean(
      this.config?.enabled &&
      !this.config?.killSwitch &&
      this.config.siteId &&
      !this.config.siteId.includes('0000'),
    );
  }

  async render(container: HTMLElement, slotConfig: AdSlotConfig): Promise<boolean> {
    if (!this.isAvailable()) return false;
    container.innerHTML = `
      <div class="w-full py-4 px-3 flex flex-col items-center justify-center">
        <span class="text-[11px] uppercase tracking-widest text-slate-500 font-semibold mb-2">Sponsored Content</span>
        <div class="w-full max-w-4xl h-24 border border-dashed border-slate-700/60 bg-slate-900/40 rounded-lg flex flex-col items-center justify-center p-4">
          <span class="text-xs text-slate-400 font-mono">Adsterra Banner [${slotConfig.placement}]</span>
        </div>
      </div>
    `;
    return true;
  }

  destroy(container: HTMLElement): void {
    container.innerHTML = '';
  }
}
