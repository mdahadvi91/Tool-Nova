export interface SiteConfig {
  name: string;
  brand: string;
  tagline: string;
  description: string;
  domain: string;
  productionUrl: string;
  url: string;
  author: string;
  getCanonicalUrl: (path?: string) => string;
}

export const SITE_CONFIG: SiteConfig = {
  name: 'ToolNova',
  brand: 'ToolNova',
  tagline: 'All Your Tools. One Powerful Platform.',
  description:
    'High-performance, privacy-first online utility platform featuring 35 dedicated workspaces for PDF, QR & Barcode, Image Editing, Business Cards, Converters, Calculators, Developer and Security utilities.',
  domain: 'https://toolnova-pied.vercel.app',
  productionUrl: 'https://toolnova-pied.vercel.app',
  url: 'https://toolnova-pied.vercel.app',
  author: 'ToolNova Engineering',
  getCanonicalUrl(path = '') {
    if (!path || path === '/') return this.productionUrl;
    return `${this.productionUrl}${path.startsWith('/') ? path : `/${path}`}`;
  }
};

export function getToolCanonicalUrl(tool: { route?: string; slug?: string; id?: string }): string {
  const path = tool.route || `/tool/${tool.slug || tool.id}`;
  return `${SITE_CONFIG.domain}${path.startsWith('/') ? path : `/${path}`}`;
}

export function getWorkspaceCanonicalUrl(workspace: { slug?: string; id?: string }): string {
  const slug = workspace.slug || workspace.id;
  return `${SITE_CONFIG.domain}/workspace/${slug}`;
}
