/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  initStorage,
  getProjects,
  saveProject,
  deleteProject,
  getBlogs,
  likeBlog,
  getFeedbacks,
  saveFeedback,
  updateFeedbackStatus,
  getLeads,
  saveLead,
  updateLeadStatus,
  getTransactions,
  saveTransaction,
  getCloudConfig,
  saveCloudConfig,
} from './lib/storage';
import {
  Project,
  BlogPost,
  CustomerLead,
  CustomerFeedback,
  PaymentTransaction,
  CloudDbConfig,
} from './types';
import { Language, translations } from './translations';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { ServicesSection } from './components/ServicesSection';
import { CustomerFeedbackSection } from './components/CustomerFeedbackSection';
import { BlogSection } from './components/BlogSection';
import { ContactSection } from './components/ContactSection';
import { PaymentModal } from './components/PaymentModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { Footer } from './components/Footer';

export default function App() {
  const [language, setLanguage] = useState<Language>('bn'); // default Bengali as prompt requested in Bengali!
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [feedbacks, setFeedbacks] = useState<CustomerFeedback[]>([]);
  const [leads, setLeads] = useState<CustomerLead[]>([]);
  const [transactions, setTransactions] = useState<PaymentTransaction[]>([]);
  const [cloudConfig, setCloudConfig] = useState<CloudDbConfig>({
    provider: 'local',
    status: 'connected',
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminInitialTab, setAdminInitialTab] = useState<'overview' | 'projects' | 'leads' | 'feedback' | 'billing' | 'database'>('overview');
  const [autoOpenAddProject, setAutoOpenAddProject] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  // Initialize storage once on mount
  useEffect(() => {
    initStorage();
    setProjects(getProjects());
    setBlogs(getBlogs());
    setFeedbacks(getFeedbacks());
    setLeads(getLeads());
    setTransactions(getTransactions());
    setCloudConfig(getCloudConfig());
  }, []);

  // Language toggle
  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'bn' : 'en'));
  };

  // Project handlers
  const handleSaveProject = (project: Project) => {
    saveProject(project);
    setProjects(getProjects());
  };

  const handleDeleteProject = (id: string) => {
    deleteProject(id);
    setProjects(getProjects());
  };

  // Blog like handler
  const handleLikeBlog = (id: string) => {
    likeBlog(id);
    setBlogs(getBlogs());
  };

  // Customer Feedback handlers
  const handleAddFeedback = (feedback: CustomerFeedback) => {
    saveFeedback(feedback);
    setFeedbacks(getFeedbacks());
  };

  const handleUpdateFeedbackStatus = (id: string, status: CustomerFeedback['status']) => {
    updateFeedbackStatus(id, status);
    setFeedbacks(getFeedbacks());
  };

  // Customer Lead handlers
  const handleAddLead = (lead: CustomerLead) => {
    saveLead(lead);
    setLeads(getLeads());
  };

  const handleUpdateLeadStatus = (
    id: string,
    status: CustomerLead['status'],
    notes?: string
  ) => {
    updateLeadStatus(id, status, notes);
    setLeads(getLeads());
  };

  // Payment transaction handler
  const handlePaymentComplete = (tx: PaymentTransaction) => {
    saveTransaction(tx);
    setTransactions(getTransactions());
  };

  // Cloud config handler
  const handleSaveCloudConfig = (config: CloudDbConfig) => {
    saveCloudConfig(config);
    setCloudConfig(config);
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToWorks = () => {
    const el = document.getElementById('works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceFromCard = (serviceName: string) => {
    scrollToContact();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Bar Navigation */}
      <Navbar
        language={language}
        onToggleLanguage={handleToggleLanguage}
        onOpenAdmin={() => {
          setAdminInitialTab('overview');
          setAutoOpenAddProject(false);
          setIsAdminOpen(true);
        }}
        onOpenPayment={() => setIsPaymentOpen(true)}
        onOpenContact={scrollToContact}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          language={language}
          onExplore={scrollToWorks}
          onRequestQuote={scrollToContact}
        />

        {/* Selected Projects Showcase (Web, Mobile, UI/UX) */}
        <ProjectsSection
          projects={projects}
          language={language}
          onOpenAddProject={() => {
            setAdminInitialTab('projects');
            setAutoOpenAddProject(true);
            setIsAdminOpen(true);
          }}
        />

        {/* Services & Core Capabilities */}
        <ServicesSection
          language={language}
          onSelectService={handleSelectServiceFromCard}
        />

        {/* Customer Feedback & Client Reviews */}
        <CustomerFeedbackSection
          feedbacks={feedbacks}
          onAddFeedback={handleAddFeedback}
          language={language}
        />

        {/* Blog & Technical Insights */}
        <BlogSection
          blogs={blogs}
          onLikeBlog={handleLikeBlog}
          language={language}
        />

        {/* Lead Collection & Inbound Contact */}
        <ContactSection onAddLead={handleAddLead} language={language} />
      </main>

      {/* Global Footer */}
      <Footer
        language={language}
        onOpenAdmin={() => {
          setAdminInitialTab('overview');
          setAutoOpenAddProject(false);
          setIsAdminOpen(true);
        }}
        onOpenPayment={() => setIsPaymentOpen(true)}
      />

      {/* Modals & Portals */}
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        onPaymentComplete={handlePaymentComplete}
        language={language}
      />

      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => {
          setIsAdminOpen(false);
          setAutoOpenAddProject(false);
        }}
        projects={projects}
        onSaveProject={handleSaveProject}
        onDeleteProject={handleDeleteProject}
        leads={leads}
        onUpdateLeadStatus={handleUpdateLeadStatus}
        feedbacks={feedbacks}
        onUpdateFeedbackStatus={handleUpdateFeedbackStatus}
        transactions={transactions}
        cloudConfig={cloudConfig}
        onSaveCloudConfig={handleSaveCloudConfig}
        language={language}
        initialTab={adminInitialTab}
        autoOpenAddProject={autoOpenAddProject}
      />
    </div>
  );
}
