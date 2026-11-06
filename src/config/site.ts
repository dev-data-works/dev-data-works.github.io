/**
 * Organization details used across the site.
 *
 * Rule: an empty string (or a missing optional field) means "not known yet"
 * and the site hides it. Fill values in when they are confirmed; no page or
 * component changes are needed.
 */
export const site = {
  name: 'DevDataWorks',
  tagline: 'Data and software systems for development work',
  description:
    'DevDataWorks designs and builds field data collection, data platforms, monitoring systems, maps and document-grounded assistants for development organisations, NGOs and public institutions.',
};

/** Legal and location facts. All hidden while empty. */
export const org = {
  legalName: '',
  jurisdiction: '',
  registration: '',
  location: '',
};

export const contact = {
  email: 'hello@devdataworks.org',
  /**
   * While true, the deploy job fails (scripts/check-content.mjs --deploy) and
   * JSON-LD omits contactPoint. Set to false once the mailbox is live and tested.
   */
  emailIsPlaceholder: true,
  /** International format, e.g. '+62 812 0000 0000'. Hidden while empty. Business number only. */
  whatsapp: '',
  replyTime: 'two working days',
};

export type IntentId = 'proposal' | 'references' | 'project';

export const intents: { id: IntentId; label: string; subject: string }[] = [
  { id: 'proposal', label: 'Follow up on a proposal', subject: 'Proposal follow-up' },
  { id: 'references', label: 'Request CVs and references', subject: 'Request: CVs and references' },
  { id: 'project', label: 'Discuss a new project', subject: 'New project enquiry' },
];

/** External profiles. Hidden while empty. */
export const links = {
  github: '',
};

export interface TeamMember {
  role: string;
  /** Years of experience; hidden when missing. */
  years?: number;
  summary: string;
  /** Not shown until the team can be named publicly. */
  name?: string;
}

export const team: TeamMember[] = [
  {
    role: 'Executive lead',
    years: 20,
    summary:
      'Development programmes across many sectors, with earlier enterprise technology experience at a global IT company. Leads strategy and delivery.',
  },
  {
    role: 'Technical lead',
    years: 15,
    summary:
      'Software and data systems for international development. Designs the architecture of every system we build and leads the engineering team.',
  },
  {
    role: 'Partnerships lead',
    years: 20,
    summary:
      "Builds and maintains partnerships with donors, NGOs and governments around the world. Holds a master's degree in Media Studies and Broadcast Journalism, and follows how events and public debate shape development work.",
  },
];

export const nav = [
  { label: 'Work', href: '/work' },
  { label: 'Expertise', href: '/expertise' },
  { label: 'Sectors', href: '/sectors' },
  { label: 'About', href: '/about' },
];

/** True for a non-empty string, a number above zero, or a non-empty array. */
export function has(value: unknown): boolean {
  if (typeof value === 'string') return value.trim().length > 0;
  if (typeof value === 'number') return value > 0;
  if (Array.isArray(value)) return value.length > 0;
  return false;
}

/** mailto: link to the contact address, with the intent's subject when given. */
export function mailto(intent?: IntentId): string {
  const subject = intent ? intents.find((i) => i.id === intent)?.subject : undefined;
  return `mailto:${contact.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;
}

/** Prefix an internal path with the configured base path. */
export function url(path: string = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (path === '/') return `${base}/`;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
