import React from 'react';
import { CheckCircle2, Minus } from 'lucide-react';
import { Plan, BillingInterval } from '../types';

interface PricingCardProps {
  plan: Plan;
  interval: BillingInterval;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, interval }) => {
  const price = interval === 'monthly' ? plan.price.monthly : plan.price.yearly;
  const isYearly = interval === 'yearly';
  
  // Calculate display logic
  const displayPrice = price === 0 ? 'Free' : `${plan.currency}${price}`;
  const period = price === 0 ? '' : isYearly ? '/year' : '/month';

  return (
    <div
      className={`relative flex flex-col p-6 sm:p-8 rounded-2xl transition-all duration-300 ${
        plan.highlight
          ? 'bg-white border-2 border-primary-500 shadow-xl scale-100 md:scale-105 z-10'
          : 'bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300'
      }`}
    >
      {plan.highlight && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            Most Popular
          </span>
        </div>
      )}

      <div className="mb-5">
        <h3 className={`text-lg font-bold ${plan.highlight ? 'text-primary-600' : 'text-gray-900'}`}>
          {plan.name}
        </h3>
        <p className="mt-2 text-sm text-gray-500 leading-relaxed min-h-[40px]">
          {plan.description}
        </p>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline">
          <span className="text-4xl font-extrabold text-gray-900 tracking-tight">
            {displayPrice}
          </span>
          <span className="ml-1 text-gray-500 font-medium">{period}</span>
        </div>
        {isYearly && price > 0 && (
          <p className="text-xs text-primary-600 font-medium mt-1">
            Billed yearly (${plan.price.monthly * 12} value)
          </p>
        )}
      </div>

      <button
        className={`w-full py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          plan.highlight
            ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-200 focus:ring-primary-500'
            : 'bg-gray-50 text-gray-900 hover:bg-gray-100 border border-gray-200 focus:ring-gray-500'
        }`}
      >
        {plan.buttonText}
      </button>

      <div className="mt-8 flex-1">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
          Features
        </p>
        <ul className="space-y-3">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-start">
              {feature.included ? (
                <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mr-3 ${plan.highlight ? 'text-primary-500' : 'text-gray-400'}`} />
              ) : (
                <Minus className="w-5 h-5 flex-shrink-0 mr-3 text-gray-300" />
              )}
              <span className={`text-sm ${feature.included ? 'text-gray-600' : 'text-gray-400'}`}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PricingCard;
