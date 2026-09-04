import React, { useEffect } from 'react';
import { SITE_CONFIG } from '../../config/site';

interface DocumentMetaProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  keywords?: string[];
  type?: 'website' | 'article' | 'application';
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export const DocumentMeta: React.FC<DocumentMetaProps> = ({
  title,
  description,
  canonicalUrl,
  keywords,
  type = 'website',
  structuredData
}) => {
  useEffect(() => {
    // 1. Update Title
    const fullTitle = title
      ? `${title} | ${SITE_CONFIG.name}`
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

    // 3. Meta keywords
    if (keywords && keywords.length > 0) {
      let kwElem = document.querySelector('meta[name="keywords"]');
      if (!kwElem) {
        kwElem = document.createElement('meta');
        kwElem.setAttribute('name', 'keywords');
        document.head.appendChild(kwElem);
      }
      kwElem.setAttribute('content', keywords.join(', '));
    }

    // 4. Canonical Link
    const targetUrl = canonicalUrl || `${SITE_CONFIG.productionUrl}${window.location.pathname}`;
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', targetUrl);

    // 5. OpenGraph Tags
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
    setMetaProperty('og:url', targetUrl);
    setMetaProperty('og:type', type);
    setMetaProperty('og:site_name', SITE_CONFIG.name);

    // 6. Twitter Tags
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

    // 7. Structured Data (JSON-LD)
    const existingLd = document.getElementById('dynamic-json-ld');
    if (existingLd) {
      existingLd.remove();
    }

    if (structuredData) {
      const script = document.createElement('script');
      script.id = 'dynamic-json-ld';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    return () => {
      // Optional cleanup on unmount if needed
    };
  }, [title, description, canonicalUrl, keywords, type, structuredData]);

  return null;
};
