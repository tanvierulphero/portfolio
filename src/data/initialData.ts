import { Project, BlogPost, CustomerFeedback, CustomerLead, PaymentTransaction } from '../types';

export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'CloudPulse SaaS – Realtime Analytics Engine',
    category: 'web',
    description: 'High-throughput cloud performance monitoring dashboard with live telemetry, query profiling, and automated incident triage.',
    longDescription: 'Architected and built a micro-frontend monitoring suite processing over 120,000 real-time events per second. Reduced page bundle by 44% with code splitting and delivered sub-50ms query visualisations using WebAssembly canvas renderers.',
    client: 'CloudPulse Technologies Inc. (San Francisco)',
    year: '2025',
    tags: ['React 19', 'TypeScript', 'Node.js', 'Tailwind CSS', 'WebSockets', 'ChartEngine'],
    metrics: '< 45ms P99 latency · 120k events/sec · 38% faster triage',
    liveUrl: 'https://cloudpulse-preview.techitem.dev',
    githubUrl: 'https://github.com/techitem/cloudpulse-analytics-core',
    featured: true,
    previewType: 'web',
    accentColor: '#2563eb',
  },
  {
    id: 'proj-2',
    title: 'ZenPay – Biometric FinTech Mobile App',
    category: 'mobile',
    description: 'Next-generation cross-platform digital wallet with instant multi-currency transfers, FaceID security, and NFC tap-to-pay.',
    longDescription: 'Engineered a banking-grade cross-platform mobile application supporting 14 fiat currencies and automated QR payments. Features offline-first SQLite cache, end-to-end payload encryption, and custom 60fps micro-interaction physics.',
    client: 'Zenith Financial Ltd. (London / Singapore)',
    year: '2025',
    tags: ['Flutter 3.x', 'Dart', 'Firebase Auth', 'SQLite', 'Biometrics', 'NFC'],
    metrics: '250,000+ App Store Downloads · 4.9 Star Rating · 0.12s Auth',
    liveUrl: 'https://zenpay-mobile.techitem.dev',
    githubUrl: 'https://github.com/techitem/zenpay-flutter-engine',
    featured: true,
    previewType: 'mobile',
    accentColor: '#10b981',
  },
  {
    id: 'proj-3',
    title: 'Aura Enterprise – Design System & Tokens',
    category: 'uiux',
    description: 'Enterprise design system spanning 450+ production components, WCAG AAA accessibility, and automated code-token synchronisation.',
    longDescription: 'Directed the complete UX audit and design language overhaul for a global B2B SaaS platform. Created multi-tier design tokens, responsive layout grids, motion curves, and comprehensive documentation in Figma and Storybook.',
    client: 'Aura Cloud Ecosystem (Berlin)',
    year: '2024',
    tags: ['Figma Tokens', 'Design System', 'WCAG AAA', 'Micro-interactions', 'Storybook'],
    metrics: '70% faster designer-to-dev handoff · 450+ atomic components',
    liveUrl: 'https://aura-design.techitem.dev',
    githubUrl: 'https://github.com/techitem/aura-design-tokens',
    featured: true,
    previewType: 'uiux',
    accentColor: '#8b5cf6',
  },
  {
    id: 'proj-4',
    title: 'ApexMart – High-Conversion Headless E-Commerce',
    category: 'web',
    description: 'Ultra-fast headless commerce platform with dynamic cart persistence, AI search recommendations, and multi-gateway checkout.',
    longDescription: 'Developed full-stack web storefront with server-side generation on edge networks. Features instant product filtering, optimistic cart additions, dynamic currency switching, and automated invoice delivery.',
    client: 'Apex Retail Brands (Dhaka / Dubai)',
    year: '2025',
    tags: ['Next.js', 'React', 'Tailwind', 'MongoDB Atlas', 'Stripe API', 'bKash MFS'],
    metrics: '99/100 Google Lighthouse · +64% mobile checkout rate',
    liveUrl: 'https://apexmart.techitem.dev',
    githubUrl: 'https://github.com/techitem/apexmart-headless-store',
    featured: false,
    previewType: 'web',
    accentColor: '#f59e0b',
  },
  {
    id: 'proj-5',
    title: 'CarePulse – Telehealth & Patient Monitor App',
    category: 'mobile',
    description: 'Secure HIPAA-compliant doctor appointment booking, encrypted video consultation, and vital signs Bluetooth tracker integration.',
    longDescription: 'Delivered an intuitive patient-doctor healthcare mobile app with live WebRTC video calling, automated medicine reminders, prescription PDF generation, and real-time vital sign charts synced with smart bands.',
    client: 'CarePulse Health Services (Toronto)',
    year: '2024',
    tags: ['React Native', 'Expo', 'WebRTC', 'Firebase Firestore', 'Bluetooth BLE'],
    metrics: '40,000+ monthly active tele-consultations · HIPAA audited',
    liveUrl: 'https://carepulse.techitem.dev',
    githubUrl: 'https://github.com/techitem/carepulse-telehealth-rn',
    featured: false,
    previewType: 'mobile',
    accentColor: '#06b6d4',
  },
  {
    id: 'proj-6',
    title: 'NomadFlow – Travel Booking & Itinerary UX',
    category: 'uiux',
    description: 'End-to-end user experience strategy, wireframing, and polished mobile UI design for an interactive travel discovery platform.',
    longDescription: 'Conducted user research across 300 international digital nomads to build friction-free flight & co-working booking flows. Crafted high-fidelity prototypes featuring interactive map route planning and split-cost calculator.',
    client: 'NomadFlow Global (Amsterdam)',
    year: '2025',
    tags: ['User Research', 'Figma Prototyping', 'Design Sprint', 'Motion UI'],
    metrics: '+42% booking completion · 4.8/5 usability testing score',
    liveUrl: 'https://nomadflow-ui.techitem.dev',
    githubUrl: 'https://github.com/techitem/nomadflow-prototype-spec',
    featured: false,
    previewType: 'uiux',
    accentColor: '#ec4899',
  },
];

