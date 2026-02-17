
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

export const calculateNextPrice = (basePrice: number, count: number, level: number = 0): number => {
  // Base price increases with quantity and upgrade level
  return Math.floor(basePrice * Math.pow(1.15, count) * Math.pow(1.5, level));
};

export const calculateIncome = (baseIncome: number, count: number, level: number = 0): number => {
  // Income increases with count and upgrade level
  return baseIncome * count * (1 + level * 0.5);
};
