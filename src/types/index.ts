export type PeriodKey = '1day' | '7days' | '30days';

export interface ProjectData {
  id: string;
  title: string;
  location: string;
  statusBadge: string;
  statusType: 'completed' | 'in-progress' | 'program';
  statusDate?: string;
  isFeatured?: boolean;
  costTL: number; // In Turkish Liras
  indicators: {
    label: string;
    value: string;
    subLabel?: string;
  }[];
  note?: string;
  detailsNote?: string;
  imageSrc: string;
  imageAlt: string;
}

export interface SourceItem {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  url: string;
}

export interface EnvironmentalMetric {
  id: string;
  stat: string;
  headline: string;
  detail: string;
  sourceLabel: string;
}
