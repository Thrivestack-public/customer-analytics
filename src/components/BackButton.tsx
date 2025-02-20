import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  to: string;
  label: string;
}

export function BackButton({ to, label }: BackButtonProps) {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-8 left-8">
      <button
        onClick={() => navigate(to)}
        className="inline-flex items-center px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        <span>{label}</span>
      </button>
    </div>
  );
}