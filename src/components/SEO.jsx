import React from 'react';
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '../config/siteConfig';

export default function SEO({ title, description, url = "", type = "website" }) {
  const siteTitle = siteConfig.clinicName;
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const canonicalUrl = `https://${siteConfig.clinicDomain}${url}`;
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || siteConfig.tagline} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || siteConfig.tagline} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
}
