const BASE = import.meta.env.BASE_URL;
const icon = (file: string) => `${BASE}assets/icon/${file}`;

export interface TechItem {
  name: string;
  iconSrc: string;
  bgColor: string;
  fgColor: string;
  learned: string[];
  description?: string;
}
export interface TechCategory { id: string; label: string; iconKey: string; items: TechItem[]; }
export interface TechStackData { sectionTitle: string; sectionSubtitle: string; categories: TechCategory[]; }

export const techStackData: TechStackData = {
  sectionTitle: 'Technical Skills',
  sectionSubtitle: "Explore my expertise across different domains. Click any skill to see what I've built and learned.",
  categories: [
    {
      id: 'languages', label: 'Languages', iconKey: 'code',
      items: [
        { name: 'Python', iconSrc: icon('python-5.svg'), bgColor: '#1e3a5f', fgColor: '#60A5FA', description: "Versatile language used for AI, machine learning, data science, automation, and backend APIs. My primary language across all projects.", learned: ['Built ML pipelines & APIs', 'Automated data workflows', 'Scripted CLI tools & bots', 'Async programming patterns'] },
        { name: 'JavaScript', iconSrc: icon('javascript-1.svg'), bgColor: '#3a3000', fgColor: '#FBBF24', description: "Core language of the web for dynamic frontends and Node.js backends. Deep understanding of async patterns and the event loop.", learned: ['Built 10+ web applications', 'Async / await & Promises', 'Complex DOM interactions', 'Developed ML model UIs'] },
        { name: 'TypeScript', iconSrc: icon('typescript.svg'), bgColor: '#1a3a5c', fgColor: '#3B82F6', description: "Strongly-typed superset of JavaScript enabling scalable, maintainable application development with full type safety across the stack.", learned: ['Strict typing across full-stack', 'Generics & utility types', 'Type-safe API contracts', 'Migrated JS codebases to TS'] },
        { name: 'HTML5', iconSrc: icon('html-1.svg'), bgColor: '#2a1500', fgColor: '#F97316', description: "Foundational markup for structuring web content. Expertise in semantic elements, accessibility (WCAG), Canvas, and SVG.", learned: ['Semantic & accessible markup', 'SEO-optimized structure', 'Canvas & SVG elements', 'Web component basics'] },
        { name: 'CSS3', iconSrc: icon('css-3.svg'), bgColor: '#0a1f3a', fgColor: '#38BDF8', description: "Advanced CSS3 styling with Flexbox, Grid, animations, and responsive design. Proficient in CSS variables, glassmorphism, and CSS-in-JS.", learned: ['Flexbox & Grid layouts', 'CSS animations & transitions', 'Responsive design', 'CSS variables & theming'] },
        { name: 'SQL', iconSrc: icon('sql.svg'), bgColor: '#0f2b3d', fgColor: '#22D3EE', learned: ['Complex joins & subqueries', 'Database normalization', 'Query optimization & indexes', 'Postgres & MySQL schemas'] },
        { name: 'Java', iconSrc: icon('java-14.svg'), bgColor: '#2a1500', fgColor: '#F97316', learned: ['OOP principles & patterns', 'Spring Boot basics', 'Data structures & DSA', 'Multithreading concepts'] },
      ],
    },
    {
      id: 'frontend', label: 'Frontend', iconKey: 'monitor',
      items: [
        { name: 'React', iconSrc: icon('react-2.svg'), bgColor: '#0a2a3a', fgColor: '#22D3EE', description: "Component-based UI library for building fast, interactive interfaces. Used for dashboards, portfolio sites, AI demos, and production SPAs.", learned: ['Custom hooks & context API', 'Performance optimization', 'Component composition', 'State management patterns'] },
        { name: 'Next.js', iconSrc: icon('nextjs-icon-svgrepo-com.svg'), bgColor: '#111827', fgColor: '#F0F6FF', description: "Full-stack React framework with SSR, SSG, and API routes — ideal for production apps with SEO and edge deployment.", learned: ['SSR & SSG strategies', 'App Router architecture', 'API routes & middleware', 'SEO & image optimization'] },
        { name: 'Vite', iconSrc: icon('vitejs-svgrepo-com.svg'), bgColor: '#1a1040', fgColor: '#A78BFA', learned: ['Lightning-fast dev builds', 'Plugin ecosystem & config', 'HMR & build optimization', 'Multi-page app setup'] },
        { name: 'Tailwind CSS', iconSrc: icon('tailwind-css-2.svg'), bgColor: '#0a2535', fgColor: '#38BDF8', description: "Utility-first framework enabling rapid UI development with consistent design systems, dark mode, and responsive layouts.", learned: ['Utility-first design system', 'Custom theme configuration', 'Responsive & dark mode', 'Component library building'] },
        { name: 'Bootstrap', iconSrc: icon('bootstrap.svg'), bgColor: '#1a0a3a', fgColor: '#A78BFA', learned: ['Rapid UI prototyping', 'Grid system mastery', 'Component customization', 'Responsive layouts'] },
        { name: 'Styled Components', iconSrc: icon('styled-components-svgrepo-com.svg'), bgColor: '#2a0a2a', fgColor: '#EC4899', learned: ['CSS-in-JS architecture', 'Dynamic theming via props', 'Component-scoped styles', 'Global style injection'] },
        { name: 'Chakra UI', iconSrc: icon('chakra-ui-icon.svg'), bgColor: '#0a2a20', fgColor: '#34D399', learned: ['Accessible component library', 'Theme & token customization', 'Dark mode out of the box', 'Responsive style props'] },
      ],
    },
    {
      id: 'backend', label: 'Backend', iconKey: 'server',
      items: [
        { name: 'Node.js', iconSrc: icon('nodejs-1.svg'), bgColor: '#0a2510', fgColor: '#86EFAC', description: "JavaScript runtime for scalable server-side development. Built REST APIs, real-time apps, and backend tooling.", learned: ['Event-driven architecture', 'Express REST services', 'File system & streams', 'Package authoring & npm'] },
        { name: 'FastAPI', iconSrc: icon('FastAPI.svg'), bgColor: '#0a2520', fgColor: '#34D399', description: "High-performance async Python framework for building production APIs with auto-generated OpenAPI docs and Pydantic validation.", learned: ['REST & async API design', 'Pydantic validation schemas', 'JWT auth & middleware', 'OpenAPI auto-documentation'] },
        { name: 'Flask', iconSrc: icon('flask-svgrepo-com.svg'), bgColor: '#1a1a1a', fgColor: '#F0F6FF', description: "Lightweight Python micro-framework for REST APIs and ML model serving. Ideal for prototyping and deploying AI backends.", learned: ['Lightweight REST APIs', 'Blueprint modular routing', 'Jinja2 templating', 'Flask-SQLAlchemy integration'] },
        { name: 'Django', iconSrc: icon('django-svgrepo-com.svg'), bgColor: '#0a2020', fgColor: '#22D3EE', learned: ['ORM & admin panel', 'REST framework APIs', 'Authentication systems', 'Template & forms engine'] },
        { name: 'Laravel', iconSrc: icon('laravel-2.svg'), bgColor: '#2a0a0a', fgColor: '#EF4444', learned: ['MVC architecture pattern', 'Eloquent ORM usage', 'Auth & middleware setup', 'RESTful resource routes'] },
        { name: 'Docker', iconSrc: icon('docker-svgrepo-com.svg'), bgColor: '#0a2535', fgColor: '#22D3EE', learned: ['Multi-stage Dockerfiles', 'Docker Compose stacks', 'Networking & volumes', 'Container security basics'] },
      ],
    },
    {
      id: 'ai', label: 'AI & ML', iconKey: 'brain',
      items: [
        { name: 'TensorFlow', iconSrc: icon('tensorflow-2.svg'), bgColor: '#2a2000', fgColor: '#FBBF24', description: "End-to-end ML platform for building and deploying models. Used for image classification, NLP, and real-time prediction services.", learned: ['Keras sequential models', 'Model deployment (TFLite)', 'Data pipeline with tf.data', 'Classification & detection'] },
        { name: 'PyTorch', iconSrc: icon('pytorch-svgrepo-com.svg'), bgColor: '#2a1a0a', fgColor: '#F97316', description: "Dynamic deep learning framework for research and production. Used for custom CNNs, transfer learning, and LSTM-based sequence models.", learned: ['Custom model architecture', 'Training & fine-tuning loops', 'Computer vision models', 'Transfer learning techniques'] },
        { name: 'Keras', iconSrc: icon('Keras.svg'), bgColor: '#2a0a10', fgColor: '#EF4444', learned: ['High-level model building', 'Custom layers & callbacks', 'Transfer learning APIs', 'Model checkpointing'] },
        { name: 'Scikit-learn', iconSrc: icon('scikit-learn.svg'), bgColor: '#1a2a3a', fgColor: '#60A5FA', description: "Comprehensive ML library for classical algorithms, model evaluation, and feature engineering pipelines across all supervised learning tasks.", learned: ['Classical ML algorithms', 'Feature engineering', 'Cross-validation & tuning', 'Pipeline & preprocessing'] },
        { name: 'OpenCV', iconSrc: icon('opencv-svgrepo-com.svg'), bgColor: '#0a2535', fgColor: '#22D3EE', description: "Computer vision library for real-time image and video processing. Applied to gesture recognition, object detection, and video analytics.", learned: ['Real-time video processing', 'Object detection pipelines', 'Image segmentation & filters', 'Gesture & face recognition'] },
        { name: 'Hugging Face', iconSrc: icon('huggingface-color.svg'), bgColor: '#2a1a00', fgColor: '#F59E0B', learned: ['Transformer fine-tuning', 'NLP classification tasks', 'Model Hub API usage', 'Tokenizer customization'] },
        { name: 'LangChain', iconSrc: icon('langchain-color.svg'), bgColor: '#0a2520', fgColor: '#34D399', description: "Framework for building LLM-powered applications including RAG pipelines, AI agents, and vector store integrations.", learned: ['LLM chain orchestration', 'RAG pipeline building', 'Agent & tool creation', 'Vector store integration'] },
        { name: 'Whisper AI', iconSrc: icon('whisper-openai.svg'), bgColor: '#111827', fgColor: '#A78BFA', learned: ['Speech-to-text transcription', 'Multilingual audio parsing', 'Audio pipeline integration', 'Real-time transcription apps'] },
      ],
    },
    {
      id: 'data', label: 'Data Science', iconKey: 'chart',
      items: [
        { name: 'Pandas', iconSrc: icon('Pandas.svg'), bgColor: '#1a0a3a', fgColor: '#A78BFA', description: "Powerful data manipulation library for cleaning, transforming, and analyzing structured datasets — core to every data science workflow.", learned: ['DataFrame manipulation', 'Data cleaning & merging', 'GroupBy & aggregation', 'CSV / Excel / JSON IO'] },
        { name: 'Matplotlib', iconSrc: icon('Matplotlib.svg'), bgColor: '#0a1a35', fgColor: '#60A5FA', description: "Primary visualization library for charts, plots, and dashboards. Used alongside Plotly and Seaborn for interactive data storytelling.", learned: ['Static chart creation', 'Subplot & figure layouts', 'Custom styles & colors', 'Plot export & embedding'] },
        { name: 'Seaborn', iconSrc: icon('seaborn-1.svg'), bgColor: '#0a2535', fgColor: '#38BDF8', learned: ['Statistical plot library', 'Heatmaps & pair plots', 'Regression & distribution plots', 'Theme & palette customization'] },
        { name: 'Plotly', iconSrc: icon('plotly-icon.svg'), bgColor: '#1a1a3a', fgColor: '#A78BFA', learned: ['Interactive web charts', 'Dash dashboard building', '3D & geo scatter plots', 'Animation & slider controls'] },
        { name: 'Power BI', iconSrc: icon('powerbi.svg'), bgColor: '#2a1a00', fgColor: '#F59E0B', description: "Business intelligence tool for designing interactive dashboards and KPI reports with DAX modeling and stakeholder-ready presentations.", learned: ['Interactive dashboards', 'DAX measures & calculated cols', 'Data modeling & joins', 'Published reports & sharing'] },
        { name: 'Tableau', iconSrc: icon('tableau-logo-1.svg'), bgColor: '#1a2a3a', fgColor: '#60A5FA', learned: ['Data visualization design', 'Calculated fields & LOD', 'Story & dashboard building', 'Connecting multiple sources'] },
      ],
    },
    {
      id: 'databases', label: 'Databases', iconKey: 'database',
      items: [
        { name: 'MySQL', iconSrc: icon('mysql.svg'), bgColor: '#0a2535', fgColor: '#22D3EE', description: "Most widely-used relational database. Designed schemas, optimized complex queries, built stored procedures, and managed production databases.", learned: ['Schema design & migrations', 'Stored procedures & triggers', 'Performance indexing', 'Backup & recovery basics'] },
        { name: 'PostgreSQL', iconSrc: icon('postgresql.svg'), bgColor: '#1a1a3a', fgColor: '#A78BFA', learned: ['Advanced query patterns', 'JSONB & extensions', 'Row-level security', 'Full-text search'] },
        { name: 'MongoDB', iconSrc: icon('mongodb-icon-1.svg'), bgColor: '#0a2510', fgColor: '#34D399', description: "NoSQL document database for flexible, scalable data storage. Used in real-time apps, analytics pipelines, and Node.js backends.", learned: ['Document schema design', 'Aggregation pipelines', 'Atlas cloud deployment', 'Mongoose ODM usage'] },
        { name: 'Supabase', iconSrc: icon('supabase-icon.svg'), bgColor: '#0a2520', fgColor: '#34D399', learned: ['Postgres DB as a service', 'Auth (OAuth & magic link)', 'Realtime subscriptions', 'Edge functions & storage'] },
      ],
    },
    {
      id: 'devops', label: 'Cloud & DevOps', iconKey: 'cloud',
      items: [
        { name: 'AWS', iconSrc: icon('Amazon_Web_Services_Logo.svg'), bgColor: '#1a1500', fgColor: '#FBBF24', description: "Cloud platform for deploying and scaling applications. Experience with EC2, S3, Lambda, IAM policies, and CloudWatch monitoring.", learned: ['EC2 & S3 deployment', 'Lambda serverless funcs', 'IAM roles & policies', 'CloudWatch monitoring'] },
        { name: 'Docker', iconSrc: icon('docker-svgrepo-com.svg'), bgColor: '#0a2535', fgColor: '#22D3EE', description: "Containerization for consistent, reproducible environments. Built multi-stage images, Compose stacks, and containerized ML servers.", learned: ['Multi-stage Dockerfiles', 'Docker Compose stacks', 'Networking & volumes', 'Container security basics'] },
        { name: 'Netlify', iconSrc: icon('netlify-svgrepo-com.svg'), bgColor: '#002a2a', fgColor: '#34D399', learned: ['Zero-config deployments', 'CI/CD from GitHub', 'Edge functions & CDN', 'Custom domain & SSL'] },
        { name: 'Vercel', iconSrc: icon('vercel-icon-svgrepo-com.svg'), bgColor: '#111827', fgColor: '#F0F6FF', learned: ['Next.js optimized hosting', 'Preview environments', 'Serverless functions', 'Analytics & monitoring'] },
        { name: 'GitHub Actions', iconSrc: icon('GitHub Actions.svg'), bgColor: '#111827', fgColor: '#60A5FA', learned: ['CI/CD pipeline setup', 'Automated test & deploy', 'Environment secrets mgmt', 'Matrix strategy builds'] },
      ],
    },
    {
      id: 'tools', label: 'Dev Tools', iconKey: 'wrench',
      items: [
        { name: 'Git', iconSrc: icon('git.svg'), bgColor: '#1a1010', fgColor: '#F97316', description: "Version control for all projects. Skilled in feature branching, rebasing, cherry-picking, and collaborative open-source workflows.", learned: ['Branch & merge strategies', 'Git rebase & cherry-pick', 'Open source contributions', 'Monorepo workflows'] },
        { name: 'GitHub', iconSrc: icon('github-icon-1.svg'), bgColor: '#111827', fgColor: '#F0F6FF', description: "Primary platform for code hosting, pull requests, CI/CD via Actions, issue tracking, and open-source project management.", learned: ['Pull requests & code review', 'GitHub Actions CI/CD', 'Issue & project tracking', 'GitHub Pages hosting'] },
        { name: 'VS Code', iconSrc: icon('visual-studio-code-1.svg'), bgColor: '#0a1a35', fgColor: '#60A5FA', learned: ['Custom extension setup', 'Debugging complex apps', 'Snippet & task automation', 'Remote SSH development'] },
        { name: 'Postman', iconSrc: icon('postman.svg'), bgColor: '#2a1000', fgColor: '#F97316', learned: ['API testing & mocking', 'Collection & environment vars', 'Automated test scripts', 'API documentation gen'] },
        { name: 'Jupyter', iconSrc: icon('jupyter.svg'), bgColor: '#2a1500', fgColor: '#F59E0B', learned: ['Exploratory data analysis', 'Interactive ML experiments', 'Data visualization notebooks', 'Research documentation'] },
        { name: 'PyCharm', iconSrc: icon('pycharm.svg'), bgColor: '#0a2510', fgColor: '#34D399', learned: ['Python project management', 'Integrated debugger usage', 'Virtual env & interpreter', 'Code inspections & refactor'] },
        { name: 'Figma', iconSrc: icon('figma.svg'), bgColor: '#2a0a1a', fgColor: '#EC4899', learned: ['UI wireframing & prototyping', 'Design system creation', 'Auto-layout & components', 'Dev handoff & inspect'] },
        { name: 'Cisco Packet Tracer', iconSrc: icon('cisco-packet-tracer.svg'), bgColor: '#0a1a35', fgColor: '#60A5FA', learned: ['Network topology design', 'Router & switch config', 'VLAN & subnetting practice', 'Protocol simulation'] },
        { name: 'Blender', iconSrc: icon('blender-2.svg'), bgColor: '#1a1000', fgColor: '#F97316', learned: ['3D modelling basics', 'Material & texture setup', 'Render pipeline exploration', 'Animation fundamentals'] },
      ],
    },
  ],
};
