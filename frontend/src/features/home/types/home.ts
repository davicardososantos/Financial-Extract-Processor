export interface HomeStats {
  totalUsers: number;
  processedFiles: number;
  totalTransactions: number;
}

export interface HomeContent {
  title: string;
  subtitle: string;
  features: FeatureItem[];
}

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}