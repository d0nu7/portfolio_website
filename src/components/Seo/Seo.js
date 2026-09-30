import Head from 'next/head';
import React from 'react';

import { SITE_NAME, SITE_URL } from '../../constants/site';
import { useLanguage } from '../../i18n/LanguageContext';
import palette from '../../themes/palette';

/*
 * One place for everything search engines, social previews and AI crawlers
 * read from <head>. Every indexable page renders exactly one <Seo />.
 *
 * `path` is the page path with trailing slash (the static export uses
 * trailingSlash URLs), e.g. '/' or '/de/ki-schulungen/'. Language
 * alternates (hreflang) come from the page's route, see i18n/routes.js.
 * `jsonLd` is an array of schema.org nodes; they are wrapped in one @graph.
 */
const Seo = ({ title, description, path = '/', image = '/og/home.png', imageAlt, locale = 'en_GB', jsonLd }) => {
  const url = `${SITE_URL}${path}`;
  const imageUrl = `${SITE_URL}${image}`;
  const { alternate } = useLanguage();
  const en = alternate('en');
  const de = alternate('de');

  return (
    <Head>
      <title key="title">{title}</title>
      <meta key="description" name="description" content={description} />
      <link key="canonical" rel="canonical" href={url} />
      {en && <link key="alt-en" rel="alternate" hrefLang="en" href={`${SITE_URL}${en}`} />}
      {de && <link key="alt-de" rel="alternate" hrefLang="de" href={`${SITE_URL}${de}`} />}
      {en && <link key="alt-default" rel="alternate" hrefLang="x-default" href={`${SITE_URL}${en}`} />}
      <meta key="robots" name="robots" content="index, follow, max-image-preview:large" />
      <meta key="theme-color" name="theme-color" content={palette.colors.bg} />

      <meta key="og-type" property="og:type" content="website" />
      <meta key="og-site-name" property="og:site_name" content={SITE_NAME} />
      <meta key="og-locale" property="og:locale" content={locale} />
      {en && de && (
        <meta key="og-locale-alt" property="og:locale:alternate" content={locale === 'de_AT' ? 'en_GB' : 'de_AT'} />
      )}
      <meta key="og-title" property="og:title" content={title} />
      <meta key="og-description" property="og:description" content={description} />
      <meta key="og-url" property="og:url" content={url} />
      <meta key="og-image" property="og:image" content={imageUrl} />
      <meta key="og-image-width" property="og:image:width" content="1200" />
      <meta key="og-image-height" property="og:image:height" content="630" />
      {imageAlt && <meta key="og-image-alt" property="og:image:alt" content={imageAlt} />}

      <meta key="twitter-card" name="twitter:card" content="summary_large_image" />
      <meta key="twitter-title" name="twitter:title" content={title} />
      <meta key="twitter-description" name="twitter:description" content={description} />
      <meta key="twitter-image" name="twitter:image" content={imageUrl} />

      {jsonLd && (
        <script
          key="json-ld"
          type="application/ld+json"
          // JSON.stringify output is safe here except for "</script>", which
          // none of our strings contain; escape "<" anyway to be sure.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': jsonLd }).replace(/</g, '\\u003c'),
          }}
        />
      )}
    </Head>
  );
};

export default Seo;
