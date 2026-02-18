
import { Business, Asset, LifestyleItem } from './types';

export const INITIAL_BUSINESSES: Business[] = [
  // RETAIL - Indonesian Progression
  { id: 'ret_1', name: 'Warung Kelontong', basePrice: 100, baseIncome: 2, maintenance: 0.1, category: 'Retail', risk: 0.05, growth: 1.02 },
  { id: 'ret_madura', name: 'Warung Madura 24jam', basePrice: 1500, baseIncome: 25, maintenance: 1, category: 'Retail', risk: 0.03, growth: 1.04 },
  { id: 'ret_kopi_pwk', name: 'Warung Kopi PWK', basePrice: 5000, baseIncome: 85, maintenance: 3, category: 'Retail', risk: 0.07, growth: 1.05 },
  { id: 'ret_indomart', name: 'Indomart Mini', basePrice: 25000, baseIncome: 450, maintenance: 45, category: 'Retail', risk: 0.05, growth: 1.06 },
  { id: 'ret_alfamart', name: 'Alfamart Mini', basePrice: 32000, baseIncome: 600, maintenance: 60, category: 'Retail', risk: 0.05, growth: 1.06 },
  { id: 'ret_borma', name: 'Borma Toserba', basePrice: 200000, baseIncome: 4200, maintenance: 500, category: 'Retail', risk: 0.08, growth: 1.08 },
  { id: 'ret_3', name: 'Grand Supermarket', basePrice: 1500000, baseIncome: 35000, maintenance: 5000, category: 'Retail', risk: 0.1, growth: 1.10 },
  { id: 'ret_4', name: 'Luxury Retail Chain', basePrice: 10000000, baseIncome: 280000, maintenance: 45000, category: 'Retail', risk: 0.15, growth: 1.15 },
  
  // RESTAURANTS - INDONESIAN ICONIC BRANDS
  { id: 'res_warung', name: 'Warung Makan Bahari', basePrice: 300, baseIncome: 8, maintenance: 0.5, category: 'Restaurants', risk: 0.05, growth: 1.02 },
  { id: 'res_baso', name: 'Baso Aci Akang', basePrice: 1800, baseIncome: 35, maintenance: 2, category: 'Restaurants', risk: 0.08, growth: 1.05 },
  { id: 'res_esteh', name: 'Es Teh Indonesia', basePrice: 4500, baseIncome: 95, maintenance: 5, category: 'Restaurants', risk: 0.1, growth: 1.08 },
  { id: 'res_gacoan', name: 'Mie Gacoan', basePrice: 18000, baseIncome: 420, maintenance: 35, category: 'Restaurants', risk: 0.12, growth: 1.15 },
  { id: 'res_carok', name: 'Bebek Carok', basePrice: 35000, baseIncome: 850, maintenance: 60, category: 'Restaurants', risk: 0.1, growth: 1.12 },
  { id: 'res_nasgor', name: 'Nasgor Kambing Kebon Sirih', basePrice: 65000, baseIncome: 1400, maintenance: 100, category: 'Restaurants', risk: 0.08, growth: 1.05 },
  { id: 'res_bensu', name: 'Ayam Geprek Bensu', basePrice: 120000, baseIncome: 2800, maintenance: 250, category: 'Restaurants', risk: 0.15, growth: 1.1 },
  { id: 'res_holland', name: 'Holland Bakery', basePrice: 450000, baseIncome: 9500, maintenance: 1200, category: 'Restaurants', risk: 0.05, growth: 1.07 },
  { id: 'res_sederhana', name: 'RM Sederhana (Padang)', basePrice: 1200000, baseIncome: 28000, maintenance: 3500, category: 'Restaurants', risk: 0.04, growth: 1.06 },
  { id: 'res_senayan', name: 'Sate Khas Senayan', basePrice: 3500000, baseIncome: 75000, maintenance: 10000, category: 'Restaurants', risk: 0.05, growth: 1.08 },
  { id: 'res_solaria', name: 'Solaria Mall', basePrice: 8500000, baseIncome: 195000, maintenance: 25000, category: 'Restaurants', risk: 0.08, growth: 1.09 },
  { id: 'res_holywings', name: 'Night Entertainment Hub', basePrice: 45000000, baseIncome: 1200000, maintenance: 180000, category: 'Restaurants', risk: 0.3, growth: 1.4 },
  
  // MEDIA - INDONESIAN GIANTS
  { id: 'med_detik', name: 'Detikcom News Portal', basePrice: 3500, baseIncome: 45, maintenance: 5, category: 'Media', risk: 0.08, growth: 1.1 },
  { id: 'med_kompas', name: 'Kompas Gramedia Group', basePrice: 150000, baseIncome: 2800, maintenance: 400, category: 'Media', risk: 0.05, growth: 1.05 },
  { id: 'med_viva', name: 'VIVA Media (tvOne)', basePrice: 850000, baseIncome: 15000, maintenance: 2200, category: 'Media', risk: 0.12, growth: 1.1 },
  { id: 'med_mnc', name: 'MNC Media Group', basePrice: 4500000, baseIncome: 95000, maintenance: 12000, category: 'Media', risk: 0.1, growth: 1.15 },
  { id: 'med_emtek', name: 'Emtek Group (SCTV/Indosiar)', basePrice: 12000000, baseIncome: 280000, maintenance: 35000, category: 'Media', risk: 0.08, growth: 1.12 },
  { id: 'med_trans', name: 'Trans Media Group', basePrice: 35000000, baseIncome: 850000, maintenance: 120000, category: 'Media', risk: 0.1, growth: 1.18 },
  { id: 'med_global', name: 'International Streaming Service', basePrice: 250000000, baseIncome: 6500000, maintenance: 950000, category: 'Media', risk: 0.15, growth: 1.25 },
  
  // SHIPPING - INDONESIAN LOGISTICS PROGRESSION
  { id: 'shp_pos', name: 'PT Pos Indonesia', basePrice: 12000, baseIncome: 150, maintenance: 20, category: 'Shipping', risk: 0.05, growth: 1.05 },
  { id: 'shp_jne', name: 'JNE Express', basePrice: 45000, baseIncome: 750, maintenance: 80, category: 'Shipping', risk: 0.07, growth: 1.08 },
  { id: 'shp_jnt', name: 'J&T Express Global', basePrice: 180000, baseIncome: 3500, maintenance: 450, category: 'Shipping', risk: 0.1, growth: 1.12 },
  { id: 'shp_sicepat', name: 'SiCepat Ekspres', basePrice: 850000, baseIncome: 18000, maintenance: 2200, category: 'Shipping', risk: 0.08, growth: 1.1 },
  { id: 'shp_pelni', name: 'PT Pelni (Maritime)', basePrice: 15000000, baseIncome: 320000, maintenance: 45000, category: 'Shipping', risk: 0.12, growth: 1.15 },
  { id: 'shp_samudera', name: 'Samudera Indonesia', basePrice: 125000000, baseIncome: 2800000, maintenance: 350000, category: 'Shipping', risk: 0.1, growth: 1.2 },
  { id: 'shp_temas', name: 'Temas Line Cargo', basePrice: 850000000, baseIncome: 19500000, maintenance: 2500000, category: 'Shipping', risk: 0.15, growth: 1.25 },
  
  // SPORT
  { id: 'spr_1', name: 'Local Gym', basePrice: 20000, baseIncome: 280, maintenance: 35, category: 'Sport', risk: 0.07, growth: 1.05 },
  { id: 'spr_badminton', name: 'Badminton Academy', basePrice: 180000, baseIncome: 2800, maintenance: 300, category: 'Sport', risk: 0.08, growth: 1.1 },
  { id: 'spr_volly', name: 'Volly Pro Club', basePrice: 850000, baseIncome: 15000, maintenance: 1800, category: 'Sport', risk: 0.1, growth: 1.12 },
  { id: 'spr_esports', name: 'E-Sports Organization', basePrice: 6000000, baseIncome: 110000, maintenance: 15000, category: 'Sport', risk: 0.2, growth: 1.25 },
  { id: 'spr_2', name: 'Football Club', basePrice: 500000000, baseIncome: 8500000, maintenance: 1200000, category: 'Sport', risk: 0.25, growth: 1.35 },
  
  // HOTELS - INDONESIAN PROGRESSION
  { id: 'hot_melati', name: 'Penginapan Melati', basePrice: 45000, baseIncome: 650, maintenance: 80, category: 'Hotels', risk: 0.1, growth: 1.05 },
  { id: 'hot_reddoorz', name: 'RedDoorz Mitra', basePrice: 150000, baseIncome: 2200, maintenance: 300, category: 'Hotels', risk: 0.12, growth: 1.08 },
  { id: 'hot_santika', name: 'Hotel Santika Premiere', basePrice: 850000, baseIncome: 14000, maintenance: 1800, category: 'Hotels', risk: 0.05, growth: 1.1 },
  { id: 'hot_aston', name: 'Aston International', basePrice: 4500000, baseIncome: 85000, maintenance: 12000, category: 'Hotels', risk: 0.08, growth: 1.12 },
  { id: 'hot_ayana', name: 'Ayana Resort Bali', basePrice: 25000000, baseIncome: 550000, maintenance: 85000, category: 'Hotels', risk: 0.15, growth: 1.25 },
  { id: 'hot_kempinski', name: 'Grand Indonesia Kempinski', basePrice: 150000000, baseIncome: 3800000, maintenance: 650000, category: 'Hotels', risk: 0.05, growth: 1.15 },
  { id: 'hot_raffles', name: 'Raffles Jakarta', basePrice: 650000000, baseIncome: 18000000, maintenance: 3500000, category: 'Hotels', risk: 0.1, growth: 1.3 },
  
  // PROPERTY
  { id: 'pro_1', name: 'House Flip', basePrice: 800000, baseIncome: 12000, maintenance: 1500, category: 'Property', risk: 0.15, growth: 1.18 },
  { id: 'pro_apart', name: 'Apartment Complex', basePrice: 45000000, baseIncome: 850000, maintenance: 120000, category: 'Property', risk: 0.1, growth: 1.1 },
  { id: 'pro_2', name: 'Smart City Project', basePrice: 5000000000, baseIncome: 85000000, maintenance: 12000000, category: 'Property', risk: 0.22, growth: 1.4 },
  
  // IT
  { id: 'it_agency', name: 'Web Dev Agency', basePrice: 65000, baseIncome: 950, maintenance: 120, category: 'IT', risk: 0.05, growth: 1.1 },
  { id: 'it_ai', name: 'AI Research Lab', basePrice: 15000000, baseIncome: 320000, maintenance: 45000, category: 'IT', risk: 0.35, growth: 2.1 },
  { id: 'it_quantum', name: 'Quantum Center', basePrice: 12000000000, baseIncome: 280000000, maintenance: 45000000, category: 'IT', risk: 0.2, growth: 1.5 },
  { id: 'it_neural', name: 'Neural Link Interface', basePrice: 450000000000, baseIncome: 12000000000, maintenance: 2500000000, category: 'IT', risk: 0.5, growth: 3.5 },
  
  // MEDICINE
  { id: 'mdc_1', name: 'Pharmacy Store', basePrice: 45000, baseIncome: 650, maintenance: 80, category: 'Medicine', risk: 0.05, growth: 1.08 },
  { id: 'mdc_2', name: 'Pharma Lab', basePrice: 1200000000, baseIncome: 25000000, maintenance: 4000000, category: 'Medicine', risk: 0.4, growth: 1.8 },
  
  // RESOURCES
  { id: 'rsc_1', name: 'Corn Farm', basePrice: 30000, baseIncome: 500, maintenance: 60, category: 'Resources', risk: 0.1, growth: 1.05 },
  { id: 'rsc_2', name: 'Oil Rig', basePrice: 800000000, baseIncome: 18000000, maintenance: 3000000, category: 'Resources', risk: 0.25, growth: 1.3 },
  
  // FINANCE
  { id: 'fin_koperasi', name: 'Koperasi Simpan Pinjam', basePrice: 150000, baseIncome: 2500, maintenance: 300, category: 'Finance', risk: 0.05, growth: 1.08 },
  { id: 'fin_pawn', name: 'Pegadaian Unit', basePrice: 650000, baseIncome: 11000, maintenance: 1500, category: 'Finance', risk: 0.08, growth: 1.1 },
  { id: 'fin_local_bank', name: 'Bank Pembangunan Daerah', basePrice: 12000000, baseIncome: 220000, maintenance: 35000, category: 'Finance', risk: 0.12, growth: 1.15 },
  { id: 'fin_fintech', name: 'Fintech Unicorn Hub', basePrice: 95000000, baseIncome: 1800000, maintenance: 250000, category: 'Finance', risk: 0.35, growth: 1.8 },
  { id: 'fin_global_bank', name: 'Megabank Conglomerate', basePrice: 65000000000, baseIncome: 1500000000, maintenance: 250000000, category: 'Finance', risk: 0.1, growth: 1.15 },
  { id: 'fin_galactic', name: 'Galactic Credit Reserve', basePrice: 25000000000000, baseIncome: 1200000000000, maintenance: 250000000000, category: 'Finance', risk: 0.5, growth: 4.5 },

  // AIRLINE
  { id: 'air_susi', name: 'Susi Air (Charter)', basePrice: 8000000, baseIncome: 120000, maintenance: 15000, category: 'Airline', risk: 0.1, growth: 1.08 },
  { id: 'air_lion', name: 'Lion Air Group', basePrice: 180000000, baseIncome: 3200000, maintenance: 450000, category: 'Airline', risk: 0.25, growth: 1.35 },
  { id: 'air_garuda', name: 'Garuda Indonesia', basePrice: 2500000000, baseIncome: 45000000, maintenance: 8000000, category: 'Airline', risk: 0.08, growth: 1.1 },
  { id: 'air_emirates', name: 'Emirates Global', basePrice: 150000000000, baseIncome: 3800000000, maintenance: 850000000, category: 'Airline', risk: 0.05, growth: 1.3 },

  // TRANSPORTATION
  { id: 'tra_ojek', name: 'Ojek Pangkalan', basePrice: 150, baseIncome: 4, maintenance: 0.2, category: 'Transportation', risk: 0.05, growth: 1.02 },
  { id: 'tra_bike', name: 'Mitra Ojek Online', basePrice: 1800, baseIncome: 35, maintenance: 2, category: 'Transportation', risk: 0.1, growth: 1.08 },
  { id: 'tra_taxi', name: 'Blue Bird Taxi Fleet', basePrice: 350000, baseIncome: 5500, maintenance: 800, category: 'Transportation', risk: 0.08, growth: 1.12 },
  { id: 'tra_teleport', name: 'Interstellar Transit Hub', basePrice: 950000000000, baseIncome: 35000000000, maintenance: 8000000000, category: 'Transportation', risk: 0.5, growth: 2.5 },
];

