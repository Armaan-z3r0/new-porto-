export interface AssemblyData {
  id: string;
  code: string;
  tag: string;
  title: string;
  badge: string;
  badgeLink?: string;
  circuitLabel: string;
  circuitStatus: string;
  summary: string;
  details: string;
  stack: string;
  metric: string;
  mitreTechniques: string[];
  sampleLog: string;
}
