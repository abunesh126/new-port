export interface ProjectData {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  problemSolved?: string;
  purpose?: string;
  tools: string[];
  client?: string;
  company?: string;
  year: string;
  link?: string;
  image: string; // large preview image
  icon: string;  // small icon
}

export const projectsData: ProjectData[] = [
  {
    id: 'rectangle',
    name: 'Rectangle',
    shortDescription: 'Product design, Icon design',
    purpose: 'To create an innovative platform that empowers businesses to efficiently manage their workforce.',
    problemSolved: 'Delivering a seamless user experience while distinguishing itself from competitors in the market.',
    fullDescription: 'An innovative platform that empowers businesses to efficiently manage their workforce, delivering a seamless user experience while distinguishing itself from competitors.',
    tools: ['Figma', 'React', 'Tailwind', 'Node.js'],
    client: 'Goven Soven',
    company: 'Rectangle',
    year: '2023',
    link: 'https://example.com/rectangle',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80', // Replace with local asset if needed
    icon: 'https://icons.getbootstrap.com/assets/icons/stop-fill.svg' // Placeholder icon
  },
  {
    id: 'morva-labs',
    name: 'Morva labs',
    shortDescription: 'Visual design, Branding',
    purpose: 'Complete branding and visual identity overhaul.',
    fullDescription: 'Morva Labs represents the pinnacle of digital branding. The project involved creating a new visual language and extensive design system.',
    tools: ['Figma', 'Illustrator', 'React'],
    client: 'Morva Inc',
    company: 'Morva Labs',
    year: '2022',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
    icon: 'https://icons.getbootstrap.com/assets/icons/hexagon-fill.svg'
  },
  {
    id: 'simply',
    name: 'Simply',
    shortDescription: 'Landing page, Illustration design',
    purpose: 'A high-conversion landing page with custom illustrations.',
    fullDescription: 'Custom vector illustration and an intuitive landing page built from scratch to explain the magic behind Simply’s financial products.',
    tools: ['React', 'Framer Motion', 'Tailwind CSS'],
    client: 'Simply Apps',
    company: 'Simply',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
    icon: 'https://icons.getbootstrap.com/assets/icons/lightning-fill.svg'
  },
  {
    id: 'glassdoor',
    name: 'Glassdoor',
    shortDescription: 'Icon design, Illustration design',
    purpose: 'Iconography system and narrative illustrations.',
    fullDescription: 'An extensive icon family designed specifically for clarity at small sizes, paired with large-scale landing page illustrations.',
    tools: ['Illustrator', 'Figma'],
    client: 'Glassdoor',
    company: 'Glassdoor Inc',
    year: '2021',
    image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
    icon: 'https://icons.getbootstrap.com/assets/icons/window-desktop.svg'
  }
];
