/**
 * New-project enquiry form: loads src/data/enquiry-form.json, fills options
 * that come from site data, adds "I don't know yet" to every question, and
 * checks the file at build time (a broken file fails the build).
 *
 * Payload sent to the backend (contact.enquiryEndpoint), schema "enquiry/1":
 * {
 *   "schema": "enquiry/1", "formVersion": 1, "submissionId": "<uuid>", "submittedAt": "<ISO 8601>",
 *   "contact": { "email": "...", "name": "...", "organisation": "..." },
 *   "answers": { "<question id>": ["<option id>", ...] },   // "unknown" = I don't know yet
 *   "note": "...", "hp": ""                                  // hp: honeypot, must be empty
 * }
 * Ids are stable: never reuse a retired id. Labels may change freely.
 */
import raw from './enquiry-form.json';
import { sectors } from './content';

export const UNKNOWN = { id: 'unknown', label: "I don't know yet" } as const;

export interface FormOption {
  id: string;
  label: string;
}
export interface FormQuestion {
  id: string;
  label: string;
  type: 'single' | 'multi';
  options: FormOption[];
}

const sources: Record<string, FormOption[]> = {
  sectors: sectors.map((s) => ({ id: s.slug, label: s.title })),
};

const questions: FormQuestion[] = raw.questions.map((q) => {
  const fromSource = 'optionsFrom' in q && q.optionsFrom ? sources[q.optionsFrom as string] : [];
  if ('optionsFrom' in q && q.optionsFrom && !fromSource) throw new Error(`enquiry-form: unknown optionsFrom "${q.optionsFrom}"`);
  return {
    id: q.id,
    label: q.label,
    type: q.type as FormQuestion['type'],
    options: [...(fromSource ?? []), ...q.options, UNKNOWN],
  };
});

// ---- build-time checks ----
const fail = (msg: string) => {
  throw new Error(`enquiry-form.json: ${msg}`);
};
if (questions.length < 8 || questions.length > 10) fail(`expected 8-10 questions, found ${questions.length}`);
const qIds = new Set<string>();
for (const q of questions) {
  if (!/^[a-z][a-z0-9_-]*$/.test(q.id)) fail(`bad question id "${q.id}"`);
  if (qIds.has(q.id)) fail(`duplicate question id "${q.id}"`);
  qIds.add(q.id);
  if (q.type !== 'single' && q.type !== 'multi') fail(`question "${q.id}" has type "${q.type}"`);
  const oIds = new Set<string>();
  for (const o of q.options) {
    if (!/^[a-z0-9][a-z0-9_-]*$/.test(o.id)) fail(`bad option id "${o.id}" in "${q.id}"`);
    if (oIds.has(o.id)) fail(`duplicate option id "${o.id}" in "${q.id}"`);
    oIds.add(o.id);
  }
  if (q.options.length < 3) fail(`question "${q.id}" needs at least two options plus "I don't know yet"`);
}

export const enquiryForm = {
  schema: 'enquiry/1',
  formVersion: raw.formVersion,
  title: raw.title,
  intro: raw.intro,
  questions,
};
