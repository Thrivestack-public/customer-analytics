import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  Link2, 
  Briefcase, 
  ArrowRight, 
  LinkedinIcon, 
  Check, 
  X, 
  Pencil, 
  Upload, 
  AlertCircle,
  ArrowLeft
} from 'lucide-react';
import { PricingModal } from '../components/PricingModal';

interface EnrichmentData {
  person: {
    name: string;
    title: string;
    location: string;
    linkedin: string;
    avatar: string;
  };
  company: {
    name: string;
    website: string;
    industry: string;
    description: string;
    logo: string;
  };
}

export function EnrichmentResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const initialEnrichment: EnrichmentData = location.state?.enrichment;
  
  const [enrichment, setEnrichment] = useState<EnrichmentData | null>(null);
  const [editMode, setEditMode] = useState<'person' | 'company' | null>(null);
  const [formData, setFormData] = useState<EnrichmentData | null>(null);
  const [logoError, setLogoError] = useState(false);
  const [showPricing, setShowPricing] = useState(false);

  useEffect(() => {
    if (!email || !initialEnrichment) {
      navigate('/signup');
      return;
    }
    setEnrichment(initialEnrichment);
    setFormData(initialEnrichment);
  }, [email, initialEnrichment, navigate]);

  if (!enrichment || !formData) return null;

  const handleInputChange = (section: 'person' | 'company', field: string, value: string) => {
    setFormData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      };
    });
  };

  const handleLogoChange = (url: string) => {
    setLogoError(false);
    handleInputChange('company', 'logo', url);
  };

  const validateLogo = (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  };

  const handleSave = async (section: 'person' | 'company') => {
    if (section === 'company') {
      const isValidLogo = await validateLogo(formData.company.logo);
      if (!isValidLogo) {
        setLogoError(true);
        return;
      }
    }
    setEnrichment(formData);
    setEditMode(null);
    setLogoError(false);
  };

  const handleCancel = (section: 'person' | 'company') => {
    setFormData(enrichment);
    setEditMode(null);
    setLogoError(false);
  };

  const handleContinue = () => {
    setShowPricing(true);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate('/verify-email')}
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span>Back to Verification</span>
        </button>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Please verify your profile
        </h1>
        <p className="text-gray-600">
          We found some information about you and your company. This will be used to create an account for your Organization.
          Please verify and update if needed.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Personal Information Card */}
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
            {editMode !== 'person' ? (
              <button
                onClick={() => setEditMode('person')}
                className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-700"
              >
                <Pencil className="w-4 h-4 mr-1" />
                Edit
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleSave('person')}
                  className="inline-flex items-center text-sm text-green-600 hover:text-green-700"
                >
                  <Check className="w-4 h-4 mr-1" />
                  Save
                </button>
                <button
                  onClick={() => handleCancel('person')}
                  className="inline-flex items-center text-sm text-red-600 hover:text-red-700"
                >
                  <X className="w-4 h-4 mr-1" />
                  Cancel
                </button>
              </div>
            )}
          </div>

          {editMode === 'person' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.person.name}
                  onChange={(e) => handleInputChange('person', 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={formData.person.title}
                  onChange={(e) => handleInputChange('person', 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={formData.person.location}
                  onChange={(e) => handleInputChange('person', 'location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
                <input
                  type="text"
                  value={formData.person.linkedin}
                  onChange={(e) => handleInputChange('person', 'linkedin', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                />
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-start space-x-4 mb-6">
                <img
                  src={enrichment.person.avatar}
                  alt={enrichment.person.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {enrichment.person.name}
                  </h3>
                  <p className="text-gray-600">{email}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-600">
                  <Briefcase className="w-5 h-5" />
                  <span>{enrichment.person.title}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span>{enrichment.person.location}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <LinkedinIcon className="w-5 h-5 text-[#0A66C2]" />
                  <a
                    href={enrichment.person.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0A66C2] hover:underline"
                  >
                    View LinkedIn Profile
                  </a>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Company Information Card */}
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Company Information</h2>
            {editMode !== 'company' ? (
              <button
                onClick={() => setEditMode('company')}
                className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-700"
              >
                <Pencil className="w-4 h-4 mr-1" />
                Edit
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleSave('company')}
                  className="inline-flex items-center text-sm text-green-600 hover:text-green-700"
                >
                  <Check className="w-4 h-4 mr-1" />
                  Save
                </button>
                <button
                  onClick={() => handleCancel('company')}
                  className="inline-flex items-center text-sm text-red-600 hover:text-red-700"
                >
                  <X className="w-4 h-4 mr-1" />
                  Cancel
                </button>
              </div>
            )}
          </div>

          {editMode === 'company' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Logo</label>
                <div className="flex items-start space-x-4 mb-2">
                  <div className="relative">
                    <img
                      src={formData.company.logo}
                      alt="Preview"
                      className="w-16 h-16 rounded-lg object-contain bg-white p-2 border border-gray-200"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/64x64?text=Logo';
                      }}
                    />
                    {logoError && (
                      <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                        <AlertCircle className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={formData.company.logo}
                      onChange={(e) => handleLogoChange(e.target.value)}
                      placeholder="Enter logo URL"
                      className={`
                        w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600
                        ${logoError ? 'border-red-500' : 'border-gray-300'}
                      `}
                    />
                    {logoError && (
                      <p className="mt-1 text-sm text-red-600">
                        Please enter a valid image URL
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input
                  type="text"
                  value={formData.company.name}
                  onChange={(e) => handleInputChange('company', 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                <input
                  type="text"
                  value={formData.company.industry}
                  onChange={(e) => handleInputChange('company', 'industry', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                <input
                  type="text"
                  value={formData.company.website}
                  onChange={(e) => handleInputChange('company', 'website', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.company.description}
                  onChange={(e) => handleInputChange('company', 'description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                />
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-start space-x-4 mb-6">
                <img
                  src={enrichment.company.logo}
                  alt={enrichment.company.name}
                  className="w-16 h-16 rounded-lg object-contain bg-white p-2"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {enrichment.company.name}
                  </h3>
                  <p className="text-gray-600">{enrichment.company.industry}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Link2 className="w-5 h-5 text-gray-600" />
                  <a
                    href={enrichment.company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline"
                  >
                    {enrichment.company.website.replace('https://', '')}
                  </a>
                </div>
                <div className="flex items-start space-x-3 text-gray-600">
                  <Building2 className="w-5 h-5 flex-shrink-0" />
                  <p>{enrichment.company.description}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <button
        onClick={handleContinue}
        className="fixed-cta"
      >
        <span>Confirm & Continue</span>
        <ArrowRight className="w-5 h-5" />
      </button>

      <PricingModal
        isOpen={showPricing}
        onClose={() => setShowPricing(false)}
        onUpgrade={() => {
          setShowPricing(false);
          navigate('/customize');
        }}
      />
    </div>
  );
}