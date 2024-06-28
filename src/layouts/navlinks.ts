import { PageRoutes } from '../lib/constants';

interface NavLink {
  id: number;
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  {
    id: 1,
    label: 'The People Practice',
    href: PageRoutes.about,
  },
  {
    id: 2,
    label: 'Resources',
    href: PageRoutes.resources,
  },
  {
    id: 3,
    label: 'Pricing',
    href: PageRoutes.pricing,
  },
  {
    id: 4,
    label: 'Contact',
    href: PageRoutes.contact,
  },
  {
    id: 5,
    label: 'FAQ',
    href: PageRoutes.faq,
  },
];