export const initialBlogs: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Architecting 60fps Mobile Interfaces: From React Native to Flutter',
    excerpt: 'Detailed comparison of frame budgeting, off-thread rendering, and avoiding unnecessary garbage collection in production apps.',
    content: `When building modern mobile applications, users expect physical smoothness that matches native OS transitions. Achieving consistent 60fps and 120fps refresh rates requires understanding where bottlenecks arise.

### 1. The Rendering Pipeline & Thread Budget
Every 60fps animation gives your application exactly 16.6 milliseconds per frame. In 120Hz ProMotion displays, this shrinks to 8.3 milliseconds. Any JavaScript execution or expensive Dart computations on the main UI thread will instantly trigger dropped frames.

### 2. State Isolation & Granular Selectors
Avoid global state updates that re-evaluate the entire screen tree. Always use granular selectors and scoped rebuild boundaries.

### 3. Image Memory Caching & Hardware Acceleration
Offload vector rendering to hardware shader passes and employ aggressive texture re-use. Pre-cache high-priority imagery before screen transitions trigger.`,
    category: 'Mobile Engineering',
    readTime: '6 min read',
    publishedAt: 'March 14, 2025',
    author: 'tech item Engineering',
    views: 1840,
    likes: 124,
    tags: ['Flutter', 'React Native', 'Performance', 'Mobile Architecture'],
  },
  {
    id: 'blog-2',
    title: 'Full-Stack Performance at Scale: Edge Caching & Database Optimization',
    excerpt: 'Strategies for deploying React and Node.js applications with sub-100ms global response times across Vercel and MongoDB.',
    content: `Global web application speed directly influences conversion rates and organic SEO rankings. In this technical breakdown, we look at how tech item structures full-stack architectures.

### 1. Edge Middleware & Dynamic Stale-While-Revalidate
By serving static HTML chunks directly from CDN points of presence while hydrating dynamic data in parallel, perceived load time drops to near-zero.

### 2. Strategic Database Indexing & Query Compaction
Whether using MongoDB Atlas or Firebase Firestore, compound indexes tailored to your read patterns prevent costly full-collection scans.

### 3. Asset Compression & Clean Bundle Discipline
Avoid heavyweight third-party libraries for minor utilities. Standardize on native Web APIs and tree-shakeable iconography.`,
    category: 'Web Architecture',
    readTime: '8 min read',
    publishedAt: 'February 28, 2025',
    author: 'tech item Engineering',
    views: 2410,
    likes: 198,
    tags: ['Web Performance', 'Edge Caching', 'MongoDB', 'Vercel', 'SEO'],
  },
  {
    id: 'blog-3',
    title: 'Atomic UI Design Systems: Bridging the Figma-to-Code Chasm',
    excerpt: 'How to build design tokens and component standards that eliminate design debt and accelerate product velocity.',
    content: `Design systems fail when they become museum pieces locked inside Figma without automated synchronization to production codebases.

### 1. Semantic Token Hierarchy
Never reference raw hex codes like \`#2563EB\` in your components. Structure your tokens into Three Tiers:
- Global primitives (e.g. \`blue-600\`)
- Semantic tokens (e.g. \`action-primary-default\`)
- Component-scoped tokens (e.g. \`button-cta-bg\`)

### 2. Accessibility by Default
All interactive states must be engineered with WCAG AA compliance in mind, from visible focus rings to legible type contrast.`,
    category: 'UI/UX Design',
    readTime: '5 min read',
    publishedAt: 'January 19, 2025',
    author: 'tech item Design',
    views: 1390,
    likes: 92,
    tags: ['Design Systems', 'Figma', 'UI/UX', 'Accessibility'],
  },
];

