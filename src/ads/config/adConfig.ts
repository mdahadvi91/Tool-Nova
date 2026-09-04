import { AdProviderConfig, AdSlotConfig, AdPlacement } from '../types';

export const AD_PROVIDERS_CONFIG: Record<string, AdProviderConfig> = {
  adsense: {
    id: 'adsense',
    name: 'Google AdSense',
    // Ads stay disabled until a real publisher client ID is configured.
    // Never render placeholder ad units in production.
    enabled: false,
    killSwitch: false,
    clientId: 'ca-pub-0000000000000000', // Configurable via .env
    slotIds: {
      'home-after-popular': '1001',
      'home-after-featured': '1002',
      'workspace-after-tools': '2001',
      'workspace-after-faq': '2002',
      'tool-after-faq': '3001',
      'tool-before-footer': '3002',
    }
  },
  monetag: {
    id: 'monetag',
    name: 'Monetag',
    enabled: false,
    killSwitch: false,
    siteId: 'monetag-zone-0000'
  },
  adsterra: {
    id: 'adsterra',
    name: 'Adsterra',
    enabled: false,
    killSwitch: false,
    siteId: 'adsterra-placement-0000'
  }
};

export const AD_SLOTS: Record<AdPlacement, AdSlotConfig> = {
  'home-after-popular': {
    id: 'slot-home-pop',
    placement: 'home-after-popular',
    preferredProvider: 'adsense',
    format: 'responsive-banner',
    minWidth: 320,
    minHeight: 90
  },
  'home-after-featured': {
    id: 'slot-home-feat',
    placement: 'home-after-featured',
    preferredProvider: 'adsense',
    format: 'leaderboard',
    minWidth: 320,
    minHeight: 90
  },
  'workspace-after-tools': {
    id: 'slot-ws-tools',
    placement: 'workspace-after-tools',
    preferredProvider: 'adsense',
    format: 'responsive-banner',
    minWidth: 320,
    minHeight: 90
  },
  'workspace-after-faq': {
    id: 'slot-ws-faq',
    placement: 'workspace-after-faq',
    preferredProvider: 'adsense',
    format: 'leaderboard',
    minWidth: 320,
    minHeight: 90
  },
  'tool-after-faq': {
    id: 'slot-tool-faq',
    placement: 'tool-after-faq',
    preferredProvider: 'adsense',
    format: 'responsive-banner',
    minWidth: 320,
    minHeight: 90
  },
  'tool-before-footer': {
    id: 'slot-tool-footer',
    placement: 'tool-before-footer',
    preferredProvider: 'adsense',
    format: 'leaderboard',
    minWidth: 320,
    minHeight: 90
  },
  'legal-after-content': {
    id: 'slot-legal',
    placement: 'legal-after-content',
    preferredProvider: 'adsense',
    format: 'responsive-banner',
    minWidth: 320,
    minHeight: 90
  }
};
