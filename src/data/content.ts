import type { IconName } from '../components/icons';

/*
 * Site copy. Anonymisation rule (see README): no client, employer, product or
 * project names; no region below continent; at most three features per pattern,
 * each common across the sector; no combination of features that points to one
 * project.
 */

export type PatternSlug = 'messaging' | 'monitoring' | 'catalogue' | 'assistants';

export interface Pattern {
  slug: PatternSlug;
  index: string;
  title: string;
  summary: string;
  problem: string;
  features: [string, string, string];
  stack: string[];
}

export const patterns: Pattern[] = [
  {
    slug: 'messaging',
    index: '01',
    title: 'Messaging-based advisory services',
    summary: 'Reach people on the messaging apps they already use.',
    problem:
      'Advice and alerts reach farmers, health workers or community members late, or not at all, when they depend on visits, radio or apps that people do not install.',
    features: [
      'Two-way conversations on common messaging apps, with questions routed to staff.',
      'Broadcasts to groups selected by location or profile.',
      'Delivery status recorded for every message, with automatic retries.',
    ],
    stack: ['Python', 'PostgreSQL', 'Redis', 'React Native', 'Messaging APIs'],
  },
  {
    slug: 'monitoring',
    index: '02',
    title: 'Monitoring systems with offline data collection',
    summary: 'Collect data in the field and see it in dashboards the same week.',
    problem:
      'Programme data sits in paper forms and spreadsheets. It arrives late, and it cannot be checked or compared across districts.',
    features: [
      'Mobile forms that work offline and sync when a connection returns.',
      'Review and approval steps that follow the administrative hierarchy.',
      'Dashboards built from the collected data and shared with the right people.',
    ],
    stack: ['Django', 'React', 'React Native', 'PostgreSQL', 'Docker'],
  },
  {
    slug: 'catalogue',
    index: '03',
    title: 'Data catalogues and map services',
    summary: 'Find, share and map data held by many partners.',
    problem:
      'Datasets are spread across partner organisations in different formats. No one can see what exists, where it is, or whether it is current.',
    features: [
      'A searchable catalogue with metadata and an API, built on CKAN.',
      'Map services to view, query and download geospatial data.',
      'Harvesting that keeps records from partner catalogues up to date.',
    ],
    stack: ['CKAN', 'GeoServer', 'PostGIS', 'OpenLayers', 'Python'],
  },
  {
    slug: 'assistants',
    index: '04',
    title: 'Document-grounded assistants',
    summary: 'Answers from your own documents, with sources.',
    problem:
      'Staff lose time searching manuals, guidelines and reports. General chatbots give confident answers that are not based on your material.',
    features: [
      'Answers drawn only from documents you choose, with the source shown.',
      'Document sets updated without retraining a model.',
      'People stay responsible for decisions. The assistant explains; it does not decide.',
    ],
    stack: ['Python', 'Vector search', 'Language model APIs', 'PostgreSQL'],
  },
];

export interface Pillar {
  title: string;
  text: string;
}

export const pillars: Pillar[] = [
  {
    title: 'Collect',
    text: 'Mobile forms that work without a connection and sync when one returns, with checks at the point of entry so errors are caught early.',
  },
  {
    title: 'Connect',
    text: 'Platforms and catalogues that bring together data from field teams, partners and existing systems, with clear ownership and access rules.',
  },
  {
    title: 'Use',
    text: 'Dashboards, maps, messaging and assistants that put the right information in front of programme staff, partners and communities.',
  },
];

export interface Capability {
  slug: string;
  icon: IconName;
  title: string;
  summary: string;
  includes: string[];
  outcome: string;
  patterns: PatternSlug[];
}

export const capabilities: Capability[] = [
  {
    slug: 'software',
    icon: 'code',
    title: 'Custom software development',
    summary: 'Web and mobile applications built around how your teams work, including offline field tools.',
    includes: [
      'Web applications and partner portals',
      'Offline-capable mobile apps',
      'Integrations with existing systems and APIs',
      'Documentation, training and handover',
    ],
    outcome: 'Software your team can run and change after we leave.',
    patterns: ['messaging', 'monitoring'],
  },
  {
    slug: 'data-platforms',
    icon: 'database',
    title: 'Data platforms and information systems',
    summary: 'The foundations for collecting, managing and sharing programme data.',
    includes: [
      'Monitoring information systems',
      'Data catalogues and APIs on CKAN',
      'Integration with DHIS2 and other national systems',
      'Access control and data protection',
    ],
    outcome: 'One trusted place for programme data.',
    patterns: ['monitoring', 'catalogue'],
  },
  {
    slug: 'analytics',
    icon: 'chart',
    title: 'Data analysis and visualisation',
    summary: 'Dashboards and analysis that answer the questions programme managers ask.',
    includes: [
      'Dashboards and reporting',
      'Indicator frameworks',
      'Data quality checks',
      'Data stories for public audiences',
    ],
    outcome: 'Decisions based on current data.',
    patterns: ['monitoring'],
  },
  {
    slug: 'gis',
    icon: 'map',
    title: 'Maps and geospatial data (GIS)',
    summary: 'Maps that show where services reach and where they do not.',
    includes: [
      'Web maps',
      'Spatial analysis and coverage mapping',
      'Map services with GeoServer and GeoNode',
      'Geospatial data management',
    ],
    outcome: 'Resources directed to where they are needed.',
    patterns: ['catalogue'],
  },
  {
    slug: 'ai',
    icon: 'spark',
    title: 'AI and automation',
    summary: 'AI used where it solves a defined problem, with people kept in charge.',
    includes: [
      'Document-grounded assistants',
      'Workflow automation',
      'Text and document processing',
      'Readiness and responsible-use review',
    ],
    outcome: 'Staff time returned to work that needs judgement.',
    patterns: ['assistants'],
  },
  {
    slug: 'advisory',
    icon: 'compass',
    title: 'Digital strategy and advisory',
    summary: 'Independent advice on systems, architecture and the skills to sustain them.',
    includes: [
      'Systems assessment and requirements',
      'Architecture and technology choices',
      'Build-or-buy and vendor selection',
      'Roadmaps and capacity strengthening',
    ],
    outcome: 'Technology choices that hold their value.',
    patterns: [],
  },
];

