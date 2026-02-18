
export type IndustryCategory = 
  | 'Retail' | 'Restaurants' | 'Media' | 'Shipping' | 'Sport' 
  | 'Hotels' | 'Property' | 'IT' | 'Medicine' | 'Resources' 
  | 'Finance' | 'Airline' | 'Transportation';

export interface Business {
  id: string;
  name: string;
  basePrice: number;
  baseIncome: number;
  maintenance: number;
  category: IndustryCategory;
  risk: number; // 0 to 1
  growth: number; // base growth factor
}

export interface OwnedBusiness {
  instanceId: string; // Unique identifier for a specific branch
  businessId: string; // Reference to the business template ID
  level: number;      // Level for this specific instance
}

export interface Asset {
  id: string;
  name: string;
  type: 'stock' | 'crypto';
  price: number;
  history: number[];
  volatility: number;
  trend: number;
  owned: number;
  avgBuyPrice: number;
  sector?: IndustryCategory;
}

export interface LifestyleItem {
  id: string;
  name: string;
  price: number;
  prestige: number;
  multiplier: number;
  image?: string;
}

export interface OwnedLifestyle {
  id: string;
  count: number;
}

export type EconomicCycle = 'Boom' | 'Normal' | 'Recession' | 'Recovery';

export interface PlayerState {
  username?: string;
  money: number;
  totalEarned: number;
  xp: number;
  level: number;
  clickPower: number;
  clickLevel: number;
  ownedBusinesses: OwnedBusiness[];
  assets: Asset[];
  inventory: OwnedLifestyle[];
  economicCycle: EconomicCycle;
  lastSave: number;
  isPaused: boolean;
}

export enum GameTab {
  DASHBOARD = 'dashboard',
  INVENTORY = 'inventory',
  INDUSTRIES = 'industries',
  STOCKS = 'stocks',
  CRYPTO = 'crypto',
  SHOP = 'shop',
  INDUSTRY_DETAIL = 'industry_detail'
}
