
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import {
  Briefcase, TrendingUp, Bitcoin, Zap,
  ArrowUpRight, ArrowDownRight, LayoutDashboard,
  Trash2, Loader2, ChevronRight,
  ArrowLeft, Building2, LineChart as LineIcon,
  Globe, Layers, Percent, Play, Pause, Save, Activity,
  ShoppingBag, Package, LogOut, User, ArrowRightCircle,
  Car, Box, ArrowUp, DollarSign as DollarIcon
} from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area
} from 'recharts';

import {
  INITIAL_BUSINESSES, INITIAL_STOCKS, INITIAL_CRYPTO, INITIAL_LIFESTYLE
} from './constants';
import {
  Asset, PlayerState, GameTab,
  IndustryCategory, OwnedBusiness, EconomicCycle, OwnedLifestyle, Difficulty
} from './types';
import {
  formatCurrency, formatFullCurrency, calculateNextPrice, calculateIncome, calculateUpgradePrice
} from './utils/format';

const FB_URL = "https://mysql-ccf25-default-rtdb.asia-southeast1.firebasedatabase.app/";
const SESSION_KEY = 'money_empire_active_user';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316', '#6366f1', '#14b8a6', '#facc15', '#64748b', '#2dd4bf'];

interface Particle {
  id: number;
  x: number;
  y: number;
  value: string;
}

