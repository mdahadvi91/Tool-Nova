export interface WorkspaceCategory {
  id: string;
  name: string;
  description: string;
}

export interface WorkspaceDefinition {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  iconName: string;
  colorAccent: string;
  categories: string[];
  toolIds: string[];
  priority: number;
  status: 'active' | 'beta' | 'maintenance';
  seo: {
    title: string;
    metaDescription: string;
    keywords: string[];
  };
  features: string[];
}

export interface ToolDefinition {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  workspaceId: string;
  route: string;
  iconName: string;
  category: string;
  tags: string[];
  keywords: string[];
  status: 'active' | 'beta' | 'maintenance';
  isPopular?: boolean;
  isFeatured?: boolean;
  supportedFormats?: string[];
  clientOnly: boolean;
  requiresBackend: boolean;
  requiresAI: boolean;
  relatedToolIds?: string[];
  seo: {
    title: string;
    h1: string;
    metaDescription: string;
    howItWorks: { step: number; title: string; desc: string }[];
    features: string[];
    tips: string[];
    faqs: { question: string; answer: string }[];
  };
}

export type SupportedLocale = 'en' | 'bn' | 'ar' | 'hi' | 'ur' | 'es';

export interface TranslationDictionary {
  brandName: string;
  tagline: string;
  searchPlaceholder: string;
  searchAriaLabel: string;
  workspaces: string;
  popularTools: string;
  featuredTools: string;
  allTools: string;
  howItWorks: string;
  usefulContent: string;
  faq: string;
  privacyBadge: string;
  clientSideExecution: string;
  exploreWorkspace: string;
  launchTool: string;
  backToWorkspaces: string;
  clientSidePrivacyNotice: string;
  footerRights: string;
  quickSearch: string;
  filterWorkspaces: string;
  allCategories: string;
  mediaAndDocs: string;
  devEngineering: string;
  financeBusiness: string;
  productivityUtils: string;
  platformStatus: string;
  ready: string;
  popular: string;

  tryAgain: string;
  backToTools: string;
  goHome: string;
  browseWorkspaces: string;
  search: string;
  clear: string;
  reset: string;
  copy: string;
  copied: string;
  download: string;
  upload: string;
  dragDrop: string;
  generate: string;
  convert: string;
  calculate: string;
  process: string;
  share: string;
  preview: string;

  searchPageTitle: string;
  searchPageSubtitle: string;
  searchResultsFor: string;
  noResultsFound: string;
  noResultsHint: string;
  toolsFound: string;
  workspacesFound: string;

  notFoundTitle: string;
  notFoundSubtitle: string;
  notFoundDesc: string;

  toolErrorTitle: string;
  toolErrorDesc: string;
  workspaceErrorTitle: string;
  workspaceErrorDesc: string;
  appErrorTitle: string;
  appErrorDesc: string;

  privacyPolicy: string;
  termsOfService: string;
  cookiePreferences: string;
  disclaimer: string;
  sitemap: string;
  legalNoticeTitle: string;
  informationalNotice: string;
  uaeDisclaimer: string;

  proTipsTitle: string;
  recommendedWorkflowTitle: string;
  relatedToolsTitle: string;
}
