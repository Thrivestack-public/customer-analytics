import { ReactNode } from 'react';

export interface Step {
  id: number;
  title: string;
  icon: ReactNode;
  path: string;
}

export interface CodeSnippet {
  title: string;
  code: string;
}