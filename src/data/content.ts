import type { IconName } from '../components/icons';

export interface Pillar {
  icon: IconName;
  title: string;
  text: string;
}

export const pillars: Pillar[] = [
  {
    icon: 'platform',
    title: 'Technology',
    text: 'We build dependable digital platforms that are designed to be used every day, in the conditions where your work actually happens: across offices, field sites, and uneven connectivity.',
  },
  {
    icon: 'insight',
    title: 'Data',
    text: 'We help you collect information you can trust, bring scattered sources together, and turn them into evidence that informs decisions rather than sitting in reports.',
  },
  {
    icon: 'impact',
    title: 'Impact',
    text: 'We measure success by what changes for the people and communities you serve. Every system we build is shaped around the outcomes you need to deliver.',
  },
];

export interface Capability {
  slug: string;
  icon: IconName;
  title: string;
  summary: string;
  detail: string;
  includes: string[];
  outcome: string;
}

export const capabilities: Capability[] = [
  {
    slug: 'software',
    icon: 'code',
    title: 'Custom software development',
    summary:
      'Web and mobile applications built around your workflows, not the other way round.',
    detail:
      'Off-the-shelf tools rarely fit the realities of programs that span regions, partners, and languages. We design and build software that matches how your teams work, and that your organization can own, maintain, and extend.',
    includes: [
      'Web applications and partner portals',
      'Mobile and offline-capable field tools',
      'Integrations with existing systems and APIs',
      'Maintenance, hosting, and technical handover',
    ],
    outcome: 'Tools your teams adopt because they make the work easier.',
  },
  {
    slug: 'data-platforms',
    icon: 'database',
    title: 'Data platforms & information systems',
    summary:
      'The foundations for collecting, managing, and sharing data reliably at scale.',
    detail:
      'Monitoring systems, registries, and management information systems need to be accurate, secure, and resilient. We design data architectures that bring information together from many sources while protecting the people it describes.',
    includes: [
      'Monitoring, evaluation, and learning (MEL) systems',
      'Data collection and survey platforms',
      'Registries and management information systems',
      'Data governance, privacy, and security practices',
    ],
    outcome: 'One trusted source of information instead of scattered spreadsheets.',
  },
  {
    slug: 'analytics',
    icon: 'chart',
    title: 'Data analytics & visualization',
    summary:
      'Clear dashboards and analysis that help decision-makers see what matters.',
    detail:
      'Data only creates value when the right people can understand it at the right moment. We build analysis and visualization that answer real questions, written for program managers, leadership, and the public alike.',
    includes: [
      'Interactive dashboards and reporting tools',
      'Indicator frameworks and automated reporting',
      'Statistical analysis and data quality review',
      'Public-facing data stories and open data portals',
    ],
    outcome: 'Faster, better-informed decisions grounded in evidence.',
  },
  {
    slug: 'gis',
    icon: 'map',
    title: 'Geographic information systems (GIS)',
    summary:
      'Location intelligence that reveals patterns, gaps, and priorities on the ground.',
    detail:
      'Where something happens is often as important as what happens. We combine field data, satellite imagery, and administrative boundaries to help you plan services, target resources, and track change over time.',
    includes: [
      'Web mapping applications',
      'Spatial analysis and service coverage mapping',
      'Remote sensing and earth observation data',
      'Geospatial data management and standards',
    ],
    outcome: 'Resources directed to the places where they are needed most.',
  },
  {
    slug: 'ai',
    icon: 'spark',
    title: 'Artificial intelligence & automation',
    summary:
      'Practical, responsible use of AI to reduce manual effort and surface insight.',
    detail:
      'AI is useful when it solves a defined problem and remains accountable to the people it affects. We help you identify where automation genuinely adds value and implement it with transparency, human oversight, and attention to bias.',
    includes: [
      'Workflow and data-processing automation',
      'Document and text analysis',
      'Predictive models and early-warning tools',
      'Assessment of AI readiness and responsible use',
    ],
    outcome: 'Staff time returned to the work that needs human judgment.',
  },
  {
    slug: 'advisory',
    icon: 'compass',
    title: 'Digital transformation & advisory',
    summary:
      'Independent guidance on strategy, systems, and the capabilities to sustain them.',
    detail:
      'Successful technology depends on people, processes, and planning as much as code. We help organizations assess where they are, decide what to build or buy, and develop the skills to sustain their systems for the long term.',
    includes: [
      'Digital strategy and technology roadmaps',
      'Systems assessment and requirements definition',
      'Vendor and solution selection support',
      'Capacity strengthening and training',
    ],
    outcome: 'Technology investments that hold their value over time.',
  },
];