export const INITIAL_STOCKS: Asset[] = [
  // INDONESIAN BLUE CHIPS
  { id: 's1', name: 'TLKM (Telkom Ind)', type: 'stock', price: 100, history: [100], volatility: 0.02, trend: 0.001, owned: 0, avgBuyPrice: 0, sector: 'IT' },
  { id: 's2', name: 'BBCA (Bank Central Asia)', type: 'stock', price: 800, history: [800], volatility: 0.01, trend: 0.0008, owned: 0, avgBuyPrice: 0, sector: 'Finance' },
  { id: 's_bbri', name: 'BBRI (Bank Rakyat Ind)', type: 'stock', price: 550, history: [550], volatility: 0.015, trend: 0.0006, owned: 0, avgBuyPrice: 0, sector: 'Finance' },
  { id: 's_asii', name: 'ASII (Astra Int)', type: 'stock', price: 420, history: [420], volatility: 0.03, trend: 0.0004, owned: 0, avgBuyPrice: 0, sector: 'Transportation' },
  { id: 's_goto', name: 'GOTO (Gojek Tokopedia)', type: 'stock', price: 15, history: [15], volatility: 0.08, trend: -0.0002, owned: 0, avgBuyPrice: 0, sector: 'IT' },
  { id: 's_unvr', name: 'UNVR (Unilever Ind)', type: 'stock', price: 380, history: [380], volatility: 0.02, trend: 0.0002, owned: 0, avgBuyPrice: 0, sector: 'Retail' },
  { id: 's_icbp', name: 'ICBP (Indofood CBP)', type: 'stock', price: 950, history: [950], volatility: 0.018, trend: 0.0005, owned: 0, avgBuyPrice: 0, sector: 'Retail' },
  { id: 's_antam', name: 'ANTAM (Aneka Tambang)', type: 'stock', price: 180, history: [180], volatility: 0.05, trend: 0.0015, owned: 0, avgBuyPrice: 0, sector: 'Resources' },
  { id: 's_adro', name: 'ADRO (Adaro Energy)', type: 'stock', price: 240, history: [240], volatility: 0.06, trend: 0.002, owned: 0, avgBuyPrice: 0, sector: 'Resources' },
  
  // GLOBAL TECH
  { id: 's_apple', name: 'AAPL (Apple Inc)', type: 'stock', price: 3500, history: [3500], volatility: 0.02, trend: 0.0012, owned: 0, avgBuyPrice: 0, sector: 'IT' },
  { id: 's_nvda', name: 'NVDA (NVIDIA)', type: 'stock', price: 8500, history: [8500], volatility: 0.07, trend: 0.0045, owned: 0, avgBuyPrice: 0, sector: 'IT' },
  { id: 's_tsla', name: 'TSLA (Tesla)', type: 'stock', price: 2200, history: [2200], volatility: 0.09, trend: 0.0025, owned: 0, avgBuyPrice: 0, sector: 'Transportation' },
];

