// ─── ABUNESH R P — TECH STACK DATA ────────────────────────────────────────────

const BASE = import.meta.env.BASE_URL;
const icon = (file: string) => `${BASE}assets/icon/${file}`;

export interface TechItem {
  name: string;
  iconSrc: string;   // path to public SVG
  bgColor: string;   // icon tile background tint
  fgColor: string;   // accent / label color
  learned: string[]; // hover card bullets
}

export interface TechCategory {
  id: string;
  label: string;
  iconKey: string;
  items: TechItem[];
}

export interface TechStackData {
  sectionTitle: string;
  sectionSubtitle: string;
  categories: TechCategory[];
}

export const techStackData: TechStackData = {
  sectionTitle: 'Technical Skills',
  sectionSubtitle:
    "Explore my technical expertise across different categories. Hover over each skill to discover what I've learned and accomplished.",

  categories: [
    // ── LANGUAGES ───────────────────────────────────────────────────────────
    {
      id: 'languages',
      label: 'Languages',
      iconKey: 'code',
      items: [
        {
          name: 'Python',
          iconSrc: icon('python-5.svg'),
          bgColor: '#1e3a5f',
          fgColor: '#60A5FA',
          learned: [
            'Built ML pipelines & APIs',
            'Automated data workflows',
            'Scripted CLI tools & bots',
            'Async programming patterns',
          ],
        },
        {
          name: 'TypeScript',
          iconSrc: icon('typescript.svg'),
          bgColor: '#1a3a5c',
          fgColor: '#3B82F6',
          learned: [
            'Strict typing across full-stack',
            'Generics & utility types',
            'Type-safe API contracts',
            'Migrated JS codebases to TS',
          ],
        },
        {
          name: 'JavaScript',
          iconSrc: icon('javascript-1.svg'),
          bgColor: '#3a3000',
          fgColor: '#FBBF24',
          learned: [
            'Built 10+ web applications',
            'Async / await & Promises',
            'Complex DOM interactions',
            'Developed ML model UIs',
          ],
        },
        {
          name: 'SQL',
          iconSrc: icon('sql.svg'),
          bgColor: '#0f2b3d',
          fgColor: '#22D3EE',
          learned: [
            'Complex joins & subqueries',
            'Database normalization',
            'Query optimization & indexes',
            'Postgres & MySQL schemas',
          ],
        },
        {
          name: 'HTML5',
          iconSrc: icon('html-1.svg'),
          bgColor: '#2a1500',
          fgColor: '#F97316',
          learned: [
            'Semantic & accessible markup',
            'SEO-optimized structure',
            'Canvas & SVG elements',
            'Web component basics',
          ],
        },
        {
          name: 'CSS3',
          iconSrc: icon('css-3.svg'),
          bgColor: '#0a1f3a',
          fgColor: '#38BDF8',
          learned: [
            'Flexbox & CSS Grid layouts',
            'Animations & transitions',
            'CSS variables & theming',
            'Glassmorphism & effects',
          ],
        },
      ],
    },

    // ── FRONTEND ─────────────────────────────────────────────────────────────
    {
      id: 'frontend',
      label: 'Frontend',
      iconKey: 'monitor',
      items: [
        {
          name: 'React',
          iconSrc: icon('react-2.svg'),
          bgColor: '#0a2a3a',
          fgColor: '#22D3EE',
          learned: [
            'Custom hooks & context API',
            'Performance optimization',
            'Component composition',
            'State management patterns',
          ],
        },
        {
          name: 'Next.js',
          iconSrc: icon('nextjs-icon-svgrepo-com.svg'),
          bgColor: '#111827',
          fgColor: '#F0F6FF',
          learned: [
            'SSR & SSG strategies',
            'App Router architecture',
            'API routes & middleware',
            'SEO & image optimization',
          ],
        },
        {
          name: 'Vite',
          iconSrc: icon('vitejs-svgrepo-com.svg'),
          bgColor: '#1a1040',
          fgColor: '#A78BFA',
          learned: [
            'Lightning-fast dev builds',
            'Plugin ecosystem & config',
            'HMR & build optimization',
            'Multi-page app setup',
          ],
        },
        {
          name: 'Tailwind CSS',
          iconSrc: icon('tailwind-css-2.svg'),
          bgColor: '#0a2535',
          fgColor: '#38BDF8',
          learned: [
            'Utility-first design system',
            'Custom theme configuration',
            'Responsive & dark mode',
            'Component library building',
          ],
        },
        {
          name: 'Bootstrap',
          iconSrc: icon('bootstrap.svg'),
          bgColor: '#1a0a3a',
          fgColor: '#A78BFA',
          learned: [
            'Rapid UI prototyping',
            'Grid system mastery',
            'Component customization',
            'Responsive layouts',
          ],
        },
        {
          name: 'Node.js',
          iconSrc: icon('nodejs-1.svg'),
          bgColor: '#0a2510',
          fgColor: '#86EFAC',
          learned: [
            'Event-driven architecture',
            'Express REST services',
            'File system & streams',
            'Package authoring & npm',
          ],
        },
      ],
    },

    // ── BACKEND ──────────────────────────────────────────────────────────────
    {
      id: 'backend',
      label: 'Backend',
      iconKey: 'server',
      items: [
        {
          name: 'FastAPI',
          iconSrc: icon('FastAPI.svg'),
          bgColor: '#0a2520',
          fgColor: '#34D399',
          learned: [
            'REST & async API design',
            'Pydantic validation schemas',
            'JWT auth & middleware',
            'OpenAPI auto-documentation',
          ],
        },
        {
          name: 'Django',
          iconSrc: icon('django-svgrepo-com.svg'),
          bgColor: '#0a2020',
          fgColor: '#22D3EE',
          learned: [
            'ORM & admin panel',
            'REST framework APIs',
            'Authentication systems',
            'Template & forms engine',
          ],
        },
        {
          name: 'Docker',
          iconSrc: icon('docker-svgrepo-com.svg'),
          bgColor: '#0a2535',
          fgColor: '#22D3EE',
          learned: [
            'Multi-stage Dockerfiles',
            'Docker Compose services',
            'Networking & volumes',
            'Container security basics',
          ],
        },
        {
          name: 'AWS',
          iconSrc: icon('Amazon_Web_Services_Logo.svg'),
          bgColor: '#1a1500',
          fgColor: '#FBBF24',
          learned: [
            'EC2 & S3 deployment',
            'Lambda serverless funcs',
            'IAM roles & policies',
            'CloudWatch monitoring',
          ],
        },
        {
          name: 'Supabase',
          iconSrc: icon('supabase-icon.svg'),
          bgColor: '#0a2520',
          fgColor: '#34D399',
          learned: [
            'Postgres DB as a service',
            'Auth (OAuth & magic link)',
            'Realtime subscriptions',
            'Edge functions & storage',
          ],
        },
        {
          name: 'Netlify / Vercel',
          iconSrc: icon('netlify-svgrepo-com.svg'),
          bgColor: '#002a2a',
          fgColor: '#34D399',
          learned: [
            'Zero-config deployments',
            'Preview environments',
            'Edge functions & CDN',
            'Custom domain & SSL',
          ],
        },
      ],
    },

    // ── AI & ML ──────────────────────────────────────────────────────────────
    {
      id: 'ai',
      label: 'AI & ML',
      iconKey: 'brain',
      items: [
        {
          name: 'PyTorch',
          iconSrc: icon('pytorch-svgrepo-com.svg'),
          bgColor: '#2a1a0a',
          fgColor: '#F97316',
          learned: [
            'Custom model architecture',
            'Training & fine-tuning loops',
            'Computer vision models',
            'Transfer learning techniques',
          ],
        },
        {
          name: 'TensorFlow',
          iconSrc: icon('tensorflow-2.svg'),
          bgColor: '#2a2000',
          fgColor: '#FBBF24',
          learned: [
            'Keras sequential models',
            'Model deployment (TFLite)',
            'Data pipeline with tf.data',
            'Classification & detection',
          ],
        },
        {
          name: 'OpenCV',
          iconSrc: icon('opencv-svgrepo-com.svg'),
          bgColor: '#0a2535',
          fgColor: '#22D3EE',
          learned: [
            'Real-time video processing',
            'Object detection pipelines',
            'Image segmentation & filters',
            'Gesture & face recognition',
          ],
        },
        {
          name: 'Hugging Face',
          iconSrc: icon('huggingface-color.svg'),
          bgColor: '#2a1a00',
          fgColor: '#F59E0B',
          learned: [
            'Transformer fine-tuning',
            'NLP classification tasks',
            'Model Hub API usage',
            'Tokenizer customization',
          ],
        },
        {
          name: 'LangChain',
          iconSrc: icon('langchain-color.svg'),
          bgColor: '#0a2520',
          fgColor: '#34D399',
          learned: [
            'LLM chain orchestration',
            'RAG pipeline building',
            'Agent & tool creation',
            'Vector store integration',
          ],
        },
        {
          name: 'Scikit-learn',
          iconSrc: icon('scikit-learn.svg'),
          bgColor: '#1a2a3a',
          fgColor: '#60A5FA',
          learned: [
            'Classical ML algorithms',
            'Feature engineering',
            'Cross-validation & tuning',
            'Pipeline & preprocessing',
          ],
        },
      ],
    },

    // ── DATA & DATABASES ─────────────────────────────────────────────────────
    {
      id: 'data',
      label: 'Data & DB',
      iconKey: 'database',
      items: [
        {
          name: 'MySQL',
          iconSrc: icon('mysql.svg'),
          bgColor: '#0a2535',
          fgColor: '#22D3EE',
          learned: [
            'Schema design & migrations',
            'Stored procedures & triggers',
            'Performance indexing',
            'Backup & recovery basics',
          ],
        },
        {
          name: 'PostgreSQL',
          iconSrc: icon('postgresql.svg'),
          bgColor: '#1a1a3a',
          fgColor: '#A78BFA',
          learned: [
            'Advanced query patterns',
            'JSONB & extensions',
            'Row-level security',
            'Full-text search',
          ],
        },
        {
          name: 'MongoDB',
          iconSrc: icon('mongodb-icon-1.svg'),
          bgColor: '#0a2510',
          fgColor: '#34D399',
          learned: [
            'Document schema design',
            'Aggregation pipelines',
            'Atlas cloud deployment',
            'Mongoose ODM usage',
          ],
        },
        {
          name: 'Power BI',
          iconSrc: icon('powerbi.svg'),
          bgColor: '#2a1a00',
          fgColor: '#F59E0B',
          learned: [
            'Interactive dashboards',
            'DAX measures & calculated cols',
            'Data modeling & joins',
            'Published reports & sharing',
          ],
        },
        {
          name: 'Tableau',
          iconSrc: icon('tableau-logo-1.svg'),
          bgColor: '#1a2a3a',
          fgColor: '#60A5FA',
          learned: [
            'Data visualization design',
            'Calculated fields & LOD',
            'Story & dashboard building',
            'Connecting multiple sources',
          ],
        },
        {
          name: 'Java',
          iconSrc: icon('java-14.svg'),
          bgColor: '#2a1500',
          fgColor: '#F97316',
          learned: [
            'OOP principles & patterns',
            'Spring Boot basics',
            'Data structures & DSA',
            'Multithreading concepts',
          ],
        },
      ],
    },

    // ── TOOLS ────────────────────────────────────────────────────────────────
    {
      id: 'tools',
      label: 'Tools',
      iconKey: 'wrench',
      items: [
        {
          name: 'Git',
          iconSrc: icon('git.svg'),
          bgColor: '#1a1010',
          fgColor: '#F97316',
          learned: [
            'Branch & merge strategies',
            'Git rebase & cherry-pick',
            'Open source contributions',
            'Monorepo workflows',
          ],
        },
        {
          name: 'GitHub',
          iconSrc: icon('github-icon-1.svg'),
          bgColor: '#111827',
          fgColor: '#F0F6FF',
          learned: [
            'Pull requests & code review',
            'GitHub Actions CI/CD',
            'Issue & project tracking',
            'GitHub Pages hosting',
          ],
        },
        {
          name: 'VS Code',
          iconSrc: icon('visual-studio-code-1.svg'),
          bgColor: '#0a1a35',
          fgColor: '#60A5FA',
          learned: [
            'Custom extension setup',
            'Debugging complex apps',
            'Snippet & task automation',
            'Remote SSH development',
          ],
        },
        {
          name: 'Figma',
          iconSrc: icon('figma.svg'),
          bgColor: '#2a0a1a',
          fgColor: '#EC4899',
          learned: [
            'UI wireframing & prototyping',
            'Design system creation',
            'Auto-layout & components',
            'Dev handoff & inspect',
          ],
        },
        {
          name: 'Postman',
          iconSrc: icon('postman.svg'),
          bgColor: '#2a1000',
          fgColor: '#F97316',
          learned: [
            'API testing & mocking',
            'Collection & environment vars',
            'Automated test scripts',
            'API documentation gen',
          ],
        },
        {
          name: 'Jupyter',
          iconSrc: icon('jupyter.svg'),
          bgColor: '#2a1500',
          fgColor: '#F59E0B',
          learned: [
            'Exploratory data analysis',
            'Interactive ML experiments',
            'Data visualization notebooks',
            'Research documentation',
          ],
        },
        {
          name: 'PyCharm',
          iconSrc: icon('pycharm.svg'),
          bgColor: '#0a2510',
          fgColor: '#34D399',
          learned: [
            'Python project management',
            'Integrated debugger usage',
            'Virtual env & interpreter',
            'Code inspections & refactor',
          ],
        },
        {
          name: 'Blender',
          iconSrc: icon('blender-2.svg'),
          bgColor: '#1a1000',
          fgColor: '#F97316',
          learned: [
            '3D modelling basics',
            'Material & texture setup',
            'Render pipeline exploration',
            'Animation fundamentals',
          ],
        },
      ],
    },
  ],
};