export const initialFeedbacks: CustomerFeedback[] = [
  {
    id: 'fb-1',
    clientName: 'Rashid Al-Mansoor',
    company: 'FinTrack Global (Dubai)',
    role: 'Chief Technology Officer',
    rating: 5,
    projectTitle: 'FinTrack Mobile Banking Suite',
    feedback: 'tech item engineered our flagship mobile banking application with surgical precision. The biometric authentication and real-time transaction sync operate flawlessly. Our App Store rating jumped from 3.8 to 4.9 within 6 weeks of release.',
    date: 'March 2025',
    status: 'approved',
    avatarColor: 'bg-blue-600',
  },
  {
    id: 'fb-2',
    clientName: 'Elena Rostova',
    company: 'Veloce Logistics (Berlin)',
    role: 'VP of Product',
    rating: 5,
    projectTitle: 'Dispatch & Fleet Web Platform',
    feedback: 'Working with tech item was one of the smoothest agency experiences we have had. Clean code, comprehensive documentation, and great communication. The team delivered our fleet monitoring portal 2 weeks ahead of our strict launch schedule.',
    date: 'February 2025',
    status: 'approved',
    avatarColor: 'bg-emerald-600',
  },
  {
    id: 'fb-3',
    clientName: 'Tanvir Hossain',
    company: 'Bengal Health Technologies (Dhaka)',
    role: 'Founder & CEO',
    rating: 5,
    projectTitle: 'CarePulse Telehealth Portal',
    feedback: 'অসাধারণ কাজ! tech item আমাদের পুরো হেলথকেয়ার সিস্টেম অত্যন্ত দক্ষতার সাথে ডিজাইন ও ডেভেলপ করে দিয়েছে। পেশাদারিত্ব ও কাজের কোয়ালিটি প্রশংসনীয়। আমরা তাদের সাথে দীর্ঘমেয়াদী চুক্তিতে কাজ চালিয়ে যাচ্ছি।',
    date: 'January 2025',
    status: 'approved',
    avatarColor: 'bg-purple-600',
  },
  {
    id: 'fb-4',
    clientName: 'Marcus Vance',
    company: 'Synapse Media Labs (San Francisco)',
    role: 'Lead Product Designer',
    rating: 5,
    projectTitle: 'Aura Design System Overhaul',
    feedback: 'The attention to micro-interactions and typographic pacing is exceptional. tech item bridged our Figma designs to React components seamlessly without losing a single pixel of fidelity.',
    date: 'December 2024',
    status: 'approved',
    avatarColor: 'bg-amber-600',
  },
];

export const initialLeads: CustomerLead[] = [
  {
    id: 'lead-101',
    name: 'Sarah Jenkins',
    email: 'sarah.j@novapay.io',
    phone: '+1 415 890 2314',
    projectType: 'Mobile Application',
    budget: '$5,000 - $10,000',
    timeline: '6 - 8 Weeks',
    message: 'Looking to build a cross-platform crypto-to-fiat remittance app for digital nomads with real-time exchange rates.',
    status: 'in_progress',
    createdAt: '2025-03-20 14:32',
    adminNotes: 'Initial technical call completed. Scope doc shared.',
  },
  {
    id: 'lead-102',
    name: 'Kazi Mahbub',
    email: 'kazi@deshishop.com.bd',
    phone: '+880 1712 345678',
    projectType: 'Web Application',
    budget: '$2,500 - $5,000',
    timeline: '4 - 6 Weeks',
    message: 'Need a fast headless multi-vendor grocery e-commerce platform with automated bKash/Nagad checkout and SMS tracking.',
    status: 'new',
    createdAt: '2025-03-24 09:15',
    adminNotes: 'Reviewing database schema requirements.',
  },
];

export const initialTransactions: PaymentTransaction[] = [
  {
    id: 'tx-8091',
    invoiceNumber: 'INV-2025-001',
    clientName: 'FinTrack Global Ltd.',
    clientEmail: 'billing@fintrack.io',
    serviceType: 'Mobile App Milestone 2 (Biometrics & Security)',
    amount: 1400,
    currency: 'USD',
    paymentMethod: 'card',
    status: 'completed',
    date: '2025-03-10',
    notes: 'Settled via Stripe direct webhook',
  },
  {
    id: 'tx-8092',
    invoiceNumber: 'INV-2025-002',
    clientName: 'Bengal Health Technologies',
    clientEmail: 'accounts@bengalhealth.bd',
    serviceType: 'CarePulse Telehealth Portal Deployment',
    amount: 850,
    currency: 'USD',
    paymentMethod: 'bkash',
    status: 'completed',
    date: '2025-03-18',
    notes: 'bKash Merchant TrxID #8X19B2Q8',
  },
  {
    id: 'tx-8093',
    invoiceNumber: 'INV-2025-003',
    clientName: 'Veloce Logistics',
    clientEmail: 'pay@velocelogistics.de',
    serviceType: 'UI/UX Design Sprint 1 (Design Tokens & Wireframes)',
    amount: 600,
    currency: 'USD',
    paymentMethod: 'paypal',
    status: 'completed',
    date: '2025-03-22',
    notes: 'PayPal IPN confirmed',
  },
];
