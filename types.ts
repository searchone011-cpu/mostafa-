export type BillingInterval = 'monthly' | 'yearly';
export type PageView = 'home' | 'pricing' | 'dashboard';

export interface PlanFeature {
  text: string;
  included: boolean;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
  };
  currency: string;
  features: PlanFeature[];
  highlight: boolean;
  buttonText: string;
  buttonVariant: 'outline' | 'solid';
}

export interface FaqItem {
  question: string;
  answer: string;
}

// Automation Dashboard Types
export interface AutomationLog {
  id: number;
  timestamp: string;
  status: 'pending' | 'success' | 'failed';
  message: string;
}

export interface SpamField {
  id: string;
  entryId: string; // e.g. "entry.123456"
  valueType: 'fixed' | 'random_text' | 'random_number' | 'random_email' | 'random_option';
  customValue?: string;
}

export interface AutomationConfig {
  targetUrl: string;
  submissionCount: number;
  delayMs: number;
  useRandomizer: boolean;
  useAiGeneration: boolean; // Premium Plus feature
  csvImport?: File | null; // Premium Plus feature
  fields: SpamField[];
}

export interface FormField {
  id: string | number;
  label: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  googleEntryId: string;
  options?: string[];
}

export interface FormConfig {
  title?: string;
  description?: string;
  googleFormActionUrl?: string;
  whatsappNumber?: string;
  primaryColor?: string;
  buttonText?: string;
  fields: FormField[];
}
