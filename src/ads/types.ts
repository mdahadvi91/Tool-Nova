export type AdProviderId = 'adsense' | 'monetag' | 'adsterra';

export type AdPlacement =
  | 'home-after-popular'
  | 'home-after-featured'
  | 'workspace-after-tools'
  | 'workspace-after-faq'
  | 'tool-after-faq'
  | 'tool-before-footer'
  | 'legal-after-content'
  | 'search-between-results';

export interface AdSlotConfig {
  id: string;
  placement: AdPlacement;
  preferredProvider: AdProviderId;
  format: 'leaderboard' | 'rectangle' | 'responsive-banner';
  minWidth: number;
  minHeight: number;
}

export interface AdProviderConfig {
  id: AdProviderId;
  name: string;
  enabled: boolean;
  killSwitch: boolean;
  clientId?: string;
  siteId?: string;
  slotIds?: Record<string, string>;
}

export interface AdConsentState {
  hasConsent: boolean;
  analyticsConsent: boolean;
  marketingConsent: boolean;
  personalizedAds: boolean;
  decidedAt?: number;
}

export interface AdProviderAdapter {
  id: AdProviderId;
  name: string;
  initialize(config: AdProviderConfig, consent: AdConsentState): Promise<boolean>;
  render(container: HTMLElement, slotConfig: AdSlotConfig): Promise<boolean>;
  destroy(container: HTMLElement): void;
  isAvailable(): boolean;
}
