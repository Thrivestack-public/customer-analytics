import React from 'react';
import { Code2, Terminal } from 'lucide-react';
import { CodeBlock } from '../CodeBlock';

export function TrackPageVisits() {
  return (
    <div className="space-y-6">
      <div className="flex items-start space-x-3">
        <div className="p-2 bg-indigo-100 rounded-lg">
          <Code2 className="w-6 h-6 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-1">
            Track Page Visits
          </h2>
          <p className="text-gray-600">
            Add this script to your website to start tracking page visits.
          </p>
        </div>
      </div>

      <CodeBlock code={TRACKING_SCRIPT} title="Base Tracking Script" />

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Terminal className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <div className="text-sm text-amber-800">
            <strong>Important:</strong> Place the script in the <code>&lt;head&gt;</code> section 
            before any other scripts to ensure proper tracking.
          </div>
        </div>
      </div>
    </div>
  );
}
const TRACKING_SCRIPT = {
  title: 'Base Tracking Script',
  code: `<script>
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://cdn.thrivestack.io/ts.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','tsLayer','TS-XXXXX');
</script>`
};