const App: React.FC = () => {
  const [activeUser, setActiveUser] = useState<string | null>(localStorage.getItem(SESSION_KEY));
  const [loginInput, setLoginInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [activeTab, setActiveTab] = useState<GameTab>(GameTab.DASHBOARD);
  const [inventorySubTab, setInventorySubTab] = useState<'companies' | 'portfolio' | 'items'>('companies');
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryCategory | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [tradeQuantities, setTradeQuantities] = useState<Record<string, string>>({});
  const [loginDifficulty, setLoginDifficulty] = useState<Difficulty>('Normal');

  const defaultState: PlayerState = {
    money: 100,
    totalEarned: 0,
    xp: 0,
    level: 1,
    difficulty: 'Easy',
    clickPower: 1,
    clickLevel: 1,
    ownedBusinesses: [],
    assets: [...INITIAL_STOCKS, ...INITIAL_CRYPTO],
    inventory: [],
    economicCycle: 'Normal',
    lastSave: Date.now(),
    isPaused: false
  };

  const [state, setState] = useState<PlayerState>(defaultState);
  // Ref to always hold the latest state for the auto-save timer
  const stateRef = useRef<PlayerState>(state);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const loadProgress = async (username: string, manualDifficulty?: Difficulty) => {
    setLoading(true);
    try {
      const response = await fetch(`${FB_URL}players/${username.toLowerCase()}.json`);
      const data = await response.json();

      let finalDifficulty: Difficulty = 'Normal';
      if (manualDifficulty) {
        finalDifficulty = manualDifficulty;
      } else if (data && data.difficulty) {
        finalDifficulty = data.difficulty;
      } else {
        finalDifficulty = 'Easy';
      }

      if (data) {
        const loadedState = {
          ...defaultState,
          ...data,
          difficulty: finalDifficulty,
          username,
          assets: [...INITIAL_STOCKS, ...INITIAL_CRYPTO].map(a => {
            const saved = data.assets?.find((s: any) => s.id === a.id);
            return saved ? { ...a, owned: saved.owned || 0, avgBuyPrice: saved.avgBuyPrice || 0, history: saved.history || a.history, price: saved.price || a.price } : a;
          }),
          inventory: data.inventory || []
        };
        setState(loadedState);
        stateRef.current = loadedState;

        // If we manually set a difficulty or the cloud was missing it, force a sync soon
        if (manualDifficulty || !data.difficulty) {
          saveToCloud(loadedState);
        }
      } else {
        const newState = { ...defaultState, username, difficulty: finalDifficulty };
        setState(newState);
        stateRef.current = newState;
        saveToCloud(newState);
      }
      setActiveUser(username);
      localStorage.setItem(SESSION_KEY, username);
    } catch (e) {
      console.error("Failed to load progress", e);
      alert("Error connecting to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginInput.trim()) return;
    loadProgress(loginInput.trim(), loginDifficulty);
  };

  const handleLogout = async () => {
    setSyncing(true);
    await saveToCloud(state);
    setActiveUser(null);
    localStorage.removeItem(SESSION_KEY);
    setState(defaultState);
    stateRef.current = defaultState;
    setSyncing(false);
  };

  useEffect(() => {
    if (activeUser && !state.username) {
      loadProgress(activeUser);
    }
  }, []);

  const saveToCloud = async (overrideState?: PlayerState) => {
    const user = activeUser || stateRef.current.username;
    if (!user) return;

    setSyncing(true);
    const stateToSave = overrideState || stateRef.current;
    try {
      await fetch(`${FB_URL}players/${user.toLowerCase()}.json`, {
        method: 'PUT',
        body: JSON.stringify({ ...stateToSave, lastSave: Date.now() })
      });
    } catch (e) {
      console.error("Failed to save to cloud", e);
    } finally {
      setTimeout(() => setSyncing(false), 500);
    }
  };

  // Synergy and Multiplier calculations
  const synergyBonus = useMemo(() => {
    let bonus = 1;
    const categories = new Set(state.ownedBusinesses.map(ob => INITIAL_BUSINESSES.find(b => b.id === ob.businessId)?.category));
    if (categories.has('Retail') && categories.has('Shipping')) bonus += 0.1;
    if (categories.has('Finance') && categories.has('Property')) bonus += 0.15;
    if (categories.has('Airline') && categories.has('Hotels')) bonus += 0.2;
    if (categories.has('IT') && categories.has('Medicine')) bonus += 0.25;
    if (categories.has('Transportation') && categories.has('IT')) bonus += 0.1;
    return bonus;
  }, [state.ownedBusinesses]);

  const cycleMultiplier = useMemo(() => {
    switch (state.economicCycle) {
      case 'Boom': return 1.5;
      case 'Recession': return 0.6;
      case 'Recovery': return 1.1;
      default: return 1.0;
    }
  }, [state.economicCycle]);

  const lifestyleMultiplier = useMemo(() => {
    return state.inventory.reduce((acc, ol) => {
      const item = INITIAL_LIFESTYLE.find(i => i.id === ol.id);
      if (!item) return acc;
      return acc + (item.multiplier - 1) * ol.count;
    }, 1);
  }, [state.inventory]);

  const globalMultiplier = lifestyleMultiplier * synergyBonus * cycleMultiplier;

  const businessesIncome = state.ownedBusinesses.reduce((acc, ob) => {
    const bus = INITIAL_BUSINESSES.find(b => b.id === ob.businessId);
    if (!bus) return acc;
    return acc + calculateIncome(bus.baseIncome, ob.level);
  }, 0) * globalMultiplier;

  const maintenance = state.ownedBusinesses.reduce((acc, ob) => {
    const bus = INITIAL_BUSINESSES.find(b => b.id === ob.businessId);
    if (!bus) return acc;
    return acc + bus.maintenance;
  }, 0);

  const netIncome = Math.max(0, businessesIncome - maintenance);

  const calculateBusinessResale = (busId: string, level: number) => {
    const bus = INITIAL_BUSINESSES.find(b => b.id === busId);
    if (!bus) return 0;
    let totalSpentOnUpgrades = 0;
    for (let i = 0; i < level; i++) {
      totalSpentOnUpgrades += calculateUpgradePrice(bus.basePrice, i);
    }
    return (bus.basePrice * 0.7) + (totalSpentOnUpgrades * 0.5);
  };

  const businessValue = state.ownedBusinesses.reduce((acc, ob) => {
    return acc + calculateBusinessResale(ob.businessId, ob.level);
  }, 0);

  const stockValue = state.assets.reduce((acc, a) => a.type === 'stock' ? acc + (a.owned * a.price) : acc, 0);
  const cryptoValue = state.assets.reduce((acc, a) => a.type === 'crypto' ? acc + (a.owned * a.price) : acc, 0);
  const inventoryValue = state.inventory.reduce((acc, ol) => {
    const item = INITIAL_LIFESTYLE.find(i => i.id === ol.id);
    return acc + (item ? item.price * ol.count : 0);
  }, 0);

  const totalNetWorth = state.money + businessValue + stockValue + cryptoValue + inventoryValue;

  const industryStats = useMemo(() => {
    const categories: IndustryCategory[] = ['Retail', 'Restaurants', 'Media', 'Shipping', 'Sport', 'Hotels', 'Property', 'IT', 'Medicine', 'Resources', 'Finance', 'Airline', 'Transportation'];
    return categories.map(cat => {
      const ownedInCat = state.ownedBusinesses.filter(ob => INITIAL_BUSINESSES.find(b => b.id === ob.businessId)?.category === cat);
      const income = ownedInCat.reduce((acc, ob) => {
        const bus = INITIAL_BUSINESSES.find(b => b.id === ob.businessId);
        return acc + (bus ? calculateIncome(bus.baseIncome, ob.level) : 0);
      }, 0) * globalMultiplier;
      const count = ownedInCat.length;

      const instances = ownedInCat.map(ob => {
        const bus = INITIAL_BUSINESSES.find(b => b.id === ob.businessId);
        return {
          instanceId: ob.instanceId,
          businessId: ob.businessId,
          name: bus?.name || 'Unknown Entity',
          level: ob.level,
          income: bus ? calculateIncome(bus.baseIncome, ob.level) * globalMultiplier : 0,
          upgradePrice: bus ? calculateUpgradePrice(bus.basePrice, ob.level) : 0,
          resaleValue: calculateBusinessResale(ob.businessId, ob.level)
        };
      });

      return { name: cat, income, count, instances };
    }).filter(i => i.count > 0 || activeTab === GameTab.INDUSTRIES);
  }, [state.ownedBusinesses, globalMultiplier, activeTab]);

  // Income loop
  useEffect(() => {
    const intervals: Record<string, number> = {
      'Easy': 1000,
      'Normal': 3000,
      'Hard': 5000,
      'Very Hard': 7000
    };
    const intervalTime = intervals[state.difficulty] || 1000;

    const interval = setInterval(() => {
      if (state.isPaused || !activeUser) return;
      setState(prev => {
        const incomePerSec = businessesIncome - maintenance;
        const multiplier = intervalTime / 1000;
        const added = Math.max(0, incomePerSec * multiplier);
        const newXp = prev.xp + added * 0.0001 + 0.01 * multiplier;
        const newLevel = Math.floor(Math.sqrt(newXp / 10)) + 1;
        return {
          ...prev,
          money: prev.money + added,
          totalEarned: prev.totalEarned + added,
          xp: newXp,
          level: newLevel > prev.level ? newLevel : prev.level
        };
      });
    }, intervalTime);
    return () => clearInterval(interval);
  }, [businessesIncome, maintenance, state.isPaused, activeUser, state.difficulty]);

  // Market loop
  useEffect(() => {
    const interval = setInterval(() => {
      if (state.isPaused || !activeUser) return;
      setState(prev => ({
        ...prev,
        assets: prev.assets.map(a => {
          const change = (Math.random() - 0.5 + a.trend) * a.volatility * (prev.economicCycle === 'Recession' ? 2 : 1);
          const newPrice = Math.max(0.01, a.price * (1 + change));
          return { ...a, price: newPrice, history: [...a.history, newPrice].slice(-30) };
        }),
        economicCycle: Math.random() < 0.01 ? (['Normal', 'Boom', 'Recession', 'Recovery'][Math.floor(Math.random() * 4)] as EconomicCycle) : prev.economicCycle
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, [state.isPaused, activeUser]);

  // IMPROVED AUTO-SAVE: Triggers every 25 seconds without resetting on state change
  useEffect(() => {
    if (!activeUser) return;

    const interval = setInterval(() => {
      saveToCloud();
    }, 25000); // 25 seconds auto-save frequency

    const handleBeforeUnload = () => {
      saveToCloud();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [activeUser]);

  const togglePause = () => {
    setState(prev => ({ ...prev, isPaused: !prev.isPaused }));
  };

  const buyBusiness = (businessId: string) => {
    const bus = INITIAL_BUSINESSES.find(b => b.id === businessId);
    if (!bus) return;
    setState(prev => {
      const currentCountOfType = prev.ownedBusinesses.filter(ob => ob.businessId === businessId).length;
      const cost = calculateNextPrice(bus.basePrice, currentCountOfType);
      if (prev.money < cost) return prev;

      const newInstance: OwnedBusiness = {
        instanceId: `inst_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        businessId: businessId,
        level: 0
      };

      return {
        ...prev,
        money: prev.money - cost,
        ownedBusinesses: [...prev.ownedBusinesses, newInstance]
      };
    });
  };

  const sellBusinessInstance = (instanceId: string) => {
    setState(prev => {
      const instance = prev.ownedBusinesses.find(ob => ob.instanceId === instanceId);
      if (!instance) return prev;
      const resaleValue = calculateBusinessResale(instance.businessId, instance.level);
      return {
        ...prev,
        money: prev.money + resaleValue,
        ownedBusinesses: prev.ownedBusinesses.filter(ob => ob.instanceId !== instanceId)
      };
    });
  };

  const upgradeBusiness = (instanceId: string) => {
    setState(prev => {
      const instance = prev.ownedBusinesses.find(ob => ob.instanceId === instanceId);
      if (!instance || instance.level >= 10) return prev;
      const bus = INITIAL_BUSINESSES.find(b => b.id === instance.businessId);
      if (!bus) return prev;
      const cost = calculateUpgradePrice(bus.basePrice, instance.level);
      if (prev.money < cost) return prev;

      return {
        ...prev,
        money: prev.money - cost,
        ownedBusinesses: prev.ownedBusinesses.map(ob => ob.instanceId === instanceId ? { ...ob, level: ob.level + 1 } : ob)
      };
    });
  };

  const buyAsset = (id: string, customQty?: number) => {
    const qtyInput = customQty !== undefined ? customQty.toString() : (tradeQuantities[id] || '0');
    const qty = parseFloat(qtyInput);
    if (isNaN(qty) || qty <= 0) return;
    setState(prev => {
      const asset = prev.assets.find(a => a.id === id);
      if (!asset) return prev;
      const cost = asset.price * qty;
      if (prev.money < cost) return prev;
      return {
        ...prev,
        money: prev.money - cost,
        assets: prev.assets.map(a => a.id === id ? { ...a, owned: a.owned + qty, avgBuyPrice: (a.avgBuyPrice * a.owned + cost) / (a.owned + qty) } : a)
      };
    });
    if (customQty === undefined) setTradeQuantities(prev => ({ ...prev, [id]: '' }));
  };

  const sellAsset = (id: string, customQty?: number) => {
    const qtyInput = customQty !== undefined ? customQty.toString() : (tradeQuantities[id] || '0');
    const qty = parseFloat(qtyInput);
    if (isNaN(qty) || qty <= 0) return;
    setState(prev => {
      const asset = prev.assets.find(a => a.id === id);
      if (!asset || asset.owned < qty) return prev;
      return { ...prev, money: prev.money + asset.price * qty, assets: prev.assets.map(a => a.id === id ? { ...a, owned: a.owned - qty } : a) };
    });
    if (customQty === undefined) setTradeQuantities(prev => ({ ...prev, [id]: '' }));
  };

  const upgradeClickPower = () => {
    if (state.clickLevel >= 20) return;
    const cost = Math.floor(200 * Math.pow(1.8, state.clickLevel - 1));
    if (state.money < cost) return;

    setState(prev => ({
      ...prev,
      money: prev.money - cost,
      clickLevel: prev.clickLevel + 1,
      clickPower: prev.clickPower + (prev.clickLevel < 10 ? 2 : 5)
    }));
  };

  const buyShopItem = (id: string) => {
    const item = INITIAL_LIFESTYLE.find(l => l.id === id);
    if (!item) return;
    setState(prev => {
      if (prev.money < item.price) return prev;
      let newInventory = [...prev.inventory];
      let existing = newInventory.find(i => i.id === id);
      if (existing) {
        newInventory = newInventory.map(i => i.id === id ? { ...i, count: i.count + 1 } : i);
      } else {
        newInventory.push({ id, count: 1 });
      }
      return { ...prev, money: prev.money - item.price, inventory: newInventory };
    });
  };

  const sellShopItem = (id: string) => {
    const item = INITIAL_LIFESTYLE.find(l => l.id === id);
    if (!item) return;
    setState(prev => {
      let newInventory = [...prev.inventory];
      let existingIndex = newInventory.findIndex(i => i.id === id);
      if (existingIndex === -1 || newInventory[existingIndex].count <= 0) return prev;

      const count = newInventory[existingIndex].count;
      if (count === 1) {
        newInventory.splice(existingIndex, 1);
      } else {
        newInventory[existingIndex].count -= 1;
      }

      const resaleValue = item.price * 0.8;
      return { ...prev, money: prev.money + resaleValue, inventory: newInventory };
    });
  };

  const manualClick = (e: React.MouseEvent) => {
    if (state.isPaused || !activeUser) return;
    const gain = state.clickPower * globalMultiplier;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newParticle = { id: Date.now(), x, y, value: `+${formatCurrency(gain)}` };
    setParticles(prev => [...prev, newParticle]);
    setTimeout(() => setParticles(prev => prev.filter(p => p.id !== newParticle.id)), 1000);
    setState(prev => ({ ...prev, money: prev.money + gain, totalEarned: prev.totalEarned + gain, xp: prev.xp + 0.1 }));
  };

  if (!activeUser) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-1/2 h-1/2 bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-[120px]" />

        <div className="w-full max-w-lg glass-panel rounded-[3rem] p-12 border border-white/5 shadow-[0_0_100px_rgba(16,185,129,0.05)] relative z-10 space-y-10">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-emerald-500 rounded-3xl mx-auto flex items-center justify-center shadow-emerald-500/20 shadow-xl mb-6">
              <TrendingUp className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter leading-none">Empire <span className="text-emerald-500">Launchpad</span></h1>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Login to resume your global domination</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Imperial Identifier</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-6 flex items-center text-slate-500 group-focus-within:text-emerald-500 transition-colors">
                  <User size={20} />
                </div>
                <input
                  type="text"
                  placeholder="Enter Username"
                  value={loginInput}
                  onChange={(e) => setLoginInput(e.target.value)}
                  className="w-full bg-black/50 border border-white/5 rounded-2xl py-5 pl-16 pr-6 text-white font-bold tracking-tight focus:border-emerald-500/50 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Campaign Difficulty</label>
              <div className="grid grid-cols-2 gap-3">
                {(['Easy', 'Normal', 'Hard', 'Very Hard'] as Difficulty[]).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setLoginDifficulty(d)}
                    className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${loginDifficulty === d ? 'bg-emerald-500 text-black border-emerald-400' : 'bg-white/5 text-slate-500 border-white/5 hover:border-white/10'}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !loginInput.trim()}
              className="w-full py-5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-white/5 disabled:text-slate-700 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-emerald-900/10 flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <>Initiate Empire <ArrowRightCircle size={20} /></>}
            </button>
          </form>

          <div className="text-center">
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Progress is auto-synced every 5s</p>
          </div>
        </div>
      </div>
    );
  }

  const NavButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
    <button onClick={onClick} className={`flex flex-col items-center gap-1 flex-1 py-2 rounded-2xl transition-all duration-300 ${active ? 'text-emerald-400 bg-emerald-400/10' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'}`}>
      {React.cloneElement(icon as React.ReactElement, { className: 'w-6 h-6' })}
      <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 font-sans pb-32 overflow-x-hidden">
      <header className="sticky top-0 z-30 glass-panel border-b border-white/5 px-6 py-4 shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-emerald-500 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.3)]"><TrendingUp className="w-6 h-6 text-white" /></div>
            <div>
              <h1 className="text-xl font-black tracking-tighter bg-gradient-to-r from-emerald-400 to-emerald-200 bg-clip-text text-transparent uppercase italic">Empire 3.0</h1>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-bold uppercase tracking-widest">
                <User size={12} className="text-emerald-500" />
                {state.username}
                <span className="w-1 h-1 bg-slate-800 rounded-full mx-1" />
                Level {state.level}
                <span className="w-1 h-1 bg-slate-800 rounded-full mx-1" />
                <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase ${state.difficulty === 'Easy' ? 'bg-blue-500/20 text-blue-400' :
                  state.difficulty === 'Normal' ? 'bg-emerald-500/20 text-emerald-400' :
                    state.difficulty === 'Hard' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-red-500/20 text-red-400'
                  }`}>
                  {state.difficulty}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <div className="hidden sm:block text-right">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Liquid Assets</div>
              <div className="text-xl font-mono font-black text-emerald-400 tracking-tighter">{formatFullCurrency(state.money)}</div>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={togglePause} title="Pause Game" className={`p-3 rounded-xl transition-all border ${state.isPaused ? 'bg-amber-500/20 text-amber-500 border-amber-500/30' : 'bg-white/5 text-slate-500 border-white/5 hover:text-white hover:bg-white/10'}`}>
                {state.isPaused ? <Play className="w-5 h-5 fill-current" /> : <Pause className="w-5 h-5 fill-current" />}
              </button>
              <button onClick={() => saveToCloud()} title="Force Save" className="p-3 bg-white/5 border border-white/5 rounded-xl text-slate-500 hover:text-white hover:bg-white/10 transition-all">
                {syncing ? <Loader2 className="w-5 h-5 animate-spin text-emerald-500" /> : <Save className="w-5 h-5" />}
              </button>
              <button onClick={handleLogout} title="Save & Logout" className="p-3 bg-white/5 border border-white/5 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {state.isPaused && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center">
          <div className="bg-[#0f0f0f] p-10 rounded-[3rem] border border-amber-500/30 shadow-[0_0_100px_rgba(245,158,11,0.1)] flex flex-col items-center gap-6 animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center shadow-amber-500/20 shadow-lg animate-pulse">
              <Pause className="w-10 h-10 text-white fill-current" />
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">Operations Halted</h2>
              <button onClick={togglePause} className="w-full mt-4 py-4 bg-amber-500 hover:bg-amber-400 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-lg active:scale-95">Resume Growth</button>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto p-4 md:p-8 space-y-12 animate-in fade-in duration-500">

        {/* DASHBOARD TAB */}
        {activeTab === GameTab.DASHBOARD && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-panel rounded-3xl p-5 border-l-4 border-l-blue-500 shadow-xl flex items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400"><Globe size={24} /></div>
                <div><p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Status</p><p className="text-xl font-black italic uppercase tracking-tighter text-blue-400">{state.economicCycle}</p></div>
              </div>
              <div className="glass-panel rounded-3xl p-5 border-l-4 border-l-purple-500 shadow-xl flex items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400"><Percent size={24} /></div>
                <div><p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Growth Factor</p><p className="text-xl font-black italic uppercase tracking-tighter text-white">x{globalMultiplier.toFixed(2)}</p></div>
              </div>
              <div className="glass-panel rounded-3xl p-5 border-l-4 border-l-emerald-500 shadow-xl flex items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400"><Activity size={24} /></div>
                <div><p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Net Revenue /s</p><p className="text-xl font-black italic uppercase tracking-tighter text-emerald-400">+{formatCurrency(netIncome)}</p></div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-8">
              <div className={`glass-panel rounded-[4rem] p-20 w-full max-w-5xl flex flex-col items-center justify-center text-center group transition-all duration-700 border-2 border-white/5 relative shadow-[0_0_100px_rgba(16,185,129,0.05)] overflow-hidden min-h-[550px] ${state.isPaused ? 'cursor-not-allowed grayscale' : 'hover:border-emerald-500/40 hover:shadow-emerald-500/10 cursor-pointer active:scale-[0.985]'}`} onClick={manualClick}>
                {!state.isPaused && <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 via-transparent to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">{particles.map(p => (<span key={p.id} className="particle text-emerald-400 font-mono italic text-xl" style={{ left: p.x, top: p.y }}>{p.value}</span>))}</div>
                <div className="relative z-10 flex flex-col items-center gap-10">
                  <div className="w-64 h-64 sm:w-80 sm:h-80 glass-panel rounded-full flex items-center justify-center shadow-2xl border-4 border-white/10 group-hover:border-emerald-500/50 group-hover:scale-110 transition-all duration-500">
                    <Zap className="w-28 h-28 sm:w-40 sm:h-40 text-emerald-500 fill-emerald-500/20 drop-shadow-[0_0_40px_rgba(16,185,129,0.8)]" />
                  </div>
                  <div className="space-y-6"><p className="text-4xl sm:text-6xl font-black text-emerald-400 italic tracking-tighter">+{formatCurrency(state.clickPower * globalMultiplier)}</p><h3 className="text-4xl font-black text-white italic tracking-tighter uppercase">Mint Capital</h3></div>
                </div>
              </div>
              <div className="w-full max-w-lg glass-panel rounded-[2.5rem] p-8 border border-white/5 shadow-2xl">
                <button onClick={upgradeClickPower} disabled={state.money < Math.floor(200 * Math.pow(1.8, state.clickLevel - 1)) || state.clickLevel >= 20 || state.isPaused} className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${state.money >= Math.floor(200 * Math.pow(1.8, state.clickLevel - 1)) && state.clickLevel < 20 && !state.isPaused ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/10' : 'bg-white/5 text-slate-700 cursor-not-allowed'}`}>
                  Upgrade Click: {formatCurrency(Math.floor(200 * Math.pow(1.8, state.clickLevel - 1)))}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* INVENTORY TAB */}
        {activeTab === GameTab.INVENTORY && (
          <div className="space-y-12 animate-in slide-in-from-top duration-600">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
              <div className="space-y-2">
                <p className="text-xs font-black text-emerald-500 uppercase tracking-[0.3em]">Imperial Archives</p>
                <h2 className="text-6xl font-black text-white italic uppercase tracking-tighter leading-none">Net <span className="text-emerald-500">Valuation</span></h2>
              </div>
              <div className="glass-panel p-4 rounded-3xl flex gap-2">
                {[
                  { id: 'companies', label: 'My Company', icon: <Building2 size={16} /> },
                  { id: 'portfolio', label: 'Portfolio', icon: <LineIcon size={16} /> },
                  { id: 'items', label: 'My Items', icon: <Box size={16} /> }
                ].map(sub => (
                  <button key={sub.id} onClick={() => setInventorySubTab(sub.id as any)} className={`px-5 py-2.5 rounded-2xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${inventorySubTab === sub.id ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'text-slate-500 hover:bg-white/5'}`}>
                    {sub.icon} {sub.label}
                  </button>
                ))}
              </div>
            </div>

            {inventorySubTab === 'companies' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {industryStats.map(stat => (
                  <div key={stat.name} className="glass-panel p-8 rounded-[3rem] border border-white/5 space-y-6">
                    <div className="flex justify-between items-center border-b border-white/5 pb-4">
                      <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter flex items-center gap-3"><Layers className="text-emerald-500" /> {stat.name} Holdings</h3>
                      <div className="text-right">
                        <div className="text-[9px] font-black text-slate-500 uppercase">Sector Flow</div>
                        <div className="text-emerald-400 font-mono font-black">+{formatCurrency(stat.income)}/s</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      {stat.instances.map((inst, idx) => (
                        <div key={inst.instanceId} className="p-6 bg-white/5 rounded-[2.5rem] border border-white/5 group hover:bg-emerald-500/5 transition-all">
                          <div className="flex justify-between items-start mb-4">
                            <div className="space-y-1">
                              <div className="text-lg font-black text-white uppercase tracking-tighter group-hover:text-emerald-400">{inst.name}</div>
                              <div className="flex items-center gap-2">
                                <span className="text-[9px] font-black bg-emerald-500 text-black px-2 py-0.5 rounded-full uppercase">Lv. {inst.level}</span>
                                <span className="text-[9px] font-bold text-slate-500 uppercase italic">Branch #{idx + 1}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-black text-emerald-400 font-mono">+{formatCurrency(inst.income)}/s</div>
                              <div className="text-[9px] font-bold text-slate-600 uppercase">Profit Flow</div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3 mb-2">
                            <div className="px-4 py-2 bg-black/20 rounded-xl border border-white/5">
                              <div className="text-[8px] font-black text-slate-500 uppercase mb-0.5">Upgrade Cost</div>
                              <div className="text-xs font-black text-white">{formatCurrency(inst.upgradePrice)}</div>
                            </div>
                            <div className="px-4 py-2 bg-black/20 rounded-xl border border-white/5">
                              <div className="text-[8px] font-black text-slate-500 uppercase mb-0.5">Sell Value</div>
                              <div className="text-xs font-black text-amber-500">{formatCurrency(inst.resaleValue)}</div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <button
                              onClick={() => upgradeBusiness(inst.instanceId)}
                              disabled={state.money < inst.upgradePrice || inst.level >= 10 || state.isPaused}
                              className={`py-3 rounded-2xl flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest transition-all ${state.money >= inst.upgradePrice && inst.level < 10 && !state.isPaused ? 'bg-emerald-500 text-black shadow-lg hover:bg-emerald-400' : 'bg-white/5 text-slate-700 cursor-not-allowed'}`}
                            >
                              <ArrowUp size={12} /> {inst.level >= 10 ? 'MAX' : 'Upgrade'}
                            </button>
                            <button
                              onClick={() => sellBusinessInstance(inst.instanceId)}
                              disabled={state.isPaused}
                              className="py-3 rounded-2xl flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest transition-all bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white"
                            >
                              <Trash2 size={12} /> Liquidate
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                {industryStats.length === 0 && (
                  <div className="col-span-2 py-20 text-center space-y-4 glass-panel rounded-[3rem] opacity-50">
                    <Building2 size={48} className="mx-auto text-slate-800" />
                    <p className="text-slate-500 font-black uppercase tracking-widest italic">No corporate assets acquired yet.</p>
                  </div>
                )}
              </div>
            )}

            {inventorySubTab === 'portfolio' && (
              <div className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="glass-panel p-6 rounded-[2.5rem] text-center border-b-2 border-b-yellow-500 shadow-xl">
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Stock Holdings</div>
                    <div className="text-3xl font-black text-white font-mono">{formatCurrency(stockValue)}</div>
                  </div>
                  <div className="glass-panel p-6 rounded-[2.5rem] text-center border-b-2 border-b-orange-500 shadow-xl">
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Crypto Reserves</div>
                    <div className="text-3xl font-black text-white font-mono">{formatCurrency(cryptoValue)}</div>
                  </div>
                  <div className="glass-panel p-6 rounded-[2.5rem] text-center border-b-2 border-b-emerald-500 shadow-xl">
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Market Value</div>
                    <div className="text-3xl font-black text-emerald-400 font-mono">{formatCurrency(stockValue + cryptoValue)}</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {state.assets.filter(a => a.owned > 0).map(asset => {
                    const profit = (asset.price - asset.avgBuyPrice) * asset.owned;
                    const change = ((asset.price - asset.avgBuyPrice) / (asset.avgBuyPrice || 1)) * 100;
                    return (
                      <div key={asset.id} className="glass-panel p-8 rounded-[3rem] border border-white/5 flex items-center justify-between shadow-xl group">
                        <div className="flex items-center gap-5">
                          <div className={`p-4 rounded-2xl ${asset.type === 'stock' ? 'bg-blue-500/10 text-blue-400' : 'bg-orange-500/10 text-orange-400'}`}>
                            {asset.type === 'stock' ? <TrendingUp size={24} /> : <Bitcoin size={24} />}
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-xl font-black text-white italic uppercase tracking-tighter leading-none">{asset.name}</h4>
                            <p className="text-[10px] font-bold text-slate-500 uppercase">{asset.owned.toFixed(4)} Owned @ {formatCurrency(asset.avgBuyPrice)}</p>
                            <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={() => sellAsset(asset.id, asset.owned)} className="px-3 py-1.5 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg text-[8px] font-black uppercase hover:bg-red-500 hover:text-white">Sell All</button>
                              <button onClick={() => buyAsset(asset.id, 1)} className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-[8px] font-black uppercase hover:bg-emerald-500 hover:text-black">Buy +1</button>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-black text-white font-mono">{formatCurrency(asset.price * asset.owned)}</div>
                          <div className={`text-[10px] font-black uppercase flex items-center justify-end gap-1 ${profit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {profit >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />} {formatCurrency(Math.abs(profit))} ({Math.abs(change).toFixed(2)}%)
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {state.assets.filter(a => a.owned > 0).length === 0 && (
                    <div className="col-span-2 py-20 text-center space-y-4 glass-panel rounded-[3rem] opacity-50 border-white/5">
                      <LineIcon size={48} className="mx-auto text-slate-800" />
                      <p className="text-slate-500 font-black uppercase tracking-widest italic">Trading floor is quiet. No holdings detected.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {inventorySubTab === 'items' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {state.inventory.map(ol => {
                  const item = INITIAL_LIFESTYLE.find(i => i.id === ol.id);
                  if (!item) return null;
                  return (
                    <div key={item.id} className="glass-panel rounded-[3rem] overflow-hidden border border-white/5 group shadow-xl transition-all hover:border-emerald-500/20 flex flex-col justify-between">
                      <div>
                        <div className="h-40 relative">
                          <img src={item.image} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt={item.name} />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                          <div className="absolute top-4 right-4 bg-emerald-500 text-black px-3 py-1 rounded-full text-[10px] font-black uppercase shadow-lg">x{ol.count} Owned</div>
                        </div>
                        <div className="p-6 space-y-4">
                          <h4 className="text-lg font-black text-white italic uppercase tracking-tighter">{item.name}</h4>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="p-2.5 bg-white/5 rounded-xl border border-white/5 flex flex-col items-center">
                              <span className="text-[8px] text-slate-500 font-black uppercase mb-1">Prestige</span>
                              <span className="text-xs font-black text-white font-mono">+{item.prestige * ol.count}</span>
                            </div>
                            <div className="p-2.5 bg-white/5 rounded-xl border border-white/5 flex flex-col items-center">
                              <span className="text-[8px] text-slate-500 font-black uppercase mb-1">Boost</span>
                              <span className="text-xs font-black text-emerald-400 font-mono">x{item.multiplier.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-6 pt-0">
                        <button
                          onClick={() => sellShopItem(item.id)}
                          disabled={state.isPaused}
                          className="w-full py-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2"
                        >
                          <Trash2 size={12} /> Sell Unit: {formatCurrency(item.price * 0.8)}
                        </button>
                      </div>
                    </div>
                  );
                })}
                {state.inventory.length === 0 && (
                  <div className="col-span-3 py-20 text-center space-y-4 glass-panel rounded-[3rem] opacity-50 border-white/5">
                    <ShoppingBag size={48} className="mx-auto text-slate-800" />
                    <p className="text-slate-500 font-black uppercase tracking-widest italic">The trophy case is empty. Visit the Elite Shop.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* INDUSTRIES TAB */}
        {activeTab === GameTab.INDUSTRIES && (
          <div className="space-y-12 animate-in slide-in-from-bottom duration-500">
            <div className="space-y-2">
              <p className="text-xs font-black text-emerald-500 uppercase tracking-[0.3em]">Corporate Expansion</p>
              <h2 className="text-6xl font-black text-white italic uppercase tracking-tighter leading-none">Global <span className="text-emerald-500">Sectors</span></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {['Retail', 'Restaurants', 'Media', 'Shipping', 'Sport', 'Hotels', 'Property', 'IT', 'Medicine', 'Resources', 'Finance', 'Airline', 'Transportation'].map((cat) => {
                const stat = industryStats.find(s => s.name === cat) || { income: 0, count: 0, instances: [] };
                return (
                  <div key={cat} className="glass-panel p-8 rounded-[2.5rem] hover:border-emerald-500/50 transition-all cursor-pointer group shadow-xl" onClick={() => { setSelectedIndustry(cat as IndustryCategory); setActiveTab(GameTab.INDUSTRY_DETAIL); }}>
                    <div className="flex items-center justify-between mb-8">
                      <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-emerald-500 transition-all">
                        {cat === 'Transportation' ? <Car className="w-8 h-8 text-emerald-400 group-hover:text-black transition-colors" /> : <Layers className="w-8 h-8 text-emerald-400 group-hover:text-black transition-colors" />}
                      </div>
                      <ChevronRight className="w-6 h-6 text-slate-700 group-hover:text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">{cat}</h3>
                    <div className="flex justify-between items-end mt-10">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Units: {stat.count}</span>
                      <span className="text-emerald-400 font-black font-mono">+{formatCurrency(stat.income)}/s</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Market Tabs */}
        {(activeTab === GameTab.STOCKS || activeTab === GameTab.CRYPTO) && (
          <div className="space-y-10 animate-in slide-in-from-right duration-500">
            <div className="space-y-2">
              <p className="text-xs font-black text-emerald-500 uppercase tracking-[0.3em]">Capital Markets</p>
              <h2 className="text-5xl font-black text-white italic uppercase tracking-tighter">{activeTab === GameTab.STOCKS ? 'Equity' : 'Liquidity'} <span className="text-emerald-500">Terminal</span></h2>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {state.assets.filter(a => a.type === (activeTab === GameTab.STOCKS ? 'stock' : 'crypto')).map(asset => {
                const change = ((asset.price - asset.history[0]) / (asset.history[0] || 1)) * 100;
                return (
                  <div key={asset.id} className="glass-panel p-8 rounded-[3rem] grid grid-cols-1 lg:grid-cols-4 gap-10 items-center border border-white/5 hover:border-emerald-500/20 transition-all shadow-xl">
                    <div className="space-y-3">
                      <div className="flex items-center gap-4">
                        <div className={`p-4 rounded-2xl ${activeTab === GameTab.STOCKS ? 'bg-blue-500/10 text-blue-400' : 'bg-orange-500/10 text-orange-400'}`}>
                          {activeTab === GameTab.STOCKS ? <TrendingUp size={24} /> : <Bitcoin size={24} />}
                        </div>
                        <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase">{asset.name}</h3>
                      </div>
                      <div className="text-4xl font-black font-mono text-white tracking-tighter">{formatFullCurrency(asset.price)}</div>
                      <div className={`text-[10px] font-black uppercase flex items-center gap-2 ${change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {change >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} {Math.abs(change).toFixed(2)}%
                      </div>
                    </div>
                    <div className="h-32 px-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={asset.history.map((h, i) => ({ val: h, i }))}>
                          <Area type="monotone" dataKey="val" stroke={change >= 0 ? '#10b981' : '#ef4444'} fill={change >= 0 ? '#10b981' : '#ef4444'} fillOpacity={0.1} strokeWidth={4} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="bg-black/30 rounded-[2.5rem] p-6 space-y-4 border border-white/5 shadow-inner">
                      <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase"><span>Holdings</span><span className="text-white">{asset.owned.toFixed(2)}</span></div>
                      <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase"><span>Equity</span><span className="text-emerald-400">{formatCurrency(asset.owned * asset.price)}</span></div>
                    </div>
                    <div className="space-y-4">
                      <input type="number" placeholder="Qty" value={tradeQuantities[asset.id] || ''} onChange={(e) => setTradeQuantities(prev => ({ ...prev, [asset.id]: e.target.value }))} className="w-full bg-black/50 border border-white/10 rounded-2xl py-4 px-6 text-white font-mono text-sm" />
                      <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => buyAsset(asset.id)} disabled={state.isPaused} className="py-4 rounded-2xl font-black uppercase text-xs bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg">Buy</button>
                        <button onClick={() => sellAsset(asset.id)} disabled={state.isPaused} className="py-4 rounded-2xl font-black uppercase text-xs bg-white/5 border border-white/10 hover:bg-red-500/20 text-red-400">Sell</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === GameTab.SHOP && (
          <div className="space-y-12 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
              <div className="space-y-2">
                <p className="text-xs font-black text-emerald-500 uppercase tracking-[0.3em]">Premier Marketplace</p>
                <h2 className="text-5xl font-black text-white italic uppercase tracking-tighter">Elite <span className="text-emerald-500">Acquisitions</span></h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {INITIAL_LIFESTYLE.map(item => {
                const invItem = state.inventory.find(i => i.id === item.id);
                const count = invItem ? invItem.count : 0;
                return (
                  <div key={item.id} className="glass-panel rounded-[4rem] p-0 relative overflow-hidden transition-all duration-500 flex flex-col justify-between min-h-[550px] border-2 border-white/5 shadow-2xl hover:border-emerald-500/20 group">
                    <div className="h-60 relative overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                      {count > 0 && <div className="absolute top-4 left-4 px-4 py-2 bg-emerald-500 rounded-2xl shadow-xl border border-emerald-400/30 flex items-center gap-2"><Package size={14} className="text-black" /><span className="text-xs font-black text-black uppercase tracking-widest">Holdings: {count}</span></div>}
                      <div className="absolute bottom-4 left-6"><h3 className="text-2xl font-black text-white italic tracking-tighter uppercase leading-none">{item.name}</h3></div>
                    </div>
                    <div className="p-8 space-y-6 flex-grow flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 bg-white/5 rounded-2xl border border-white/5"><div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Prestige</div><div className="text-white font-black font-mono">+{item.prestige}</div></div>
                          <div className="p-3 bg-white/5 rounded-2xl border border-white/5"><div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Boost</div><div className="text-emerald-400 font-black font-mono">x{item.multiplier.toFixed(2)}</div></div>
                        </div>
                        <div className="text-3xl font-mono font-black text-white tracking-tighter flex items-center gap-3">{formatCurrency(item.price)}</div>
                      </div>
                      <div className="space-y-3">
                        <button onClick={() => buyShopItem(item.id)} disabled={state.money < item.price || state.isPaused} className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all ${state.money >= item.price && !state.isPaused ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg active:scale-95' : 'bg-white/5 text-slate-700 cursor-not-allowed'}`}>
                          <ShoppingBag size={16} /> Purchase Asset
                        </button>
                        {count > 0 && (
                          <button onClick={() => sellShopItem(item.id)} disabled={state.isPaused} className="w-full py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 transition-all bg-white/5 border border-white/10 text-red-400 hover:bg-red-500/10 active:scale-95">
                            <DollarIcon size={14} /> Sell (Resale 80%): {formatCurrency(item.price * 0.8)}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === GameTab.INDUSTRY_DETAIL && selectedIndustry && (
          <div className="space-y-10 animate-in fade-in slide-in-from-left duration-500">
            <button onClick={() => setActiveTab(GameTab.INDUSTRIES)} className="flex items-center gap-3 text-slate-500 hover:text-white transition-all font-black uppercase text-[10px] tracking-widest bg-white/5 px-6 py-3 rounded-2xl"><ArrowLeft size={16} /> Return to Sectors</button>
            <h2 className="text-5xl font-black text-white italic uppercase">{selectedIndustry} <span className="text-emerald-500">Opportunities</span></h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {INITIAL_BUSINESSES.filter(b => b.category === selectedIndustry).map(bus => {
                const currentCountOfType = state.ownedBusinesses.filter(ob => ob.businessId === bus.id).length;
                const nextPrice = calculateNextPrice(bus.basePrice, currentCountOfType);
                return (
                  <div key={bus.id} className="glass-panel p-10 rounded-[3rem] border-2 border-white/5 shadow-2xl">
                    <div className="flex justify-between items-start mb-8"><h3 className="text-3xl font-black text-white italic uppercase">{bus.name}</h3><span className="px-4 py-1.5 bg-emerald-500/10 rounded-full text-[10px] font-black text-emerald-500 uppercase">Total Owned: {currentCountOfType}</span></div>
                    <div className="grid grid-cols-2 gap-4 mb-10">
                      <div className="p-5 bg-white/5 rounded-3xl text-center"><div className="text-[9px] text-slate-500 uppercase font-black mb-2">Base Flow</div><div className="text-2xl text-emerald-400 font-mono font-black">{formatCurrency(bus.baseIncome * globalMultiplier)}/s</div></div>
                      <div className="p-5 bg-white/5 rounded-3xl text-center"><div className="text-[9px] text-slate-500 uppercase font-black mb-2">Risk Factor</div><div className="text-2xl text-white font-mono font-black">{(bus.risk * 100).toFixed(0)}%</div></div>
                    </div>
                    <button onClick={() => buyBusiness(bus.id)} disabled={state.money < nextPrice || state.isPaused} className={`w-full py-6 rounded-[2rem] font-black uppercase text-sm flex items-center justify-center gap-4 transition-all ${state.money >= nextPrice && !state.isPaused ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl active:scale-95' : 'bg-white/5 text-slate-700 cursor-not-allowed'}`}>
                      Found New Branch: {formatCurrency(nextPrice)}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </main>

      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 glass-panel border border-white/10 rounded-[3rem] px-6 py-4 shadow-2xl flex items-center justify-center gap-2 w-[90%] max-w-2xl">
        <NavButton active={activeTab === GameTab.DASHBOARD} onClick={() => setActiveTab(GameTab.DASHBOARD)} icon={<LayoutDashboard />} label="Terminal" />
        <NavButton active={activeTab === GameTab.INVENTORY} onClick={() => setActiveTab(GameTab.INVENTORY)} icon={<Box />} label="Inventory" />
        <NavButton active={activeTab === GameTab.INDUSTRIES || activeTab === GameTab.INDUSTRY_DETAIL} onClick={() => setActiveTab(GameTab.INDUSTRIES)} icon={<Briefcase />} label="Sectors" />
        <NavButton active={activeTab === GameTab.STOCKS} onClick={() => setActiveTab(GameTab.STOCKS)} icon={<TrendingUp />} label="Equity" />
        <NavButton active={activeTab === GameTab.CRYPTO} onClick={() => setActiveTab(GameTab.CRYPTO)} icon={<Bitcoin />} label="Liquidity" />
        <NavButton active={activeTab === GameTab.SHOP} onClick={() => setActiveTab(GameTab.SHOP)} icon={<ShoppingBag />} label="Elite Shop" />
      </nav>
    </div>
  );
};

export default App;
