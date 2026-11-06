// A single, consistent icon set: 24px grid, 1.6 stroke, round caps and joins.
// Each entry is the inner SVG markup.
export const icons = {
  platform:
    '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/><path d="M7 12V9.5M10.5 12V8M14 12v-2"/>',
  insight:
    '<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5v8.5l6 6"/><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"/>',
  impact:
    '<path d="M4 19c4-1 7-4 8-9"/><path d="M12 10c.5-3.5 3-6 8-6-0.2 5-2.6 7.6-6.2 8.2"/><path d="M4 19c0-4 2-7 5.5-8"/>',
  code: '<path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/>',
  database:
    '<ellipse cx="12" cy="6" rx="7.5" ry="2.8"/><path d="M4.5 6v6c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8V6"/><path d="M4.5 12v6c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8v-6"/>',
  chart:
    '<path d="M4 4v16h16"/><path d="M8 16v-4M12 16V9M16 16V6"/>',
  map: '<path d="M9 4 3.5 6v14L9 18l6 2 5.5-2V4L15 6 9 4Z"/><path d="M9 4v14M15 6v14"/>',
  spark:
    '<path d="M12 3v3M12 18v3M3 12h3M18 12h3"/><path d="m6.5 6.5 1.8 1.8M15.7 15.7l1.8 1.8M6.5 17.5l1.8-1.8M15.7 8.3l1.8-1.8"/><circle cx="12" cy="12" r="2.6"/>',
  compass:
    '<circle cx="12" cy="12" r="8.5"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z"/>',
  leaf: '<path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14"/><path d="M5 19c3-4 6-6.5 9.5-8.5"/>',
  drop: '<path d="M12 3.5s6 6.4 6 10.5a6 6 0 0 1-12 0c0-4.1 6-10.5 6-10.5Z"/><path d="M9 14.5a3 3 0 0 0 3 3"/>',
  health:
    '<path d="M12 20s-7.5-4.4-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.6-7.5 10-7.5 10Z"/><path d="M7.5 12.5h2.2l1.3-2 2 4 1.3-2h2.2"/>',
  globe:
    '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.4 2.4 3.5 5.3 3.5 8.5s-1.1 6.1-3.5 8.5c-2.4-2.4-3.5-5.3-3.5-8.5s1.1-6.1 3.5-8.5Z"/>',
  book: '<path d="M12 6.5C10 5 7.5 4.5 4 4.5v13c3.5 0 6 .5 8 2 2-1.5 4.5-2 8-2v-13c-3.5 0-6 .5-8 2Z"/><path d="M12 6.5v13"/>',
  columns:
    '<path d="M3.5 9 12 4l8.5 5"/><path d="M5 9h14M6.5 9v8M10 9v8M14 9v8M17.5 9v8M4 20h16M5 17h14"/>',
  horizon:
    '<path d="M3 17c3-4 6-6 9-6s6 2 9 6"/><path d="M12 3v4M5.6 6.6l1.4 1.4M18.4 6.6 17 8"/><path d="M3 20h18"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
  pin: '<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z"/><circle cx="12" cy="10" r="2.3"/>',
  github:
    '<path d="M9 19c-4 1.3-4-2-5.6-2.5M14.6 21v-3.4c0-1 .1-1.4-.5-2 2.7-.3 5.4-1.3 5.4-5.9a4.6 4.6 0 0 0-1.2-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.3 1.2a11.3 11.3 0 0 0-6 0C6.6 3 5.6 3.3 5.6 3.3a4.3 4.3 0 0 0-.1 3.2 4.6 4.6 0 0 0-1.2 3.2c0 4.6 2.7 5.6 5.4 5.9-.6.6-.6 1.2-.5 2V21"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  chat: '<path d="M4 18.5V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H8l-4 2.5Z"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
} as const;

export type IconName = keyof typeof icons;
