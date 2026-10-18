export type ProjectCategory = 'all' | 'web' | 'mobile' | 'uiux';

export interface Project {
  id: string;
  title: string;
  category: 'web' | 'mobile' | 'uiux';
  description: string;
  longDescription: string;
  client: string;
  year: string;
  tags: string[];
  metrics: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  previewType: 'web' | 'mobile' | 'uiux';
  accentColor?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  publishedAt: string;
  author: string;
  views: number;
  likes: number;
  tags: string[];
}

export type LeadStatus = 'new' | 'contacted' | 'in_progress' | 'completed';

export interface CustomerLead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  status: LeadStatus;
  createdAt: string;
  adminNotes?: string;
}

export type FeedbackStatus = 'approved' | 'pending' | 'rejected';

export interface CustomerFeedback {
  id: string;
  clientName: string;
  company: string;
  role: string;
  rating: number;
  projectTitle: string;
  feedback: string;
  date: string;
  status: FeedbackStatus;
  avatarColor: string;
}

export type PaymentMethod = 'card' | 'bkash' | 'nagad' | 'paypal' | 'bank';
export type PaymentStatus = 'completed' | 'pending' | 'refunded';

export interface PaymentTransaction {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  serviceType: string;
  amount: number;
  currency: string;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  date: string;
  notes?: string;
}

export interface CloudDbConfig {
  provider: 'local' | 'firebase' | 'mongodb';
  firebaseConfig?: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    appId: string;
  };
  mongoUri?: string;
  lastSyncedAt?: string;
  status: 'connected' | 'disconnected' | 'syncing';
}