export const INITIAL_CRYPTO: Asset[] = [
  // MAJOR CRYPTOS
  { id: 'c_btc', name: 'Bitcoin (BTC)', type: 'crypto', price: 65000, history: [65000], volatility: 0.08, trend: 0.005, owned: 0, avgBuyPrice: 0 },
  { id: 'c_eth', name: 'Ethereum (ETH)', type: 'crypto', price: 3500, history: [3500], volatility: 0.09, trend: 0.0045, owned: 0, avgBuyPrice: 0 },
  { id: 'c_sol', name: 'Solana (SOL)', type: 'crypto', price: 145, history: [145], volatility: 0.12, trend: 0.007, owned: 0, avgBuyPrice: 0 },
  { id: 'c_ada', name: 'Cardano (ADA)', type: 'crypto', price: 0.5, history: [0.5], volatility: 0.1, trend: 0.002, owned: 0, avgBuyPrice: 0 },
  { id: 'c_dot', name: 'Polkadot (DOT)', type: 'crypto', price: 8.5, history: [8.5], volatility: 0.11, trend: 0.0035, owned: 0, avgBuyPrice: 0 },
  
  // MEME & LOCAL
  { id: 'c_doge', name: 'Dogecoin (DOGE)', type: 'crypto', price: 0.15, history: [0.15], volatility: 0.25, trend: 0.001, owned: 0, avgBuyPrice: 0 },
  { id: 'c_pepe', name: 'PEPE Coin', type: 'crypto', price: 0.00001, history: [0.00001], volatility: 0.45, trend: 0.0005, owned: 0, avgBuyPrice: 0 },
  { id: 'c_idrt', name: 'Rupiah Token (IDRT)', type: 'crypto', price: 1, history: [1], volatility: 0.005, trend: 0.0001, owned: 0, avgBuyPrice: 0 },
  
  // NANO SERIES
  { id: 'c1', name: 'BitSim (BSIM)', type: 'crypto', price: 45000, history: [45000], volatility: 0.08, trend: 0.005, owned: 0, avgBuyPrice: 0 },
  { id: 'c2', name: 'EtherSim (ESIM)', type: 'crypto', price: 2800, history: [2800], volatility: 0.09, trend: 0.004, owned: 0, avgBuyPrice: 0 },
];

