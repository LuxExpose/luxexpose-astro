export interface City {
  name: string;
  slug: string;
  description: string;
  path: string;
}

export const cities: City[] = [
  {
    name: 'Boston',
    slug: 'boston',
    description: 'Discover luxury in Historic New England',
    path: '/boston',
  },
  {
    name: 'Miami',
    slug: 'miami',
    description: 'Experience luxury in the Magic City',
    path: '/miami',
  },
  {
    name: 'New York',
    slug: 'nyc',
    description: 'Experience luxury in the Big Apple',
    path: '/nyc',
  },
  {
    name: 'Doha',
    slug: 'doha',
    description: 'Where tradition meets infinite ambition',
    path: '/doha',
  },
];