export interface Sector {
  slug: string;
  icon: IconName;
  title: string;
  summary: string;
  context: string;
  possibilities: string[];
}

export const sectors: Sector[] = [
  {
    slug: 'agriculture',
    icon: 'leaf',
    title: 'Agriculture & food systems',
    summary: 'Supporting farmers, markets, and food security with timely information.',
    context:
      'Food systems depend on decisions made by millions of producers, buyers, and policymakers, often with limited information.',
    possibilities: [
      'Farmer registries and extension service tools',
      'Market, yield, and supply chain information systems',
      'Climate and weather data for agricultural planning',
    ],
  },
  {
    slug: 'wash',
    icon: 'drop',
    title: 'Water, sanitation & hygiene',
    summary: 'Tracking services and infrastructure so they keep working.',
    context:
      'Sustainable water and sanitation services require knowing what infrastructure exists, whether it functions, and who it reaches.',
    possibilities: [
      'Water point and infrastructure monitoring',
      'Service level and functionality dashboards',
      'Planning tools for utilities and local government',
    ],
  },
  {
    slug: 'health',
    icon: 'health',
    title: 'Public health',
    summary: 'Data systems that strengthen health services and surveillance.',
    context:
      'Health systems need reliable, timely data to plan services, respond to outbreaks, and reach underserved populations.',
    possibilities: [
      'Health information and facility reporting systems',
      'Community health worker tools',
      'Surveillance and early-warning dashboards',
    ],
  },
  {
    slug: 'climate',
    icon: 'globe',
    title: 'Climate & environment',
    summary: 'Measuring change and informing adaptation and resilience.',
    context:
      'Responding to climate change requires credible measurement, long-term monitoring, and information that communities can act on.',
    possibilities: [
      'Environmental and land-use monitoring',
      'Climate risk and vulnerability mapping',
      'Emissions and sustainability reporting tools',
    ],
  },
  {
    slug: 'education',
    icon: 'book',
    title: 'Education',
    summary: 'Helping education systems understand access, quality, and learning.',
    context:
      'Improving learning outcomes depends on understanding which schools, learners, and regions need support, and why.',
    possibilities: [
      'Education management information systems',
      'Learning assessment data platforms',
      'School mapping and planning tools',
    ],
  },
  {
    slug: 'governance',
    icon: 'columns',
    title: 'Governance & public services',
    summary: 'Making public services more transparent, efficient, and accountable.',
    context:
      'Citizens and institutions alike benefit when public information is accurate, accessible, and used to improve services.',
    possibilities: [
      'Digital public service platforms',
      'Open data and transparency portals',
      'Performance monitoring for public programs',
    ],
  },
];

export interface Step {
  title: string;
  text: string;
}

export const approach: Step[] = [
  {
    title: 'Understand the challenge',
    text: 'We start by listening: to your team, your partners, and the people your work serves. We map the problem, the context, and what success should look like before proposing anything.',
  },
  {
    title: 'Design the solution',
    text: 'Together we shape a solution that fits your resources, infrastructure, and timeline. We favor proven, open technologies and test ideas early with real users.',
  },
  {
    title: 'Build and collaborate',
    text: 'We build in short, visible iterations, sharing progress openly and adapting as we learn. Your team is involved throughout, not handed a finished product at the end.',
  },
  {
    title: 'Deliver sustainable impact',
    text: 'We plan for what happens after launch: documentation, training, and handover so that your organization can run, own, and grow the solution with confidence.',
  },
];

export const principles = [
  {
    title: 'Partnership over transaction',
    text: 'We work alongside your team as a long-term partner, sharing responsibility for outcomes.',
  },
  {
    title: 'Practical innovation',
    text: 'We choose technology for its fit and durability, not its novelty.',
  },
  {
    title: 'Built to last',
    text: 'Open standards, clear documentation, and local ownership keep solutions running.',
  },
  {
    title: 'Responsible with data',
    text: 'Privacy, security, and the dignity of the people behind the data guide every decision.',
  },
];

export const audiences = [
  'International development organizations',
  'NGOs and nonprofit organizations',
  'Government institutions',
  'Multilateral and development agencies',
  'Research institutions',
  'Social enterprises',
  'Private-sector organizations',
];
