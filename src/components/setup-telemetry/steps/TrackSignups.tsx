import React from 'react';
import { Users, Sparkles } from 'lucide-react';
import { CodeBlock } from '../CodeBlock';

const SIGNUP_TRACKING = `// Track user signup
thrivestack.track('user_signup', {
  userId: 'new_user_id',
  email: 'user@example.com',
  source: 'landing_page',
  referralChannel: 'linkedin_ad'
});`;

const USER_IDENTIFY = `// Identify user
thrivestack.identify('user_id', {
  email: 'user@example.com',
  firstName: 'John',
  lastName: 'Doe',
  role: 'developer',
  plan: 'pro'
});`;

export function TrackSignups() {
  return (
    <div className="space-y-6">
      <div className="flex items-start space-x-3">
        <div className="p-2 bg-indigo-100 rounded-lg">
          <Users className="w-6 h-6 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-1">
            Track Signups & Identity
          </h2>
          <p className="text-gray-600">
            Track user signups and resolve their identity.
          </p>
        </div>
      </div>

      <CodeBlock code={SIGNUP_TRACKING} title="Signup Tracking Code" />
      <CodeBlock code={USER_IDENTIFY} title="User Identity Code" />

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            Tracking signups and resolving identity helps you:
            <ul className="list-disc ml-4 mt-2 space-y-1">
              <li>Understand your acquisition funnel</li>
              <li>Connect pre and post-signup behavior</li>
              <li>Enrich user profiles automatically</li>
              <li>Enable personalized analytics</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}