import { SelectorOptionValue } from './types';

export const PageRoutes = {
  home: '/',
  about: 'about',
  faq: 'faq',
  pricing: 'pricing',
  contact: 'contact',
  bookDemo: 'book-demo',
  resources: 'resources',
  article: 'article/:id',
  book: 'book/:id',
  templates: 'templates',
  template: ':id',
  programs: 'programs/:id',
  joinWaitlist: 'waitlist',
  WaitlistSuccess: 'success',
  notFound: '*',
};

export const employeeCount: SelectorOptionValue[] = [
  { label: '1-20', value: '1-20' },
  { label: '21-50', value: '21-50' },
  { label: '51-100', value: '51-100' },
  { label: '100-200', value: '100-200' },
  { label: 'Above 200', value: 'Above 200' },
];

export const contactUsReasons: SelectorOptionValue[] = [
  { label: 'Culture', value: 'Culture' },
  { label: 'HR Resource', value: 'HR Resource' },
  { label: 'Trainings', value: 'Trainings' },
  { label: 'Courses', value: 'Courses' },
];
