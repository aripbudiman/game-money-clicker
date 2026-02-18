
export const formatCurrency = (amount: number): string => {
  if (amount >= 1000000000000) return `$${(amount / 1000000000000).toFixed(2)}T`;
  if (amount >= 1000000000) return `$${(amount / 1000000000).toFixed(2)}B`;
  if (amount >= 1000000) return `$${(amount / 1000000).toFixed(2)}M`;
  if (amount >= 1000) return `$${(amount / 1000).toFixed(1)}K`;
  return `$${amount.toFixed(2)}`;
};

export const formatFullCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const calculateNextPrice = (basePrice: number, currentCount: number): number => {
  // Price for a NEW branch depends on how many branches of this type you already have
  return Math.floor(basePrice * Math.pow(1.15, currentCount));
};

export const calculateUpgradePrice = (basePrice: number, currentLevel: number): number => {
  // Cost to upgrade a specific branch instance
  return Math.floor(basePrice * 0.5 * Math.pow(1.8, currentLevel + 1));
};

export const calculateIncome = (baseIncome: number, level: number = 0): number => {
  // Income for a SINGLE instance based on its specific level
  return baseIncome * (1 + level * 0.5);
};
