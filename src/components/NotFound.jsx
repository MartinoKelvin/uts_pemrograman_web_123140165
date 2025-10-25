import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0F172A] text-[#F8FAFC] p-4">
      <div className="text-center max-w-md w-full">
        <AlertCircle className="w-16 h-16 mx-auto mb-6 text-[#38BDF8]" />
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-lg mb-8 text-slate-400">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className="bg-[#1E293B] p-6 rounded-lg shadow-xl border border-slate-700 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-[#38BDF8]">What you can do:</h2>
          <ul className="space-y-4 text-left">
            <li className="flex items-center gap-3 text-slate-300">
              <RefreshCw className="w-5 h-5 text-[#38BDF8]" />
              <span>Refresh the page</span>
            </li>
            <li className="flex items-center gap-3 text-slate-300">
              <Home className="w-5 h-5 text-[#38BDF8]" />
              <span>Return to homepage</span>
            </li>
          </ul>
        </div>
        
        <div className="flex gap-4 justify-center">
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-slate-700 text-[#F8FAFC] rounded-lg hover:bg-slate-600 transition-colors"
          >
            Refresh Page
          </button>
          <Link 
            to="/" 
            className="px-6 py-2 bg-[#38BDF8] text-[#F8FAFC] rounded-lg hover:bg-sky-500 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;