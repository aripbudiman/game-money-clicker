
import { Business, Asset, LifestyleItem } from './types';

export const INITIAL_BUSINESSES: Business[] = [
  // RETAIL - Scaled for satisfying progression
  { id: 'ret_1', name: 'Warung Kelontong', basePrice: 100, baseIncome: 2, maintenance: 0.1, category: 'Retail', risk: 0.05, growth: 1.02 },
  { id: 'ret_madura', name: 'Warung Madura 24jam', basePrice: 1500, baseIncome: 25, maintenance: 1, category: 'Retail', risk: 0.03, growth: 1.04 },
  { id: 'ret_kopi_pwk', name: 'Warung Kopi PWK', basePrice: 5000, baseIncome: 85, maintenance: 3, category: 'Retail', risk: 0.07, growth: 1.05 },
  { id: 'ret_indomart', name: 'Indomart Mini', basePrice: 25000, baseIncome: 450, maintenance: 45, category: 'Retail', risk: 0.05, growth: 1.06 },
  { id: 'ret_alfamart', name: 'Alfamart Mini', basePrice: 32000, baseIncome: 600, maintenance: 60, category: 'Retail', risk: 0.05, growth: 1.06 },
  { id: 'ret_borma', name: 'Borma Toserba', basePrice: 200000, baseIncome: 4200, maintenance: 500, category: 'Retail', risk: 0.08, growth: 1.08 },
  { id: 'ret_3', name: 'Grand Supermarket', basePrice: 1500000, baseIncome: 35000, maintenance: 5000, category: 'Retail', risk: 0.1, growth: 1.10 },
  { id: 'ret_4', name: 'Luxury Retail Chain', basePrice: 10000000, baseIncome: 280000, maintenance: 45000, category: 'Retail', risk: 0.15, growth: 1.15 },
  
  // RESTAURANTS
  { id: 'res_1', name: 'Warung Makan', basePrice: 250, baseIncome: 6, maintenance: 1, category: 'Restaurants', risk: 0.1, growth: 1.03 },
  { id: 'res_2', name: 'Coffee Shop', basePrice: 1500, baseIncome: 20, maintenance: 2, category: 'Restaurants', risk: 0.12, growth: 1.06 },
  { id: 'res_3', name: 'Fine Dining', basePrice: 500000, baseIncome: 6500, maintenance: 800, category: 'Restaurants', risk: 0.2, growth: 1.2 },
  
  // MEDIA
  { id: 'med_1', name: 'News Portal', basePrice: 3500, baseIncome: 40, maintenance: 5, category: 'Media', risk: 0.08, growth: 1.1 },
  { id: 'med_2', name: 'TV Station Network', basePrice: 25000000, baseIncome: 450000, maintenance: 60000, category: 'Media', risk: 0.15, growth: 1.25 },
  
  // SHIPPING
  { id: 'shp_1', name: 'Courier Service', basePrice: 12000, baseIncome: 150, maintenance: 20, category: 'Shipping', risk: 0.1, growth: 1.07 },
  { id: 'shp_2', name: 'Cargo Fleet', basePrice: 150000000, baseIncome: 2200000, maintenance: 350000, category: 'Shipping', risk: 0.18, growth: 1.15 },
  
  // SPORT
  { id: 'spr_1', name: 'Local Gym', basePrice: 20000, baseIncome: 280, maintenance: 35, category: 'Sport', risk: 0.07, growth: 1.05 },
  { id: 'spr_badminton', name: 'Badminton Academy', basePrice: 180000, baseIncome: 2800, maintenance: 300, category: 'Sport', risk: 0.08, growth: 1.1 },
  { id: 'spr_volly', name: 'Volly Pro Club', basePrice: 850000, baseIncome: 15000, maintenance: 1800, category: 'Sport', risk: 0.1, growth: 1.12 },
  { id: 'spr_esports', name: 'E-Sports Organization', basePrice: 6000000, baseIncome: 110000, maintenance: 15000, category: 'Sport', risk: 0.2, growth: 1.25 },
  { id: 'spr_basket', name: 'Basketball Pro Team', basePrice: 45000000, baseIncome: 950000, maintenance: 120000, category: 'Sport', risk: 0.15, growth: 1.18 },
  { id: 'spr_2', name: 'Football Club', basePrice: 500000000, baseIncome: 8500000, maintenance: 1200000, category: 'Sport', risk: 0.25, growth: 1.35 },
  { id: 'spr_racing', name: 'International Racing Team', basePrice: 2500000000, baseIncome: 55000000, maintenance: 8000000, category: 'Sport', risk: 0.3, growth: 1.5 },
  
  // HOTELS
  { id: 'hot_1', name: 'Budget Hotel', basePrice: 250000, baseIncome: 3200, maintenance: 500, category: 'Hotels', risk: 0.12, growth: 1.12 },
  { id: 'hot_2', name: 'Luxury Resort', basePrice: 120000000, baseIncome: 1800000, maintenance: 250000, category: 'Hotels', risk: 0.2, growth: 1.25 },
  
  // PROPERTY
  { id: 'pro_1', name: 'House Flip', basePrice: 800000, baseIncome: 12000, maintenance: 1500, category: 'Property', risk: 0.15, growth: 1.18 },
  { id: 'pro_2', name: 'Smart City Project', basePrice: 5000000000, baseIncome: 85000000, maintenance: 12000000, category: 'Property', risk: 0.22, growth: 1.4 },
  
  // IT - MASSIVELY EXPANDED
  { id: 'it_agency', name: 'Web Dev Agency', basePrice: 65000, baseIncome: 950, maintenance: 120, category: 'IT', risk: 0.05, growth: 1.1 },
  { id: 'it_1', name: 'SaaS Startup', basePrice: 150000, baseIncome: 2500, maintenance: 300, category: 'IT', risk: 0.3, growth: 1.5 },
  { id: 'it_app', name: 'Mobile App Studio', basePrice: 450000, baseIncome: 8500, maintenance: 1200, category: 'IT', risk: 0.25, growth: 1.4 },
  { id: 'it_cyber', name: 'Cybersecurity Firm', basePrice: 2800000, baseIncome: 45000, maintenance: 6500, category: 'IT', risk: 0.1, growth: 1.2 },
  { id: 'it_ai', name: 'AI Research Lab', basePrice: 15000000, baseIncome: 320000, maintenance: 45000, category: 'IT', risk: 0.35, growth: 2.1 },
  { id: 'it_block', name: 'Blockchain Infra', basePrice: 85000000, baseIncome: 1500000, maintenance: 250000, category: 'IT', risk: 0.45, growth: 1.8 },
  { id: 'it_cloud', name: 'Global Cloud Provider', basePrice: 450000000, baseIncome: 8500000, maintenance: 1500000, category: 'IT', risk: 0.12, growth: 1.25 },
  { id: 'it_2', name: 'Mega Data Center', basePrice: 850000000, baseIncome: 15000000, maintenance: 2000000, category: 'IT', risk: 0.1, growth: 1.2 },
  { id: 'it_quantum', name: 'Quantum Center', basePrice: 12000000000, baseIncome: 280000000, maintenance: 45000000, category: 'IT', risk: 0.2, growth: 1.5 },
  { id: 'it_neural', name: 'Neural Link Interface', basePrice: 450000000000, baseIncome: 12000000000, maintenance: 2500000000, category: 'IT', risk: 0.5, growth: 3.5 },
  
  // MEDICINE
  { id: 'mdc_1', name: 'Pharmacy Store', basePrice: 45000, baseIncome: 650, maintenance: 80, category: 'Medicine', risk: 0.05, growth: 1.08 },
  { id: 'mdc_2', name: 'Pharma Lab', basePrice: 1200000000, baseIncome: 25000000, maintenance: 4000000, category: 'Medicine', risk: 0.4, growth: 1.8 },
  
  // RESOURCES
  { id: 'rsc_1', name: 'Corn Farm', basePrice: 30000, baseIncome: 500, maintenance: 60, category: 'Resources', risk: 0.1, growth: 1.05 },
  { id: 'rsc_2', name: 'Oil Rig', basePrice: 800000000, baseIncome: 18000000, maintenance: 3000000, category: 'Resources', risk: 0.25, growth: 1.3 },
  
  // FINANCE - MASSIVELY EXPANDED
  { id: 'fin_koperasi', name: 'Koperasi Simpan Pinjam', basePrice: 150000, baseIncome: 2500, maintenance: 300, category: 'Finance', risk: 0.05, growth: 1.08 },
  { id: 'fin_pawn', name: 'Pegadaian Unit', basePrice: 650000, baseIncome: 11000, maintenance: 1500, category: 'Finance', risk: 0.08, growth: 1.1 },
  { id: 'fin_local_bank', name: 'Bank Pembangunan Daerah', basePrice: 12000000, baseIncome: 220000, maintenance: 35000, category: 'Finance', risk: 0.12, growth: 1.15 },
  { id: 'fin_fintech', name: 'Fintech Unicorn Hub', basePrice: 95000000, baseIncome: 1800000, maintenance: 250000, category: 'Finance', risk: 0.35, growth: 1.8 },
  { id: 'fin_broker', name: 'Bursa Efek Agent', basePrice: 480000000, baseIncome: 8500000, maintenance: 1200000, category: 'Finance', risk: 0.25, growth: 1.4 },
  { id: 'fin_hedge', name: 'Hedge Fund Group', basePrice: 2500000000, baseIncome: 55000000, maintenance: 8000000, category: 'Finance', risk: 0.45, growth: 2.2 },
  { id: 'fin_pe', name: 'Private Equity Firm', basePrice: 12000000000, baseIncome: 280000000, maintenance: 45000000, category: 'Finance', risk: 0.2, growth: 1.6 },
  { id: 'fin_global_bank', name: 'Megabank Conglomerate', basePrice: 65000000000, baseIncome: 1500000000, maintenance: 250000000, category: 'Finance', risk: 0.1, growth: 1.15 },
  { id: 'fin_swf', name: 'Sovereign Wealth Fund', basePrice: 280000000000, baseIncome: 8500000000, maintenance: 1500000000, category: 'Finance', risk: 0.08, growth: 1.1 },
  { id: 'fin_clearing', name: 'Global Settlement Network', basePrice: 950000000000, baseIncome: 32000000000, maintenance: 6000000000, category: 'Finance', risk: 0.05, growth: 1.25 },
  { id: 'fin_ai_gov', name: 'Central Bank AI Governance', basePrice: 4500000000000, baseIncome: 180000000000, maintenance: 35000000000, category: 'Finance', risk: 0.15, growth: 1.5 },
  { id: 'fin_galactic', name: 'Galactic Credit Reserve', basePrice: 25000000000000, baseIncome: 1200000000000, maintenance: 250000000000, category: 'Finance', risk: 0.5, growth: 4.5 },

  // AIRLINE - MASSIVELY EXPANDED (Indo & Global)
  { id: 'air_susi', name: 'Susi Air (Charter)', basePrice: 8000000, baseIncome: 120000, maintenance: 15000, category: 'Airline', risk: 0.1, growth: 1.08 },
  { id: 'air_sriwijaya', name: 'Sriwijaya Air', basePrice: 45000000, baseIncome: 850000, maintenance: 120000, category: 'Airline', risk: 0.18, growth: 1.12 },
  { id: 'air_lion', name: 'Lion Air Group', basePrice: 180000000, baseIncome: 3200000, maintenance: 450000, category: 'Airline', risk: 0.25, growth: 1.35 },
  { id: 'air_citilink', name: 'Citilink Indonesia', basePrice: 420000000, baseIncome: 7500000, maintenance: 1200000, category: 'Airline', risk: 0.12, growth: 1.2 },
  { id: 'air_batik', name: 'Batik Air', basePrice: 950000000, baseIncome: 18000000, maintenance: 3200000, category: 'Airline', risk: 0.1, growth: 1.15 },
  { id: 'air_garuda', name: 'Garuda Indonesia', basePrice: 2500000000, baseIncome: 45000000, maintenance: 8000000, category: 'Airline', risk: 0.08, growth: 1.1 },
  { id: 'air_airasia', name: 'AirAsia Group', basePrice: 8500000000, baseIncome: 180000000, maintenance: 35000000, category: 'Airline', risk: 0.2, growth: 1.4 },
  { id: 'air_singapore', name: 'Singapore Airlines', basePrice: 25000000000, baseIncome: 550000000, maintenance: 120000000, category: 'Airline', risk: 0.05, growth: 1.15 },
  { id: 'air_qatar', name: 'Qatar Airways', basePrice: 65000000000, baseIncome: 1500000000, maintenance: 350000000, category: 'Airline', risk: 0.06, growth: 1.25 },
  { id: 'air_emirates', name: 'Emirates', basePrice: 150000000000, baseIncome: 3800000000, maintenance: 850000000, category: 'Airline', risk: 0.05, growth: 1.3 },
  { id: 'air_delta', name: 'Delta Air Lines', basePrice: 450000000000, baseIncome: 12000000000, maintenance: 2500000000, category: 'Airline', risk: 0.08, growth: 1.2 },
  { id: 'air_lufthansa', name: 'Lufthansa Group', basePrice: 850000000000, baseIncome: 25000000000, maintenance: 6000000000, category: 'Airline', risk: 0.1, growth: 1.18 },

  // TRANSPORTATION - NEW CATEGORY
  { id: 'tra_ojek', name: 'Ojek Pangkalan', basePrice: 150, baseIncome: 4, maintenance: 0.2, category: 'Transportation', risk: 0.05, growth: 1.02 },
  { id: 'tra_bike', name: 'Mitra Ojek Online', basePrice: 1800, baseIncome: 35, maintenance: 2, category: 'Transportation', risk: 0.1, growth: 1.08 },
  { id: 'tra_car', name: 'Mitra Gocar / GrabCar', basePrice: 18000, baseIncome: 320, maintenance: 35, category: 'Transportation', risk: 0.15, growth: 1.15 },
  { id: 'tra_taxi', name: 'Blue Bird Taxi Fleet', basePrice: 350000, baseIncome: 5500, maintenance: 800, category: 'Transportation', risk: 0.08, growth: 1.12 },
  { id: 'tra_travel', name: 'Shuttle Travel Agency', basePrice: 1800000, baseIncome: 42000, maintenance: 6500, category: 'Transportation', risk: 0.2, growth: 1.25 },
  { id: 'tra_bus', name: 'P.O. Bus Antar Kota', basePrice: 15000000, baseIncome: 350000, maintenance: 55000, category: 'Transportation', risk: 0.15, growth: 1.3 },
  { id: 'tra_decacorn', name: 'Ride-Hailing Decacorn', basePrice: 5000000000, baseIncome: 110000000, maintenance: 20000000, category: 'Transportation', risk: 0.3, growth: 1.6 },
  { id: 'tra_logistics', name: 'Global Transit Corp', basePrice: 65000000000, baseIncome: 1800000000, maintenance: 450000000, category: 'Transportation', risk: 0.1, growth: 1.2 },
  { id: 'tra_hyperloop', name: 'Hyperloop Network', basePrice: 350000000000, baseIncome: 12000000000, maintenance: 2500000000, category: 'Transportation', risk: 0.25, growth: 1.5 },
  { id: 'tra_teleport', name: 'Interstellar Transit Hub', basePrice: 950000000000, baseIncome: 35000000000, maintenance: 8000000000, category: 'Transportation', risk: 0.5, growth: 2.5 },
];

