// Nav type
export type navLinkType = {
  label: string;
  url: string;
};

// Nav
const navLinks = [
  {
    label: 'Services',
    url: '#services',
  },
  {
    label: 'Projects',
    url: '#works',
  },
  {
    label: 'About',
    url: '#about-me-section',
  },
  {
    label: 'Testimonials',
    url: '#testimonials-section',
  },
  {
    label: 'Contact',
    url: '#contact-section',
  },
  {
    label: 'Links',
    url: '/links',
  },
];
const navbarLinks = [
  {
    label: 'Home',
    url: '#app',
  },
  ...navLinks,
];

const socialLinks = [
  {
    label: 'Instagram',
    url: 'https://www.instagram.com/belal_aboseada',
  },
  {
    label: 'TikTok',
    url: 'https://www.tiktok.com/@Belalaboseada',
  },
  {
    label: 'YouTube',
    url: 'https://www.youtube.com/@belalaboseada',
  },
  {
    label: 'Facebook',
    url: 'https://www.facebook.com/belal.hesham.1848?mibextid=2JQ9oc',
  },
];

const resourceLinks = [
  {
    label: 'Pillarstack',
    url: 'https://www.pillarstack.com',
  },
  {
    label: 'Figma Template',
    url: 'https://www.figma.com/community/file/1328038510191576951/project-starter-template',
  },
];

const heroText =
  'Web developer specializing in building web Apps,SaaS products, and creating Arabic tech content that simplifies complex topics for everyday people.';

const locationPlace = ``;
const locationCountry = 'Damanhur, Egypt';

// cal.com
const dataCalNamespace = '30min';
const dataCalLink = 'brhoom/30min';
const dataCalConfig =
  '{"layout":"month_view", "theme": "dark", "brand": "#8C8C73"}';

export {
  socialLinks,
  resourceLinks,
  heroText,
  locationPlace,
  locationCountry,
  navLinks,
  navbarLinks,
  dataCalNamespace,
  dataCalLink,
  dataCalConfig,
};
