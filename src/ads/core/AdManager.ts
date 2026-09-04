import { AdProviderAdapter, AdProviderId, AdSlotConfig, AdConsentState, AdPlacement } from '../types';
import { AD_PROVIDERS_CONFIG, AD_SLOTS } from '../config/adConfig';
import { validatePlacementPolicy } from '../policies/placementPolicy';
import { AdSenseAdapter } from '../providers/AdSenseAdapter';
import { MonetagAdapter } from '../providers/MonetagAdapter';
import { AdsterraAdapter } from '../providers/AdsterraAdapter';

export class AdManager {
  private static instance: AdManager;
  private adapters: Map<AdProviderId, AdProviderAdapter> = new Map();
  private consent: AdConsentState = {
    hasConsent: false,
    analyticsConsent: false,
    marketingConsent: false,
    personalizedAds: false
  };

  private constructor() {
    this.registerAdapter(new AdSenseAdapter());
    this.registerAdapter(new MonetagAdapter());
    this.registerAdapter(new AdsterraAdapter());
  }

  static getInstance(): AdManager {
    if (!AdManager.instance) {
      AdManager.instance = new AdManager();
    }
    return AdManager.instance;
  }

  registerAdapter(adapter: AdProviderAdapter) {
    this.adapters.set(adapter.id, adapter);
  }

  async updateConsent(consent: AdConsentState) {
    this.consent = consent;
    for (const [id, adapter] of this.adapters.entries()) {
      const config = AD_PROVIDERS_CONFIG[id];
      if (config) {
        await adapter.initialize(config, consent);
      }
    }
  }

  getConsent(): AdConsentState {
    return this.consent;
  }

  async renderSlot(container: HTMLElement, placement: AdPlacement): Promise<boolean> {
    const policy = validatePlacementPolicy(placement);
    if (!policy.isValid) {
      console.warn(`[AdManager] Placement blocked by policy: ${policy.reason}`);
      container.style.display = 'none';
      return false;
    }

    const slotConfig = AD_SLOTS[placement];
    if (!slotConfig) {
      console.warn(`[AdManager] No configuration registered for placement: ${placement}`);
      container.style.display = 'none';
      return false;
    }

    const adapter = this.adapters.get(slotConfig.preferredProvider);
    if (!adapter || !adapter.isAvailable()) {
      // Fallback or safe collapse
      container.style.display = 'none';
      return false;
    }

    return adapter.render(container, slotConfig);
  }
}

export const adManager = AdManager.getInstance();
