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
    url: 'https://instagram.com/belal_aboseada',   
  },
  {
    label: 'whatsapp',
    url: 'https://instagram.com/belal_aboseada',  

  },
  {
    label: 'Facebook',
    url: 'https://instagram.com/belal_aboseada',  
 
  },
  {
    label: 'linkedin',
    url: 'https://instagram.com/belal_aboseada',  
 
  },
  {
    label: 'youtube',
    url: 'https://instagram.com/belal_aboseada',  
 
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
  'Web developer specializing in React & Node.js, building SaaS products, and creating Arabic tech content that simplifies complex topics for everyday people.';

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
