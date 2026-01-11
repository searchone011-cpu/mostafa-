import React, { useState } from 'react';
import Navbar from './components/Navbar';
import PricingToggle from './components/PricingToggle';
import PricingCard from './components/PricingCard';
import Faq from './components/Faq';
import Footer from './components/Footer';
import Dashboard from './components/Builder'; // Aliased as Dashboard in the import for clarity
import { PLANS, FAQ_ITEMS } from './constants';
import { BillingInterval, PageView } from './types';
import { ArrowRight, Zap, ShieldAlert, Cpu, Bot } from 'lucide-react';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [interval, setInterval] = useState<BillingInterval>('yearly');

  const renderContent = () => {
    switch(currentPage) {
      case 'dashboard':
        return <Dashboard />;
      
      case 'pricing':
        return (
          <div className="pt-24 pb-12 sm:pt-32 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
             <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
                Unleash Unlimited Automation
              </h1>
              <p className="text-xl text-gray-500 leading-relaxed">
                Choose the power level you need. From free testing to AI-powered massive scale campaigns.
              </p>
              <PricingToggle interval={interval} onChange={setInterval} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-start">
              {PLANS.map((plan) => (
                <PricingCard key={plan.id} plan={plan} interval={interval} />
              ))}
            </div>
            <Faq items={FAQ_ITEMS} />
          </div>
        );

      case 'home':
      default:
        return (
          <div className="pt-20">
             {/* Hero Section */}
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
                <div className="text-center max-w-5xl mx-auto">
                   <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-700 text-sm font-semibold mb-8 border border-red-100">
                      <ShieldAlert size={14} />
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      New: AI Anti-Spam Bypass v2.0
                   </div>
                   <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-8 leading-tight">
                      Automate Google Forms <br />
                      <span className="text-primary-600">Like a Champion</span>
                   </h1>
                   <p className="text-xl text-gray-500 mb-10 max-w-3xl mx-auto leading-relaxed">
                      The ultimate tool to flood, automate, and populate Google & Microsoft Forms. 
                      Reverse engineered to bypass limits using headless browser technology and Cloud Execution.
                   </p>
                   <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button 
                        onClick={() => setCurrentPage('dashboard')}
                        className="px-8 py-4 bg-gray-900 text-white rounded-xl text-lg font-semibold hover:bg-black transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                      >
                         <Zap size={20} /> Launch Web Console
                      </button>
                      <button 
                        onClick={() => setCurrentPage('pricing')}
                        className="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-all"
                      >
                         Get Premium Extension
                      </button>
                   </div>
                   
                   {/* Technical Explainer Section */}
                   <div className="mt-20 p-8 bg-gray-900 rounded-2xl shadow-2xl text-white relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-32 bg-primary-600 rounded-full blur-[120px] opacity-20"></div>
                      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
                          <div className="space-y-4">
                             <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-primary-400">
                                <Cpu size={24} />
                             </div>
                             <h3 className="text-xl font-bold">1. Entry ID Scraping</h3>
                             <p className="text-gray-400 leading-relaxed">
                                Our bot parses the form's HTML DOM to locate hidden <code className="bg-gray-800 px-1 rounded text-primary-300">entry.12345</code> IDs used by Google's backend.
                             </p>
                          </div>
                          <div className="space-y-4">
                             <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-primary-400">
                                <Zap size={24} />
                             </div>
                             <h3 className="text-xl font-bold">2. Headless Injection</h3>
                             <p className="text-gray-400 leading-relaxed">
                                We bypass the UI completely. Data is sent via high-speed POST requests directly to <code className="bg-gray-800 px-1 rounded text-primary-300">/formResponse</code> endpoints.
                             </p>
                          </div>
                          <div className="space-y-4">
                             <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-primary-400">
                                <Bot size={24} />
                             </div>
                             <h3 className="text-xl font-bold">3. AI Randomization</h3>
                             <p className="text-gray-400 leading-relaxed">
                                Avoid detection with GPT-4 powered answers. The system rotates User-Agents and simulates human typing delays.
                             </p>
                          </div>
                      </div>
                   </div>

                   {/* Stats */}
                   <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
                      <div>
                        <div className="text-4xl font-black text-gray-900">10M+</div>
                        <div className="text-sm font-medium text-gray-500 uppercase tracking-wide mt-2">Forms Submitted</div>
                      </div>
                      <div>
                        <div className="text-4xl font-black text-gray-900">99.9%</div>
                        <div className="text-sm font-medium text-gray-500 uppercase tracking-wide mt-2">Uptime</div>
                      </div>
                      <div>
                        <div className="text-4xl font-black text-gray-900">0ms</div>
                        <div className="text-sm font-medium text-gray-500 uppercase tracking-wide mt-2">Latency</div>
                      </div>
                      <div>
                        <div className="text-4xl font-black text-gray-900">50k+</div>
                        <div className="text-sm font-medium text-gray-500 uppercase tracking-wide mt-2">Users</div>
                      </div>
                   </div>

                </div>
             </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-primary-100 selection:text-primary-900">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <main>
        {renderContent()}
      </main>

      {/* Only show full footer on Home and Pricing pages */}
      {currentPage !== 'dashboard' && <Footer />}
    </div>
  );
};

export default App;
