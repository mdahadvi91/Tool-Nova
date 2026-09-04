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
  relatedToolIds: string[];
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
  workspaces: string;
  popularTools: string;
  featuredTools: string;
  allTools: string;
  howItWorks: string;
  usefulContent: string;
  faq: string;
  privacyBadge: string;
  exploreWorkspace: string;
  launchTool: string;
  backToWorkspaces: string;
  clientSidePrivacyNotice: string;
  footerRights: string;
}
