import { Plan, FaqItem } from './types';

export const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'For testing and small automation tasks.',
    price: { monthly: 0, yearly: 0 },
    currency: '$',
    highlight: false,
    buttonText: 'Install Extension',
    buttonVariant: 'outline',
    features: [
      { text: '100 Submissions / day', included: true },
      { text: 'Standard Speed', included: true },
      { text: 'Basic Text Randomizer', included: false },
      { text: 'Headless Mode', included: true },
      { text: 'AI Data Generator', included: false },
      { text: 'CSV Import', included: false },
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Unlimited power for power users.',
    price: { monthly: 4.99, yearly: 39 },
    currency: '$',
    highlight: true,
    buttonText: 'Go Unlimited',
    buttonVariant: 'solid',
    features: [
      { text: 'Unlimited Submissions', included: true },
      { text: 'Speed Control (0ms Delay)', included: true },
      { text: 'Advanced Randomizer', included: true },
      { text: 'Priority Server Access', included: true },
      { text: 'AI Data Generator', included: false },
      { text: 'Cloud Execution', included: false },
    ]
  },
  {
    id: 'plus',
    name: 'Premium Plus',
    description: 'AI-powered automation with cloud scheduler.',
    price: { monthly: 9.99, yearly: 89 },
    currency: '$',
    highlight: false,
    buttonText: 'Get Plus',
    buttonVariant: 'outline',
    features: [
      { text: 'Everything in Premium', included: true },
      { text: 'AI Smart Answers (OpenAI)', included: true },
      { text: 'CSV Data Import', included: true },
      { text: 'Schedule Attacks', included: true },
      { text: 'Mobile Cloud Execution', included: true },
      { text: 'Dedicated IP Proxy', included: true },
    ]
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How does it bypass Google Forms?",
    answer: "We use a 'Headless Submission' technique. We parse the form's HTML to find secret Entry IDs, then construct POST requests directly to Google's servers, bypassing the visual interface entirely."
  },
  {
    question: "Does this work on mobile?",
    answer: "Yes! With the Premium Plus plan, you can generate a 'Session Link'. Opening this link on your phone connects to our Cloud Servers which perform the automation, saving your battery and data."
  },
  {
    question: "Can I use AI to generate realistic answers?",
    answer: "Absolutely. Our AI Data Generator (Plus Plan) uses models like GPT-4o to generate context-aware, human-like responses instead of random gibberish, making your submissions undetectable."
  },
  {
    question: "Is there a limit on submissions?",
    answer: "Free plans are capped at 100/day. Premium and Plus plans offer truly unlimited submissions. We have users sending over 100,000 responses per campaign."
  },
  {
    question: "Does it support login-required forms?",
    answer: "It works if you are logged in on the browser where the extension is running, as it borrows your session cookies. However, it does not work on forms restricted to '1 Response Per User' unless you rotate accounts."
  }
];
