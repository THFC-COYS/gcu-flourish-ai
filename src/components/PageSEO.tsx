import { Helmet } from 'react-helmet-async';

const SITE = 'https://lmsbreaker.com';
const SITE_NAME = 'MoltALP';

interface PageSEOProps {
  title: string;
  description: string;
  canonical?: string;
  noIndex?: boolean;
}

export default function PageSEO({ title, description, canonical, noIndex }: PageSEOProps) {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const canonicalUrl = canonical ? `${SITE}${canonical}` : undefined;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