export const INITIAL_STOCKS: Asset[] = [
  // Existing Indonesian Stocks
  { id: 's1', name: 'TLKM Retail', type: 'stock', price: 100, history: [100], volatility: 0.02, trend: 0.001, owned: 0, avgBuyPrice: 0, sector: 'Retail' },
  { id: 's2', name: 'BCA Finance', type: 'stock', price: 800, history: [800], volatility: 0.01, trend: 0.0005, owned: 0, avgBuyPrice: 0, sector: 'Finance' },
  { id: 's3', name: 'GOTO Tech', type: 'stock', price: 50, history: [50], volatility: 0.06, trend: -0.001, owned: 0, avgBuyPrice: 0, sector: 'IT' },
  { id: 's4', name: 'Astra Resources', type: 'stock', price: 400, history: [400], volatility: 0.03, trend: 0.0008, owned: 0, avgBuyPrice: 0, sector: 'Resources' },
  
  // NEW REQUESTED STOCKS - Indonesian Blue Chips
  { id: 's_antam', name: 'ANTAM Gold', type: 'stock', price: 180, history: [180], volatility: 0.04, trend: 0.0015, owned: 0, avgBuyPrice: 0, sector: 'Resources' },
  { id: 's_mandiri', name: 'Bank Mandiri', type: 'stock', price: 750, history: [750], volatility: 0.015, trend: 0.0007, owned: 0, avgBuyPrice: 0, sector: 'Finance' },
  { id: 's_bni', name: 'Bank BNI', type: 'stock', price: 620, history: [620], volatility: 0.018, trend: 0.0006, owned: 0, avgBuyPrice: 0, sector: 'Finance' },
  { id: 's_adaro', name: 'Adaro Energy', type: 'stock', price: 320, history: [320], volatility: 0.035, trend: 0.0012, owned: 0, avgBuyPrice: 0, sector: 'Resources' },
  
  // NEW REQUESTED STOCKS - Global Tech & Media
  { id: 's_tiktok', name: 'TikTok (ByteDance)', type: 'stock', price: 1200, history: [1200], volatility: 0.07, trend: 0.0025, owned: 0, avgBuyPrice: 0, sector: 'Media' },
  { id: 's_google', name: 'Google (Alphabet)', type: 'stock', price: 2800, history: [2800], volatility: 0.025, trend: 0.001, owned: 0, avgBuyPrice: 0, sector: 'IT' },
  { id: 's_apple', name: 'Apple Inc.', type: 'stock', price: 3500, history: [3500], volatility: 0.02, trend: 0.0009, owned: 0, avgBuyPrice: 0, sector: 'IT' },
  
  // NEW REQUESTED STOCKS - Global Hardware
  { id: 's_oppo', name: 'Oppo Mobile', type: 'stock', price: 210, history: [210], volatility: 0.05, trend: 0.0005, owned: 0, avgBuyPrice: 0, sector: 'IT' },
  { id: 's_vivo', name: 'Vivo Tech', type: 'stock', price: 195, history: [195], volatility: 0.05, trend: 0.0004, owned: 0, avgBuyPrice: 0, sector: 'IT' },
  { id: 's_xiaomi', name: 'Xiaomi Corp', type: 'stock', price: 450, history: [450], volatility: 0.06, trend: 0.0018, owned: 0, avgBuyPrice: 0, sector: 'IT' },

  // Remaining Originals
  { id: 's5', name: 'Garuda Airline', type: 'stock', price: 120, history: [120], volatility: 0.05, trend: -0.002, owned: 0, avgBuyPrice: 0, sector: 'Airline' },
  { id: 's6', name: 'IndoFood Resto', type: 'stock', price: 250, history: [250], volatility: 0.02, trend: 0.001, owned: 0, avgBuyPrice: 0, sector: 'Restaurants' },
  { id: 's7', name: 'Ciputra Prop', type: 'stock', price: 900, history: [900], volatility: 0.03, trend: 0.002, owned: 0, avgBuyPrice: 0, sector: 'Property' },
  { id: 's8', name: 'Kalbe Pharma', type: 'stock', price: 350, history: [350], volatility: 0.02, trend: 0.001, owned: 0, avgBuyPrice: 0, sector: 'Medicine' },
  { id: 's9', name: 'TransMedia', type: 'stock', price: 500, history: [500], volatility: 0.04, trend: 0.0005, owned: 0, avgBuyPrice: 0, sector: 'Media' },
  { id: 's10', name: 'JNE Shipping', type: 'stock', price: 150, history: [150], volatility: 0.03, trend: 0.001, owned: 0, avgBuyPrice: 0, sector: 'Shipping' },
];

