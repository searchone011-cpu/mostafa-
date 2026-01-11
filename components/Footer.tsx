import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 mt-24 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
               <div className="w-6 h-6 bg-primary-600 rounded-md flex items-center justify-center text-white font-bold text-sm">
                  B
                </div>
                <span className="font-bold text-lg text-gray-900">Borang</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              The easiest way to build forms and collect data. Beautiful, powerful, and simple.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">Product</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-500 hover:text-primary-600">Features</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-primary-600">Pricing</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-primary-600">Integrations</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-primary-600">Changelog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-500 hover:text-primary-600">Documentation</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-primary-600">API Reference</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-primary-600">Blog</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-primary-600">Community</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-500 hover:text-primary-600">About</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-primary-600">Careers</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-primary-600">Legal</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-primary-600">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Borang Inc. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-gray-600 text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-gray-600 text-sm">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
