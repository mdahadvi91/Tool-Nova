import React, { useEffect } from 'react';
import { SITE_CONFIG } from '../../config/site';

export interface DocumentMetaProps {
  title?: string;
  description?: string;
  canonical?: string;
  canonicalUrl?: string;
  keywords?: string[] | string;
  noIndex?: boolean;
  noindex?: boolean;
  type?: 'website' | 'article' | 'application';
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export const DocumentMeta: React.FC<DocumentMetaProps> = ({
  title,
  description,
  canonical,
  canonicalUrl,
  keywords,
  noIndex,
  noindex,
  type = 'website',
  schema,
  structuredData
}) => {
  useEffect(() => {
    // 1. Title
    const fullTitle = title
      ? (title.includes(SITE_CONFIG.name) ? title : `${title} | ${SITE_CONFIG.name}`)
      : `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`;
    document.title = fullTitle;

    // 2. Meta description
    const metaDesc = description || SITE_CONFIG.description;
    let descElem = document.querySelector('meta[name="description"]');
    if (!descElem) {
      descElem = document.createElement('meta');
      descElem.setAttribute('name', 'description');
      document.head.appendChild(descElem);
    }
    descElem.setAttribute('content', metaDesc);

    // 3. Robots (noIndex)
    const isNoIndex = noIndex || noindex;
    let robotsElem = document.querySelector('meta[name="robots"]');
    if (!robotsElem) {
      robotsElem = document.createElement('meta');
      robotsElem.setAttribute('name', 'robots');
      document.head.appendChild(robotsElem);
    }
    robotsElem.setAttribute('content', isNoIndex ? 'noindex, follow' : 'index, follow');

    // 4. Meta keywords
    if (keywords) {
      const kwString = Array.isArray(keywords) ? keywords.join(', ') : keywords;
      let kwElem = document.querySelector('meta[name="keywords"]');
      if (!kwElem) {
        kwElem = document.createElement('meta');
        kwElem.setAttribute('name', 'keywords');
        document.head.appendChild(kwElem);
      }
      kwElem.setAttribute('content', kwString);
    }

    // 5. Canonical Link
    const targetCanonical = canonical || canonicalUrl || `${SITE_CONFIG.productionUrl}${window.location.pathname}`;
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', targetCanonical);

    // 6. OpenGraph Tags
    const setMetaProperty = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMetaProperty('og:title', fullTitle);
    setMetaProperty('og:description', metaDesc);
    setMetaProperty('og:url', targetCanonical);
    setMetaProperty('og:type', type);
    setMetaProperty('og:site_name', SITE_CONFIG.name);

    // 7. Twitter Tags
    const setMetaName = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMetaName('twitter:card', 'summary_large_image');
    setMetaName('twitter:title', fullTitle);
    setMetaName('twitter:description', metaDesc);

    // 8. Structured Data (JSON-LD)
    const jsonLdData = schema || structuredData;
    const existingLd = document.getElementById('dynamic-json-ld');
    if (existingLd) {
      existingLd.remove();
    }

    if (jsonLdData) {
      const script = document.createElement('script');
      script.id = 'dynamic-json-ld';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(jsonLdData);
      document.head.appendChild(script);
    }

    return () => {
      // Clean up script on unmount
      const currentScript = document.getElementById('dynamic-json-ld');
      if (currentScript) {
        currentScript.remove();
      }
    };
  }, [title, description, canonical, canonicalUrl, keywords, noIndex, noindex, type, schema, structuredData]);

  return null;
};
