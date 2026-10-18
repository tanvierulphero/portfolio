import { Project, BlogPost, CustomerFeedback, CustomerLead, PaymentTransaction, CloudDbConfig } from '../types';
import { initialProjects, initialBlogs, initialFeedbacks, initialLeads, initialTransactions } from '../data/initialData';

const STORAGE_KEYS = {
  PROJECTS: 'tech_item_projects_v1',
  BLOGS: 'tech_item_blogs_v1',
  FEEDBACKS: 'tech_item_feedbacks_v1',
  LEADS: 'tech_item_leads_v1',
  TRANSACTIONS: 'tech_item_transactions_v1',
  CLOUD_CONFIG: 'tech_item_cloud_config_v1',
};

// Safe JSON parse with fallback
function getParsed<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (err) {
    console.error(`Error reading ${key} from storage:`, err);
    return fallback;
  }
}

function setStored<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`Error writing ${key} to storage:`, err);
  }
}

// Initialize storage if empty
export function initStorage(): void {
  if (!localStorage.getItem(STORAGE_KEYS.PROJECTS)) {
    setStored(STORAGE_KEYS.PROJECTS, initialProjects);
  }
  if (!localStorage.getItem(STORAGE_KEYS.BLOGS)) {
    setStored(STORAGE_KEYS.BLOGS, initialBlogs);
  }
  if (!localStorage.getItem(STORAGE_KEYS.FEEDBACKS)) {
    setStored(STORAGE_KEYS.FEEDBACKS, initialFeedbacks);
  }
  if (!localStorage.getItem(STORAGE_KEYS.LEADS)) {
    setStored(STORAGE_KEYS.LEADS, initialLeads);
  }
  if (!localStorage.getItem(STORAGE_KEYS.TRANSACTIONS)) {
    setStored(STORAGE_KEYS.TRANSACTIONS, initialTransactions);
  }
}

// Projects
export function getProjects(): Project[] {
  return getParsed<Project[]>(STORAGE_KEYS.PROJECTS, initialProjects);
}

export function saveProject(project: Project): void {
  const current = getProjects();
  const index = current.findIndex((p) => p.id === project.id);
  if (index >= 0) {
    current[index] = project;
  } else {
    current.unshift(project);
  }
  setStored(STORAGE_KEYS.PROJECTS, current);
}

export function deleteProject(id: string): void {
  const current = getProjects().filter((p) => p.id !== id);
  setStored(STORAGE_KEYS.PROJECTS, current);
}

// Blogs
export function getBlogs(): BlogPost[] {
  return getParsed<BlogPost[]>(STORAGE_KEYS.BLOGS, initialBlogs);
}

export function saveBlog(blog: BlogPost): void {
  const current = getBlogs();
  const index = current.findIndex((b) => b.id === blog.id);
  if (index >= 0) {
    current[index] = blog;
  } else {
    current.unshift(blog);
  }
  setStored(STORAGE_KEYS.BLOGS, current);
}

export function likeBlog(id: string): void {
  const current = getBlogs();
  const blog = current.find((b) => b.id === id);
  if (blog) {
    blog.likes += 1;
    setStored(STORAGE_KEYS.BLOGS, current);
  }
}

// Feedbacks
export function getFeedbacks(): CustomerFeedback[] {
  return getParsed<CustomerFeedback[]>(STORAGE_KEYS.FEEDBACKS, initialFeedbacks);
}

export function saveFeedback(feedback: CustomerFeedback): void {
  const current = getFeedbacks();
  const index = current.findIndex((f) => f.id === feedback.id);
  if (index >= 0) {
    current[index] = feedback;
  } else {
    current.unshift(feedback);
  }
  setStored(STORAGE_KEYS.FEEDBACKS, current);
}

export function updateFeedbackStatus(id: string, status: CustomerFeedback['status']): void {
  const current = getFeedbacks();
  const feedback = current.find((f) => f.id === id);
  if (feedback) {
    feedback.status = status;
    setStored(STORAGE_KEYS.FEEDBACKS, current);
  }
}

// Leads
export function getLeads(): CustomerLead[] {
  return getParsed<CustomerLead[]>(STORAGE_KEYS.LEADS, initialLeads);
}

export function saveLead(lead: CustomerLead): void {
  const current = getLeads();
  current.unshift(lead);
  setStored(STORAGE_KEYS.LEADS, current);
}

export function updateLeadStatus(id: string, status: CustomerLead['status'], notes?: string): void {
  const current = getLeads();
  const lead = current.find((l) => l.id === id);
  if (lead) {
    lead.status = status;
    if (notes !== undefined) lead.adminNotes = notes;
    setStored(STORAGE_KEYS.LEADS, current);
  }
}

// Transactions
export function getTransactions(): PaymentTransaction[] {
  return getParsed<PaymentTransaction[]>(STORAGE_KEYS.TRANSACTIONS, initialTransactions);
}

export function saveTransaction(tx: PaymentTransaction): void {
  const current = getTransactions();
  current.unshift(tx);
  setStored(STORAGE_KEYS.TRANSACTIONS, current);
}

// Cloud Database configuration & Export/Import
export function getCloudConfig(): CloudDbConfig {
  return getParsed<CloudDbConfig>(STORAGE_KEYS.CLOUD_CONFIG, {
    provider: 'local',
    status: 'connected',
    lastSyncedAt: new Date().toISOString(),
  });
}

export function saveCloudConfig(config: CloudDbConfig): void {
  setStored(STORAGE_KEYS.CLOUD_CONFIG, config);
}

export function exportFullDatabaseJSON(): string {
  const payload = {
    app: 'tech item',
    version: '1.0.0',
    exportedAt: new Date().toISOString(),
    projects: getProjects(),
    blogs: getBlogs(),
    feedbacks: getFeedbacks(),
    leads: getLeads(),
    transactions: getTransactions(),
    cloudConfig: getCloudConfig(),
  };
  return JSON.stringify(payload, null, 2);
}

export function importFullDatabaseJSON(jsonStr: string): boolean {
  try {
    const data = JSON.parse(jsonStr);
    if (data.projects) setStored(STORAGE_KEYS.PROJECTS, data.projects);
    if (data.blogs) setStored(STORAGE_KEYS.BLOGS, data.blogs);
    if (data.feedbacks) setStored(STORAGE_KEYS.FEEDBACKS, data.feedbacks);
    if (data.leads) setStored(STORAGE_KEYS.LEADS, data.leads);
    if (data.transactions) setStored(STORAGE_KEYS.TRANSACTIONS, data.transactions);
    return true;
  } catch (err) {
    console.error('Failed to import database JSON:', err);
    return false;
  }
}
