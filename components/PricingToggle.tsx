import React from 'react';
import { BillingInterval } from '../types';

interface PricingToggleProps {
  interval: BillingInterval;
  onChange: (interval: BillingInterval) => void;
}

const PricingToggle: React.FC<PricingToggleProps> = ({ interval, onChange }) => {
  return (
    <div className="flex justify-center items-center mt-8 mb-12">
      <div className="relative flex items-center bg-gray-100 p-1 rounded-full border border-gray-200">
        <button
          onClick={() => onChange('monthly')}
          className={`relative z-10 px-6 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
            interval === 'monthly'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => onChange('yearly')}
          className={`relative z-10 px-6 py-2 text-sm font-medium rounded-full transition-all duration-300 flex items-center gap-2 ${
            interval === 'yearly'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Yearly
          <span className="hidden sm:inline-block text-[10px] font-bold text-primary-700 bg-primary-100 px-2 py-0.5 rounded-full uppercase tracking-wide">
            Save 20%
          </span>
        </button>
      </div>
    </div>
  );
};

export default PricingToggle;
