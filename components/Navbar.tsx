import React, { useState } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { PageView } from '../types';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass = (page: PageView) => 
    `text-sm font-medium transition-colors cursor-pointer ${
      currentPage === page ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600'
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              <Zap size={20} fill="currentColor" />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">Borang <span className="text-xs font-normal text-gray-400 uppercase ml-1">Automator</span></span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <span onClick={() => onNavigate('home')} className={navLinkClass('home')}>How it Works</span>
            <span onClick={() => onNavigate('dashboard')} className={navLinkClass('dashboard')}>Web Console</span>
            <span onClick={() => onNavigate('pricing')} className={navLinkClass('pricing')}>Pricing</span>
            <span className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors cursor-pointer">Extension</span>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700 hover:text-gray-900 cursor-pointer">Login</span>
            <button 
              onClick={() => onNavigate('dashboard')}
              className="bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow-md flex items-center gap-2"
            >
              Start Automating
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 shadow-lg absolute w-full">
          <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3 flex flex-col">
            <span onClick={() => {onNavigate('home'); setIsOpen(false)}} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md cursor-pointer">How it Works</span>
            <span onClick={() => {onNavigate('pricing'); setIsOpen(false)}} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md cursor-pointer">Pricing</span>
            <span onClick={() => {onNavigate('dashboard'); setIsOpen(false)}} className="block px-3 py-2 text-base font-medium text-primary-600 bg-primary-50 rounded-md cursor-pointer">Web Console</span>
            <div className="pt-4 mt-4 border-t border-gray-100 flex flex-col gap-3">
              <span className="block text-center px-3 py-2 text-base font-medium text-gray-700">Login</span>
              <button 
                onClick={() => {onNavigate('dashboard'); setIsOpen(false)}}
                className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg text-base font-medium"
              >
                Start Automating
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
