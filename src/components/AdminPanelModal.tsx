import React, { useState } from 'react';
import {
  X,
  Shield,
  LayoutDashboard,
  FolderGit2,
  Users,
  MessageSquare,
  CreditCard,
  Database,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  Download,
  Upload,
  Lock,
  Unlock,
  ExternalLink,
  Save,
  RefreshCw,
  Search,
} from 'lucide-react';
import {
  Project,
  BlogPost,
  CustomerLead,
  CustomerFeedback,
  PaymentTransaction,
  CloudDbConfig,
} from '../types';
import { Language, translations } from '../translations';
import { exportFullDatabaseJSON, importFullDatabaseJSON } from '../lib/storage';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  onSaveProject: (project: Project) => void;
  onDeleteProject: (id: string) => void;
  leads: CustomerLead[];
  onUpdateLeadStatus: (id: string, status: CustomerLead['status'], notes?: string) => void;
  feedbacks: CustomerFeedback[];
  onUpdateFeedbackStatus: (id: string, status: CustomerFeedback['status']) => void;
  transactions: PaymentTransaction[];
  cloudConfig: CloudDbConfig;
  onSaveCloudConfig: (config: CloudDbConfig) => void;
  language: Language;
  initialTab?: 'overview' | 'projects' | 'leads' | 'feedback' | 'billing' | 'database';
  autoOpenAddProject?: boolean;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  projects,
  onSaveProject,
  onDeleteProject,
  leads,
  onUpdateLeadStatus,
  feedbacks,
  onUpdateFeedbackStatus,
  transactions,
  cloudConfig,
  onSaveCloudConfig,
  language,
  initialTab = 'overview',
  autoOpenAddProject = false,
}) => {
  const t = translations[language];

  // Passcode authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [passcode, setPasscode] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'leads' | 'feedback' | 'billing' | 'database'>(initialTab);

  // New/Edit Project Form State
  const [isAddingProject, setIsAddingProject] = useState(autoOpenAddProject);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState<Partial<Project>>({
    title: '',
    category: 'web',
    description: '',
    longDescription: '',
    client: '',
    year: '2025',
    tags: ['React', 'TypeScript'],
    metrics: '',
    liveUrl: '',
    githubUrl: '',
    featured: true,
    previewType: 'web',
  });
  const [tagsInput, setTagsInput] = useState('React, TypeScript, Tailwind');

  // Sync tab when initialTab or autoOpenAddProject updates
  React.useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
    if (autoOpenAddProject) setIsAddingProject(true);
  }, [initialTab, autoOpenAddProject, isOpen]);

  const handleStartEdit = (p: Project) => {
    setEditingId(p.id);
    setProjectForm({
      id: p.id,
      title: p.title,
      category: p.category,
      description: p.description,
      longDescription: p.longDescription,
      client: p.client,
      year: p.year,
      tags: p.tags,
      metrics: p.metrics,
      liveUrl: p.liveUrl || '',
      githubUrl: p.githubUrl || '',
      featured: p.featured,
      previewType: p.previewType,
    });
    setTagsInput(p.tags.join(', '));
    setIsAddingProject(true);
  };

  const handleResetForm = () => {
    setIsAddingProject(false);
    setEditingId(null);
    setProjectForm({
      title: '',
      category: 'web',
      description: '',
      longDescription: '',
      client: '',
      year: '2025',
      tags: ['React', 'TypeScript'],
      metrics: '',
      liveUrl: '',
      githubUrl: '',
      featured: true,
      previewType: 'web',
    });
    setTagsInput('React, TypeScript, Tailwind');
  };

  // Cloud Config state
  const [dbProvider, setDbProvider] = useState<'local' | 'firebase' | 'mongodb'>(cloudConfig.provider);
  const [firebaseApiKey, setFirebaseApiKey] = useState(cloudConfig.firebaseConfig?.apiKey || '');
  const [firebaseProjectId, setFirebaseProjectId] = useState(cloudConfig.firebaseConfig?.projectId || '');
  const [mongoUri, setMongoUri] = useState(cloudConfig.mongoUri || '');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const totalRevenue = transactions
    .filter((tx) => tx.status === 'completed')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.description) return;

    const newProject: Project = {
      id: editingId || projectForm.id || `proj-${Date.now()}`,
      title: projectForm.title,
      category: projectForm.category || 'web',
      description: projectForm.description,
      longDescription: projectForm.longDescription || projectForm.description,
      client: projectForm.client || 'Independent Venture',
      year: projectForm.year || '2025',
      tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean),
      metrics: projectForm.metrics || 'High Performance · Production Ready',
      liveUrl: projectForm.liveUrl,
      githubUrl: projectForm.githubUrl,
      featured: projectForm.featured || false,
      previewType: projectForm.previewType || 'web',
    };

    onSaveProject(newProject);
    handleResetForm();
  };

  const handleExport = () => {
    const jsonStr = exportFullDatabaseJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `techitem-database-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importFullDatabaseJSON(content);
      if (success) {
        setImportStatus('Database successfully restored! Refreshing data...');
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      } else {
        setImportStatus('Invalid JSON format. Restore aborted.');
      }
    };
    reader.readAsText(file);
  };

  const handleSaveDbSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: CloudDbConfig = {
      provider: dbProvider,
      firebaseConfig: {
        apiKey: firebaseApiKey,
        projectId: firebaseProjectId,
        authDomain: `${firebaseProjectId}.firebaseapp.com`,
        storageBucket: `${firebaseProjectId}.appspot.com`,
        appId: '1:techitem:web',
      },
      mongoUri,
      status: 'connected',
      lastSyncedAt: new Date().toISOString(),
    };
    onSaveCloudConfig(updated);
    alert('Cloud database settings saved.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-4 sm:my-8 flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="text-base font-bold text-white flex items-center gap-2">
                <span>{t.admin.title}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/40">
                  SYSTEM READY
                </span>
              </div>
              <div className="text-xs text-slate-400">{t.admin.sub}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExport}
              title="Download full JSON snapshot"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-mono transition-colors border border-slate-700"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Backup JSON</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 bg-slate-950/60 border-b border-slate-800 flex items-center gap-2 overflow-x-auto py-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>{t.admin.overview}</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'projects'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>{t.admin.projects} ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'leads'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>{t.admin.leads} ({leads.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('feedback')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'feedback'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{t.admin.reviews} ({feedbacks.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('billing')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'billing'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>{t.admin.transactions} (${totalRevenue.toLocaleString()})</span>
          </button>

          <button
            onClick={() => setActiveTab('database')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'database'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>{t.admin.database}</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 sm:p-8 flex-1 overflow-y-auto space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-xs font-mono text-slate-500 uppercase">Inbound Leads</span>
                  <div className="text-2xl font-bold font-mono text-white tabular-nums">{leads.length}</div>
                  <div className="text-[11px] text-emerald-400">
                    {leads.filter((l) => l.status === 'new').length} New Pending Action
                  </div>
                </div>

                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-xs font-mono text-slate-500 uppercase">Total Projects</span>
                  <div className="text-2xl font-bold font-mono text-white tabular-nums">{projects.length}</div>
                  <div className="text-[11px] text-blue-400">
                    Web ({projects.filter((p) => p.category === 'web').length}) · Mobile (
                    {projects.filter((p) => p.category === 'mobile').length}) · UI/UX (
                    {projects.filter((p) => p.category === 'uiux').length})
                  </div>
                </div>

                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-xs font-mono text-slate-500 uppercase">Client Reviews</span>
                  <div className="text-2xl font-bold font-mono text-amber-400 tabular-nums">
                    {feedbacks.length}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {feedbacks.filter((f) => f.status === 'approved').length} Approved Testimonials
                  </div>
                </div>

                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-xs font-mono text-slate-500 uppercase">Total Settled Revenue</span>
                  <div className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">
                    ${totalRevenue.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {transactions.length} Verified Transactions
                  </div>
                </div>
              </div>

              {/* Quick Actions & Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
                {/* Recent Inquiries */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm font-bold text-white">Latest Customer Inquiries</span>
                    <button
                      onClick={() => setActiveTab('leads')}
                      className="text-xs text-blue-400 hover:underline"
                    >
                      View All Leads
                    </button>
                  </div>
                  {leads.slice(0, 3).map((lead) => (
                    <div
                      key={lead.id}
                      className="p-3 bg-slate-900 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-semibold text-white">{lead.name}</div>
                        <div className="text-slate-400 text-[11px]">{lead.projectType} · {lead.budget}</div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-950 text-blue-400 border border-blue-800/40 uppercase">
                        {lead.status}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Vercel & Deployment Checklist */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Deployment & Vercel Readiness</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    This project is pre-configured for instant zero-configuration deployment to <strong>vercel.app</strong>.
                  </p>
                  <div className="space-y-1.5 font-mono text-[11px] text-slate-300">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400">✓</span>
                      <span>Next-gen SPA & Edge routing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400">✓</span>
                      <span>Bilingual EN / বাংলা support included</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400">✓</span>
                      <span>SEO meta tags & Schema.org JSON-LD structured data</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400">✓</span>
                      <span>Client lead intake & review moderation system</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">Project Catalog Manager</h3>
                  <p className="text-xs text-slate-400">Add, edit, or remove showcase items from your portfolio.</p>
                </div>
                <button
                  onClick={() => setIsAddingProject(!isAddingProject)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isAddingProject ? 'Close Form' : t.admin.addNewProject}</span>
                </button>
              </div>

              {isAddingProject && (
                <form onSubmit={handleCreateProject} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="text-sm font-bold text-white">
                      {editingId ? 'Edit Delivered Project Details' : 'Create New Portfolio Project'}
                    </div>
                    {editingId && (
                      <span className="text-[11px] font-mono text-blue-400 bg-blue-950/60 px-2.5 py-0.5 rounded border border-blue-800/40">
                        Editing ID: {editingId}
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Project Title *</label>
                      <input
                        type="text"
                        required
                        value={projectForm.title}
                        onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                        placeholder="e.g. ZenPay FinTech App"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Category *</label>
                      <select
                        value={projectForm.category}
                        onChange={(e) =>
                          setProjectForm({
                            ...projectForm,
                            category: e.target.value as 'web' | 'mobile' | 'uiux',
                            previewType: e.target.value as 'web' | 'mobile' | 'uiux',
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200"
                      >
                        <option value="web">Web Application</option>
                        <option value="mobile">Mobile Application</option>
                        <option value="uiux">UI/UX Design System</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Client Name</label>
                      <input
                        type="text"
                        value={projectForm.client}
                        onChange={(e) => setProjectForm({ ...projectForm, client: e.target.value })}
                        placeholder="e.g. Acme Labs"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Year</label>
                      <input
                        type="text"
                        value={projectForm.year}
                        onChange={(e) => setProjectForm({ ...projectForm, year: e.target.value })}
                        placeholder="2025"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Key Metrics</label>
                      <input
                        type="text"
                        value={projectForm.metrics}
                        onChange={(e) => setProjectForm({ ...projectForm, metrics: e.target.value })}
                        placeholder="e.g. 50k downloads · 4.9 rating"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Tech Stack (comma separated)</label>
                    <input
                      type="text"
                      value={tagsInput}
                      onChange={(e) => setTagsInput(e.target.value)}
                      placeholder="React, TypeScript, Tailwind, Node.js"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Brief Description *</label>
                    <textarea
                      required
                      rows={2}
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                      placeholder="One or two sentences summarizing value and technical innovation..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Live Demo URL</label>
                      <input
                        type="url"
                        value={projectForm.liveUrl}
                        onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                        placeholder="https://app.techitem.dev"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">GitHub Repo URL</label>
                      <input
                        type="url"
                        value={projectForm.githubUrl}
                        onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                        placeholder="https://github.com/..."
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="px-4 py-2 bg-slate-900 text-slate-400 hover:text-white rounded-xl text-xs transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-md transition-colors"
                    >
                      {editingId ? 'Update Delivered Work' : 'Publish Project'}
                    </button>
                  </div>
                </form>
              )}

              {/* Projects Table */}
              <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-900/50 font-mono text-[11px] text-slate-400">
                      <th className="p-3">Title</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Client</th>
                      <th className="p-3">Tags</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {projects.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-900/30">
                        <td className="p-3 font-semibold text-white">{p.title}</td>
                        <td className="p-3 font-mono uppercase text-[10px] text-blue-400">
                          {p.category}
                        </td>
                        <td className="p-3 text-slate-400">{p.client}</td>
                        <td className="p-3 font-mono text-[11px] text-slate-500 truncate max-w-[150px]">
                          {p.tags.join(', ')}
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleStartEdit(p)}
                              className="p-1.5 text-blue-400 hover:text-blue-300 hover:bg-blue-950/40 rounded-lg transition-colors"
                              title="Edit Project"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => onDeleteProject(p.id)}
                              className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-lg transition-colors"
                              title="Delete Project"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: LEADS */}
          {activeTab === 'leads' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">Inbound Customer Leads & Inquiries</h3>
                <p className="text-xs text-slate-400">
                  Manage inquiries collected through the portfolio contact form.
                </p>
              </div>

              <div className="space-y-4">
                {leads.map((lead) => (
                  <div
                    key={lead.id}
                    className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                      <div>
                        <div className="text-sm font-bold text-white flex items-center gap-2">
                          <span>{lead.name}</span>
                          <span className="font-mono text-xs text-slate-500">#{lead.id}</span>
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">
                          {lead.email} {lead.phone && `· ${lead.phone}`}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono text-slate-500">{lead.createdAt}</span>
                        <select
                          value={lead.status}
                          onChange={(e) =>
                            onUpdateLeadStatus(lead.id, e.target.value as CustomerLead['status'])
                          }
                          className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-blue-400 font-mono font-medium"
                        >
                          <option value="new">NEW</option>
                          <option value="contacted">CONTACTED</option>
                          <option value="in_progress">IN PROGRESS</option>
                          <option value="completed">COMPLETED</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono text-slate-400">
                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase">Service Type</span>
                        <span className="text-slate-200">{lead.projectType}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase">Budget</span>
                        <span className="text-emerald-400 font-bold">{lead.budget}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase">Timeline</span>
                        <span className="text-slate-200">{lead.timeline}</span>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-900/60 rounded-xl text-xs text-slate-300 leading-relaxed">
                      "{lead.message}"
                    </div>

                    {lead.adminNotes && (
                      <div className="text-[11px] text-blue-400 font-mono">
                        Internal Notes: {lead.adminNotes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: REVIEWS & FEEDBACK */}
          {activeTab === 'feedback' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">Client Feedback & Review Moderation</h3>
                <p className="text-xs text-slate-400">
                  Approve or hide testimonials submitted through the feedback collection modal.
                </p>
              </div>

              <div className="space-y-4">
                {feedbacks.map((fb) => (
                  <div
                    key={fb.id}
                    className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                      <div>
                        <div className="text-sm font-bold text-white">
                          {fb.clientName} ({fb.role} · {fb.company})
                        </div>
                        <div className="text-xs text-slate-400">Project: {fb.projectTitle}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-amber-400 font-bold font-mono text-xs">
                          ★ {fb.rating}.0
                        </span>
                        <select
                          value={fb.status}
                          onChange={(e) =>
                            onUpdateFeedbackStatus(fb.id, e.target.value as CustomerFeedback['status'])
                          }
                          className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-emerald-400 font-mono uppercase"
                        >
                          <option value="approved">APPROVED</option>
                          <option value="pending">PENDING</option>
                          <option value="rejected">REJECTED</option>
                        </select>
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 italic">"{fb.feedback}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: BILLING & PAYMENTS */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">Client Payment Ledger</h3>
                  <p className="text-xs text-slate-400">
                    Record of all deposits, milestone payments, and settled invoices.
                  </p>
                </div>
                <div className="font-mono text-sm font-bold text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-800/40">
                  Total: ${totalRevenue.toLocaleString()} USD
                </div>
              </div>

              <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-900/50 font-mono text-[11px] text-slate-400">
                      <th className="p-3">Invoice</th>
                      <th className="p-3">Client</th>
                      <th className="p-3">Service Milestone</th>
                      <th className="p-3">Method</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-slate-900/30">
                        <td className="p-3 text-blue-400 font-bold">{tx.invoiceNumber}</td>
                        <td className="p-3 text-white font-sans font-medium">{tx.clientName}</td>
                        <td className="p-3 text-slate-400 font-sans">{tx.serviceType}</td>
                        <td className="p-3 uppercase text-[10px] text-slate-300">{tx.paymentMethod}</td>
                        <td className="p-3 text-emerald-400 font-bold">${tx.amount.toLocaleString()}</td>
                        <td className="p-3 text-right text-emerald-400 uppercase text-[10px]">
                          {tx.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: DATABASE & CLOUD SYNC */}
          {activeTab === 'database' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">Database & Cloud Integration</h3>
                <p className="text-xs text-slate-400">
                  Configure Firebase Firestore or MongoDB Atlas for external persistent cloud synchronization.
                </p>
              </div>

              <form onSubmit={handleSaveDbSettings} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="space-y-2">
                  <label className="block text-xs font-mono uppercase text-slate-400">Target Database Provider</label>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 text-xs text-slate-200 cursor-pointer">
                      <input
                        type="radio"
                        name="db_provider"
                        checked={dbProvider === 'local'}
                        onChange={() => setDbProvider('local')}
                      />
                      <span>Local Persistence (Browser Storage & JSON)</span>
                    </label>
                    <label className="flex items-center gap-2 text-xs text-slate-200 cursor-pointer">
                      <input
                        type="radio"
                        name="db_provider"
                        checked={dbProvider === 'firebase'}
                        onChange={() => setDbProvider('firebase')}
                      />
                      <span>Firebase Firestore</span>
                    </label>
                    <label className="flex items-center gap-2 text-xs text-slate-200 cursor-pointer">
                      <input
                        type="radio"
                        name="db_provider"
                        checked={dbProvider === 'mongodb'}
                        onChange={() => setDbProvider('mongodb')}
                      />
                      <span>MongoDB Atlas</span>
                    </label>
                  </div>
                </div>

                {dbProvider === 'firebase' && (
                  <div className="space-y-3 pt-2">
                    <div className="text-xs font-mono text-blue-400">Firebase Firestore Credentials</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Firebase Project ID</label>
                        <input
                          type="text"
                          placeholder="e.g. techitem-portfolio"
                          value={firebaseProjectId}
                          onChange={(e) => setFirebaseProjectId(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Firebase Web API Key</label>
                        <input
                          type="password"
                          placeholder="AIzaSy..."
                          value={firebaseApiKey}
                          onChange={(e) => setFirebaseApiKey(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {dbProvider === 'mongodb' && (
                  <div className="space-y-2 pt-2">
                    <div className="text-xs font-mono text-emerald-400">MongoDB Atlas Connection URI</div>
                    <input
                      type="password"
                      placeholder="mongodb+srv://admin:<password>@cluster0.mongodb.net/techitem?retryWrites=true&w=majority"
                      value={mongoUri}
                      onChange={(e) => setMongoUri(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 font-mono"
                    />
                    <div className="text-[11px] text-slate-500">
                      Store in environment variable <code className="text-slate-300">MONGODB_URI</code> on Vercel.
                    </div>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Database Configuration</span>
                  </button>
                </div>
              </form>

              {/* Backup & Restore Utility */}
              <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                <div className="text-sm font-bold text-white">Full Database JSON Backup & Restore</div>
                <p className="text-xs text-slate-400">
                  Export complete database state (projects, leads, reviews, billing) before redeploying to Vercel, or restore from a previously exported snapshot.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={handleExport}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-2 border border-slate-700"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Full Backup (JSON)</span>
                  </button>

                  <label className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-2 border border-slate-700 cursor-pointer">
                    <Upload className="w-4 h-4" />
                    <span>Restore from JSON File</span>
                    <input type="file" accept=".json" onChange={handleImportFile} className="hidden" />
                  </label>
                </div>

                {importStatus && (
                  <div className="text-xs font-mono text-emerald-400 mt-2">{importStatus}</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
