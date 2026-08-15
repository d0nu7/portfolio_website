import Head from 'next/head';
import React from 'react';

import CloserGame from '../components/Closer/CloserGame';

/*
 * CLOSER is deliberately unlisted: it is not in the nav, not in the footer, not
 * on the front page and not in sitemap.xml. noindex/nofollow keeps it out of
 * search results too, so the URL is the only way in.
 */
const Closer = () => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, viewport-fit=cover"
      />
      <meta name="robots" content="noindex, nofollow" />
      <meta name="googlebot" content="noindex, nofollow" />
      <meta name="theme-color" content="#08090c" />
      <title>CLOSER</title>
      <meta
        key="description"
        name="description"
        content="Two people. One phone. No small talk."
      />
      {/* Installable as a home-screen PWA -- scoped tightly to /closer/ so it
          never claims the rest of the site (see manifest `scope`/`id`). */}
      <link rel="manifest" href="/closer.webmanifest" />
      <link rel="apple-touch-icon" href="/images/closer/apple-touch-icon-180.png" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content="CLOSER" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    </Head>
    <CloserGame />
  </>
);

export default Closer;
