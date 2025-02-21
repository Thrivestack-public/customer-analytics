import {
  Building2,
  Code2,
  Users,
  UserPlus,
  Gauge,
  Sparkles,
  Bell
} from 'lucide-react';
import { Step } from '../types/setup';

export const SETUP_STEPS: Step[] = [
  {
    id: 1,
    title: 'Product Setup',
    icon: Building2,
    path: '',
  },
  {
    id: 2,
    title: 'Track Page Visits',
    icon: Code2,
    path: 'track-page-visits',
  },
  {
    id: 3,
    title: 'Track Signups & Identity',
    icon: Users,
    path: 'track-signups',
  },
  {
    id: 4,
    title: 'Account add User',
    icon: Building2,
    path: 'account-add-user',
  },
  {
    id: 5,
    title: 'Track Logins',
    icon: UserPlus,
    path: 'track-login',
  },
  {
    id: 6,
    title: 'Track Features',
    icon: Gauge,
    path: 'track-features',
  },
  {
    id: 7,
    title: 'Other SaaS Events',
    icon: Sparkles,
    path: 'other-events',
  },
  {
    id: 8,
    title: 'Setup Alerts',
    icon: Bell,
    path: 'setup-alerts',
  },
];