export const INITIAL_CRYPTO: Asset[] = [
  { id: 'c1', name: 'BitSim (BSIM)', type: 'crypto', price: 45000, history: [45000], volatility: 0.08, trend: 0.005, owned: 0, avgBuyPrice: 0 },
  { id: 'c2', name: 'EtherSim (ESIM)', type: 'crypto', price: 2800, history: [2800], volatility: 0.09, trend: 0.004, owned: 0, avgBuyPrice: 0 },
  { id: 'c3', name: 'DogeSim (DSIM)', type: 'crypto', price: 0.15, history: [0.15], volatility: 0.25, trend: 0.001, owned: 0, avgBuyPrice: 0 },
  { id: 'c4', name: 'MetaCoin (META)', type: 'crypto', price: 12, history: [12], volatility: 0.12, trend: -0.002, owned: 0, avgBuyPrice: 0 },
];

export const INITIAL_LIFESTYLE: LifestyleItem[] = [
  { id: 'l1', name: 'Laptop Gaming', price: 2500, prestige: 10, multiplier: 1.05, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=1000' },
  
  // ROADBIKES
  { id: 'rb1', name: 'Trek Madone SL 7', price: 12500, prestige: 25, multiplier: 1.07, image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=1000' },
  { id: 'rb2', name: 'S-Works Tarmac SL8', price: 15000, prestige: 35, multiplier: 1.08, image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=1000' },
  { id: 'rb3', name: 'Pinarello Dogma F', price: 22000, prestige: 50, multiplier: 1.10, image: 'https://images.unsplash.com/photo-1532298229144-0ee0516ad01c?auto=format&fit=crop&q=80&w=1000' },
  
  // MOTORBIKES
  { id: 'mb1', name: 'BMW M 1000 RR', price: 42000, prestige: 150, multiplier: 1.12, image: 'https://images.unsplash.com/photo-1623127389146-24e05b531767?auto=format&fit=crop&q=80&w=1000' },
  { id: 'mb2', name: 'Ducati Panigale V4', price: 48000, prestige: 180, multiplier: 1.14, image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1000' },
  { id: 'mb3', name: 'Custom Cafe Racer', price: 65000, prestige: 250, multiplier: 1.16, image: 'https://images.unsplash.com/photo-1515777315835-281b94c9589f?auto=format&fit=crop&q=80&w=1000' },

  { id: 'l2', name: 'Avanza Sim', price: 150000, prestige: 500, multiplier: 1.2, image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1000' },
  { id: 'l3', name: 'Rumah Kontrakan', price: 500000, prestige: 1000, multiplier: 1.3, image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=1000' },
  { id: 'l4', name: 'Honda Civic', price: 800000, prestige: 2000, multiplier: 1.4, image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1000' },
  
  // SPORTS CARS
  { id: 'sc1', name: 'Porsche 911 GT3', price: 2800000, prestige: 8000, multiplier: 1.8, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1000' },
  { id: 'sc2', name: 'Ferrari SF90', price: 6500000, prestige: 15000, multiplier: 2.4, image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=1000' },
  { id: 'sc3', name: 'Bugatti Chiron', price: 18000000, prestige: 40000, multiplier: 3.5, image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=1000' },

  { id: 'l5', name: 'Luxury Mansion', price: 45000000, prestige: 100000, multiplier: 5.0, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000' },
  { id: 'l6', name: 'Private Jet', price: 180000000, prestige: 500000, multiplier: 10.0, image: 'https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&q=80&w=1000' },

  // ULTRA LUXURY ENDGAME (BILLIONS+)
  { id: 'l7', name: 'Giga Yacht "Leviathan"', price: 850000000, prestige: 2500000, multiplier: 25.0, image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&q=80&w=1000' },
  { id: 'l8', name: 'Private Caribbean Archipelago', price: 3500000000, prestige: 12000000, multiplier: 60.0, image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&q=80&w=1000' },
  { id: 'l9', name: 'Empire Headquarters Tower', price: 15000000000, prestige: 50000000, multiplier: 150.0, image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000' },
  { id: 'l10', name: 'Orbital Space Hotel', price: 75000000000, prestige: 250000000, multiplier: 500.0, image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=1000' },
  { id: 'l11', name: 'Lunar Mining Colony', price: 320000000000, prestige: 1000000000, multiplier: 2500.0, image: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?auto=format&fit=crop&q=80&w=1000' },
  { id: 'l12', name: 'Mars Terraforming Project', price: 1200000000000, prestige: 5000000000, multiplier: 10000.0, image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&q=80&w=1000' },
];
