import React, { useState } from 'react';
import { X, Mail, Plus, CheckCircle2, AlertCircle } from 'lucide-react';
import { Team } from '../types';

interface InviteTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  team: Team;
  onInvite: (emails: string[]) => void;
}

export function InviteTeamModal({ isOpen, onClose, team, onInvite }: InviteTeamModalProps) {
  const [emails, setEmails] = useState<string[]>(['']);
  const [errors, setErrors] = useState<(string | null)[]>([null]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen) return null;

  const validateEmail = (email: string) => {
    if (!email) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email format';
    return null;
  };

  const handleEmailChange = (index: number, value: string) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);

    const newErrors = [...errors];
    newErrors[index] = validateEmail(value);
    setErrors(newErrors);
  };

  const handleAddEmail = () => {
    setEmails([...emails, '']);
    setErrors([...errors, null]);
  };

  const handleRemoveEmail = (index: number) => {
    const newEmails = emails.filter((_, i) => i !== index);
    const newErrors = errors.filter((_, i) => i !== index);
    setEmails(newEmails);
    setErrors(newErrors);
  };

  const handleSubmit = async () => {
    // Validate all emails
    const newErrors = emails.map(validateEmail);
    setErrors(newErrors);

    if (newErrors.some(error => error !== null)) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Filter out empty emails
      const validEmails = emails.filter(email => email.trim());
      await onInvite(validEmails);
      setShowSuccess(true);
      setTimeout(() => {
        onClose();
        setShowSuccess(false);
        setEmails(['']);
        setErrors([null]);
      }, 2000);
    } catch (error) {
      // Handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl max-w-lg w-full p-6">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>

          {showSuccess ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Invitations Sent!
              </h3>
              <p className="text-gray-600">
                Team members will receive an email invitation shortly.
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Invite {team} Members
              </h2>
              <p className="text-gray-600 mb-6">
                Add team members to collaborate on analytics setup and monitoring.
              </p>

              <div className="space-y-4">
                {emails.map((email, index) => (
                  <div key={index} className="relative">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1">
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => handleEmailChange(index, e.target.value)}
                            placeholder="colleague@company.com"
                            className={`
                              block w-full pl-10 pr-3 py-2 
                              border rounded-lg 
                              focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600
                              ${errors[index] ? 'border-red-300' : 'border-gray-300'}
                            `}
                          />
                        </div>
                        {errors[index] && (
                          <div className="absolute -bottom-5 left-0 flex items-center text-xs text-red-600">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {errors[index]}
                          </div>
                        )}
                      </div>
                      {emails.length > 1 && (
                        <button
                          onClick={() => handleRemoveEmail(index)}
                          className="p-2 text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                <button
                  onClick={handleAddEmail}
                  className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-700"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add another email
                </button>
              </div>

              <div className="mt-8 flex justify-end space-x-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`
                    inline-flex items-center px-4 py-2 rounded-lg font-medium
                    ${isSubmitting
                      ? 'bg-indigo-100 text-indigo-400 cursor-wait'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }
                  `}
                >
                  {isSubmitting ? (
                    <>
                      <Mail className="w-5 h-5 mr-2 animate-pulse" />
                      Sending...
                    </>
                  ) : (
                    'Send Invites'
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}