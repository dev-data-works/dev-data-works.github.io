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
  title: string;
  summary: string;
  problem: string;
  /** Kept short and common across the sector (see the content rule in README). */
  features: string[];
  stack: string[];
  /** Diagram caption and the flow it shows, step by step (also the diagram's text alternative). */
  caption: string;
  flow: string[];
}

export const patterns: Pattern[] = [
  {
    slug: 'messaging',
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
    caption: 'How a question and a broadcast move through a messaging advisory service.',
    flow: [
      "People send a question on a messaging app.",
      "The message service receives it, and staff reply from the staff app.",
      "Broadcasts go through a task queue that retries failed messages.",
      "Every message's delivery status is stored in the database.",
    ],
  },
  {
    slug: 'monitoring',
    title: 'Monitoring information systems, from forms to decisions',
    summary: 'From working out what to measure to the dashboards that inform decisions.',
    problem:
      'Programme data is collected on paper and in spreadsheets, against indicators nobody agreed up front. It arrives late, cannot be checked, and rarely reaches the people who decide.',
    features: [
      'We start with the needs: what to measure, which forms to use, and who reviews and approves the data.',
      'One platform for building forms, collecting data on mobile even offline, and approval workflows from simple to multi-level.',
      'Dashboards built in the platform, generated with AI help or embedded from BI tools, plus AI recommendations and an open API for analysis and GIS.',
      'Reports exported as PDF and Excel for further analysis, and a team that helps clean and prepare the data.',
    ],
    caption: 'How a monitoring system works, from form design to decisions.',
    flow: [
      "The programme team agrees what to measure and builds the forms and approval rules in the form builder.",
      "Forms reach field staff on a mobile app that works offline; submissions sync when a connection returns.",
      "Reviewers approve submissions through simple or multi-level approval steps.",
      "Approved data feeds dashboards, PDF and Excel reports, and AI insights for managers.",
      "An open API serves the same data to analysis, GIS and BI tools.",
    ],
    stack: ['Django', 'React', 'React Native', 'PostgreSQL', 'Docker'],
  },
  {
    slug: 'catalogue',
    title: 'Federated data platforms and map services',
    summary: 'One place to find, map and analyse data held by many partners, with access each partner controls.',
    problem:
      'Datasets sit with different partners, countries and agencies, in different formats and systems. No one can see what exists or whether it is current, and sharing stalls because partners cannot control who sees what.',
    features: [
      'A catalogue built on CKAN with spatial search and an API, harvesting records from partner catalogues and standard metadata services so they stay current.',
      'Map services to view, query and download vector and raster data, analysis of a selected area in the browser, and custom maps that users compose from the layers they may access.',
      'Single sign-on across the platform, with roles scoped by organisation or country, delegated administration and an audit trail of every access change.',
      'Permissions enforced on the API and on the map services themselves, so direct requests and shared maps never expose restricted layers.',
    ],
    caption: 'How a federated data platform connects partner data, maps and access rules.',
    flow: [
      'A harvester keeps records from partner catalogues current in the CKAN catalogue.',
      'Geospatial data is stored in PostGIS and published by GeoServer as standard map services.',
      'Users sign in once; their role and their organisation or country decide what they can see and manage.',
      'In the web map they search the catalogue, compose custom maps and analyse selected areas, using only layers they may access.',
      'The catalogue API and map services check the same permissions on every request, including requests from other systems.',
    ],
    stack: ['CKAN', 'GeoServer', 'PostGIS', 'OpenLayers', 'Keycloak', 'OGC services (WMS, WFS, WCS)', 'Python'],
  },
  {
    slug: 'assistants',
    title: 'Knowledge assistants grounded in your own documents',
    summary: 'Answers from your own documents, with sources, wherever people already ask.',
    problem:
      'Staff and communities lose time searching manuals, guidelines and reports. General chatbots give confident answers that are not based on your material, and sending programme data to a public chatbot is often not an option.',
    features: [
      'Knowledge bases you manage yourself: add documents through an ingestion pipeline, keep them current, and let the assistant pick the right knowledge base for each question.',
      'Answers with their sources, delivered in a chat widget on any website, inside your own apps, over messaging apps, or through an API.',
      'Can run fully on your own servers with a choice of language models, local or hosted, so sensitive data stays with you.',
      'Answer quality measured with standard evaluation metrics, and prompts versioned centrally so the assistant improves over time.',
    ],
    caption: 'How a knowledge assistant answers a question from your own documents.',
    flow: [
      'Documents go through an ingestion pipeline into knowledge bases you manage.',
      'People ask a question in a chat widget, an app or a messaging app.',
      'The assistant picks the right knowledge base and retrieves the relevant passages.',
      'A language model, local or hosted, answers from those passages only, and the answer goes back with its sources.',
      'Answers are evaluated and prompts versioned, so quality can be measured and improved.',
    ],
    stack: ['Python', 'Vector search', 'Language models (local or hosted)', 'Model Context Protocol', 'Task queues', 'Embeddable widget'],
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
      'Dashboards, and reports exported as PDF and Excel',
      'Indicator frameworks',
      'Data cleaning and quality checks',
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
    patterns: ['assistants', 'monitoring'],
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
    application: 'Advisory messaging and knowledge assistants for producers, farmer registries and field monitoring.',
    patterns: ['messaging', 'assistants', 'monitoring'],
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
  /** File name in src/assets/platforms/ (without .svg). Missing = name shown as text. */
  logo?: string;
  /** True when the logo already contains the name (the name is then kept for screen readers only). */
  wordmark?: boolean;
}

export const platforms: Platform[] = [
  { name: 'CKAN', url: 'https://ckan.org', logo: 'ckan', wordmark: true },
  { name: 'DHIS2', url: 'https://dhis2.org', logo: 'dhis2', wordmark: true },
  { name: 'GeoNode', url: 'https://geonode.org', logo: 'geonode' },
];

export const platformsLabel = 'Open platforms we build on and integrate with';
export const platformsNote = 'Listed as technologies we work with. No partnership or endorsement implied.';

export const stack = {
  engineering: ['Python', 'Django', 'FastAPI', 'TypeScript', 'React', 'React Native', 'Node.js', 'Go', 'Java', 'Spring Boot', 'PHP', 'Laravel'],
  dataAndGis: ['PostgreSQL', 'PostGIS', 'MongoDB', 'Elasticsearch', 'Redis', 'Kafka', 'RabbitMQ', 'pandas', 'GeoServer', 'OpenLayers', 'Vector search'],
  infrastructure: ['Docker', 'Kubernetes', 'Terraform', 'Ansible', 'Keycloak', 'Google Cloud', 'AWS', 'Firebase', 'Nginx', 'GitHub Actions'],
  quality: ['OpenAPI (Swagger)', 'Automated testing (pytest, Jest, Selenium)', 'Code coverage reporting', 'Continuous integration'],
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

/** How personal and programme data is handled in every project (practices, not certifications). */
export const dataProtection: Step[] = [
  {
    title: 'Privacy by design',
    text: 'We follow GDPR principles: collect only what the project needs, for a stated purpose, with consent where it is required.',
  },
  {
    title: 'Data processing agreements',
    text: 'Before we handle personal data, we sign a data processing agreement, ours or your template.',
  },
  {
    title: 'Retention and deletion',
    text: 'Each dataset has an agreed retention period. At the end of a project, data is handed back or deleted.',
  },
  {
    title: 'Access control',
    text: 'Role-based access with least privilege and multi-factor sign-in for administrators. Access is reviewed and removed at handover.',
  },
  {
    title: 'Security in operation',
    text: 'Encryption in transit and at rest, tested backups, dependencies kept up to date, and no secrets in code.',
  },
  {
    title: 'Incident response',
    text: 'Every project has a written response plan. If a breach affects your data, we tell you within 72 hours of confirming it.',
  },
  {
    title: 'Acceptable use',
    text: 'Team devices are encrypted and kept updated, and client data stays on systems approved for the project.',
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
