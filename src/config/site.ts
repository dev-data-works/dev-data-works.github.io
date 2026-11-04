/**
 * Organization details used across the site.
 * Values marked PLACEHOLDER must be replaced with verified details before launch.
 */
export const site = {
  name: 'DevDataWorks',
  tagline: 'Technology for a better world',
  description:
    'DevDataWorks builds data-driven technology solutions that help organizations address complex challenges, make informed decisions, and deliver measurable impact across sectors and communities.',
  // PLACEHOLDER: replace with the organization's verified contact address.
  email: 'hello@devdataworks.org',
  // Office location; left empty it is hidden. Add once confirmed, e.g. 'Amsterdam, the Netherlands'.
  location: '',
  github: 'https://github.com/dev-data-works',
};

export const nav = [
  { label: 'About', href: '/about' },
  { label: 'Expertise', href: '/expertise' },
  { label: 'Sectors', href: '/sectors' },
  { label: 'Approach', href: '/#approach' },
];

/** Prefix an internal path with the configured base path. */
export function url(path: string = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (path === '/') return `${base}/`;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
