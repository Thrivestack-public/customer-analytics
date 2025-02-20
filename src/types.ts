export type Team = 'Marketing teams' | 'Product teams' | 'Sales teams' | 'RevOps teams' | 'Engineering teams' | 'Customer Success teams';
export type SetupStatus = 'not_started' | 'in_progress' | 'completed' | 'coming_soon';
export type AcquisitionMode = 'product-led' | 'sales-led';
export type TrendType = 'up' | 'down' | 'flat';

export interface Section {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  trend: TrendType;
  change: string;
  description: string;
}