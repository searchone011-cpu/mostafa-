import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FaqItem } from '../types';

interface FaqProps {
  items: FaqItem[];
}

const Faq: React.FC<FaqProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto mt-24 px-4 sm:px-6">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl bg-white overflow-hidden transition-all duration-200 hover:border-gray-300"
          >
            <button
              className="w-full flex justify-between items-center p-5 text-left focus:outline-none"
              onClick={() => toggleIndex(index)}
            >
              <span className="font-semibold text-gray-900">{item.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                  openIndex === index ? 'transform rotate-180' : ''
                }`}
              />
            </button>
            <div
              className={`transition-all duration-300 ease-in-out ${
                openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="p-5 pt-0 text-gray-600 text-sm leading-relaxed border-t border-transparent">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
