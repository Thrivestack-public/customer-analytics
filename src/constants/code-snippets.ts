import { CodeSnippet } from '../types/setup';

export const CODE_SNIPPETS: Record<string, CodeSnippet> = {
  TRACKING_SCRIPT: {
    title: 'Base Tracking Script',
    code: `<script>
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://cdn.thrivestack.io/ts.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','tsLayer','TS-XXXXX');
</script>`,
  },
  FEATURE_TRACKING: {
    title: 'Feature Tracking Code',
    code: `// Track feature usage
thrivestack.track('feature_used', {
  companyId: 'company_123', // Required
  featureName: 'export_report',
  userId: 'user_456',
  userRole: 'admin',
  planTier: 'enterprise',
  success: true,
  duration: 45, // seconds
  customAttributes: {
    reportType: 'analytics',
    exportFormat: 'csv',
    rowCount: 1000
  }
});`,
  },
  // Add other code snippets...
};