export const advisoryNote =
  "Offered as advisory work, drawing on the team's experience across programmes and technology.";

export interface Sector {
  slug: string;
  icon: IconName;
  title: string;
  application: string;
  patterns: PatternSlug[];
}

export const sectors: Sector[] = [
  {
    slug: 'agriculture',
    icon: 'leaf',
    title: 'Agriculture and food systems',
    application: 'Advisory messaging for producers, farmer registries and field monitoring.',
    patterns: ['messaging', 'monitoring'],
  },
  {
    slug: 'wash',
    icon: 'drop',
    title: 'Water, sanitation and hygiene',
    application: 'Water point and service monitoring, with maps of coverage.',
    patterns: ['monitoring', 'catalogue'],
  },
  {
    slug: 'health',
    icon: 'health',
    title: 'Public health',
    application: 'Facility and community reporting, DHIS2 integration, and guidance assistants for health staff.',
    patterns: ['monitoring', 'assistants'],
  },
  {
    slug: 'climate',
    icon: 'globe',
    title: 'Climate and environment',
    application: 'Shared catalogues of environmental data, and risk and land-use maps.',
    patterns: ['catalogue'],
  },
  {
    slug: 'education',
    icon: 'book',
    title: 'Education',
    application: 'School data collection, management information and planning maps.',
    patterns: ['monitoring', 'catalogue'],
  },
  {
    slug: 'governance',
    icon: 'columns',
    title: 'Governance and public services',
    application: 'Open data portals and monitoring of public programmes.',
    patterns: ['catalogue', 'monitoring'],
  },
];

/** Open platforms the team has worked with hands-on (owner-confirmed list). */
export interface Platform {
  name: string;
  url: string;
  /** File name in src/assets/platforms/ (without .svg). Missing = text wordmark. */
  logo?: string;
}

export const platforms: Platform[] = [
  { name: 'CKAN', url: 'https://ckan.org' },
  { name: 'DHIS2', url: 'https://dhis2.org' },
  { name: 'GeoNode', url: 'https://geonode.org' },
];

export const platformsLabel = 'Open platforms we build on and integrate with';
export const platformsNote = 'Listed as technologies we work with. No partnership or endorsement implied.';

export const stack = {
  engineering: ['Python', 'Django', 'FastAPI', 'TypeScript', 'React', 'React Native'],
  dataAndGis: ['PostgreSQL', 'PostGIS', 'Redis', 'GeoServer', 'OpenLayers', 'Vector search'],
  infrastructure: ['Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Google Cloud', 'AWS', 'Nginx'],
};

export interface Step {
  title: string;
  text: string;
}

export const approach: Step[] = [
  {
    title: 'Understand the work',
    text: 'We talk to the people who will use the system, map how data moves today, and agree what success looks like before proposing anything.',
  },
  {
    title: 'Design for the context',
    text: 'We choose open, proven platforms that fit your connectivity, budget and skills, and test early versions with real users.',
  },
  {
    title: 'Build in the open',
    text: 'Short iterations, with working software shared at each step and your team involved throughout.',
  },
  {
    title: 'Hand over',
    text: 'Documentation, training and a planned handover, so your organisation can run, own and change the system.',
  },
];

export const principles: Step[] = [
  {
    title: 'Open by default',
    text: 'We build on open platforms and standards, so you are not tied to us or to one vendor.',
  },
  {
    title: 'Built for the field',
    text: 'Low bandwidth, shared devices and unreliable power are design inputs, not edge cases.',
  },
  {
    title: 'Responsible with data',
    text: 'The privacy and safety of the people behind the data guide every design decision.',
  },
  {
    title: 'Ownership stays with you',
    text: 'Code, data and documentation belong to your organisation.',
  },
];

/** Capabilities and sectors that list a pattern (links are stored once, on them). */
export function appliesTo(slug: PatternSlug) {
  return {
    capabilities: capabilities.filter((c) => c.patterns.includes(slug)),
    sectors: sectors.filter((s) => s.patterns.includes(slug)),
  };
}

export const patternBySlug = (slug: PatternSlug) => patterns.find((p) => p.slug === slug)!;