export const INITIAL_LIFESTYLE: LifestyleItem[] = [
  // Budget/Starter Items
  { id: 'l1', name: 'Laptop Gaming High-End', price: 3500, prestige: 10, multiplier: 1.05, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=1000' },
  { id: 'l2', name: 'Koleksi Jam Tangan Rolex', price: 25000, prestige: 85, multiplier: 1.08, image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=1000' },
  
  // Mid Range Indonesian Luxury
  { id: 'l_batik', name: 'Koleksi Batik Tulis Langka', price: 15000, prestige: 50, multiplier: 1.04, image: 'https://images.unsplash.com/photo-1560717789-0ac7c58ac90a?auto=format&fit=crop&q=80&w=1000' },
  { id: 'l_vespa', name: 'Vespa Dior Edition', price: 65000, prestige: 120, multiplier: 1.1, image: 'https://images.unsplash.com/photo-1620050854445-5f9175f784d0?auto=format&fit=crop&q=80&w=1000' },
  
  // High End Cars
  { id: 'l_porsche', name: 'Porsche 911 Turbo S', price: 320000, prestige: 1200, multiplier: 1.25, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1000' },
  { id: 'l_ferrari', name: 'Ferrari SF90 Stradale', price: 850000, prestige: 3500, multiplier: 1.45, image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=1000' },
  
  // Premium Real Estate
  { id: 'l_penthouse', name: 'Penthouse SCBD Jakarta', price: 2500000, prestige: 8500, multiplier: 1.8, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000' },
  { id: 'l_island', name: 'Private Island Raja Ampat', price: 12000000, prestige: 45000, multiplier: 2.5, image: 'https://images.unsplash.com/photo-1544161515-4af6b1d462c2?auto=format&fit=crop&q=80&w=1000' },
  
  // Super Wealth / Scientific
  { id: 'l_jet', name: 'Gulfstream G700', price: 75000000, prestige: 250000, multiplier: 5.0, image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=1000' },
  { id: 'l_yacht', name: 'Mega Yacht "Indo Majesty"', price: 450000000, prestige: 1200000, multiplier: 12.0, image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&q=80&w=1000' },
  { id: 'l_football', name: 'European Football Club', price: 4500000000, prestige: 15000000, multiplier: 85.0, image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=1000' },
  
  // End Game Sci-Fi
  { id: 'l_mars', name: 'Mars Terraforming Base', price: 1200000000000, prestige: 5000000000, multiplier: 10000.0, image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&q=80&w=1000' },
  { id: 'l_dyson', name: 'Dyson Sphere Segment', price: 450000000000000, prestige: 99999999999, multiplier: 1000000.0, image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000' },
];
