"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export const dynamic = 'force-dynamic';



type ComponentType =
  | "cpu"
  | "motherboard"
  | "gpu"
  | "ram"
  | "storage"
  | "psu"
  | "case"
  | "cooler";

const COMPONENT_LABELS: Record<ComponentType, string> = {
  cpu: "Procesor (CPU)",
  motherboard: "Płyta główna",
  gpu: "Karta graficzna (GPU)",
  ram: "Pamięć RAM",
  storage: "Dysk",
  psu: "Zasilacz (PSU)",
  case: "Obudowa",
  cooler: "Chłodzenie",
};

const SPEC_LABELS: Record<string, string> = {
  socket: "Gniazdo",
  chipset: "Chipset",
  form_factor: "Format",
  ram_slots: "Sloty RAM",
  ram_type: "Typ RAM",
  wifi_bt: "Wi-Fi",
  frequency: "Taktowanie",
  configuration: "Konfiguracja",
  latency: "Opóźnienie",
  capacity: "Pojemność",
  format: "Format",
  interface: "Interfejs",
  read_speed: "Odczyt",
  write_speed: "Zapis",
  motherboard_compatibility: "Kompatybilność",
  case_type: "Typ obudowy",
  certificate: "Certyfikat",
  power: "Moc",
  modular: "Modularny",
  standard: "Standard",
  fan: "Wentylator",
  rpm: "Prędkość obrotowa",
  lighting: "Podświetlenie",
  radiator_size: "Rozmiar chłodnicy",
  max_tdp: "Maks. TDP",
  type: "Typ",
};

const COMPONENT_ORDER: ComponentType[] = [
  "cpu",
  "motherboard",
  "gpu",
  "ram",
  "storage",
  "psu",
  "case",
  "cooler",
];

interface Product {
  id: string;
  name: string;
  type: string;
  price: number;
  specifications: Record<string, any>;
  image_url?: string;
}

interface Configuration {
  components: Record<ComponentType, string | null>;
  performanceScore: number | null;
}

const ASSEMBLY_PRICE = 300;

const AnimatedPrice = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const startValue = useRef(value);
  const startTime = useRef<number | null>(null);
  const animationFrame = useRef<number | null>(null);

  useEffect(() => {
    startValue.current = displayValue;
    startTime.current = null;

    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = timestamp - startTime.current;
      const duration = 1000; // 1 second animation

      if (progress < duration) {
        // Ease out expo formula
        const ease = 1 - Math.pow(2, -10 * (progress / duration));
        const nextValue = startValue.current + (value - startValue.current) * ease;
        setDisplayValue(nextValue);
        animationFrame.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, [value]);

  return <>{Math.round(displayValue).toLocaleString("pl-PL")}</>;
};

export default function ConfiguratorPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const deviceType = searchParams.get("device") || "pc";
  const segment = searchParams.get("segment") || "home";
  const budget = Number(searchParams.get("budget")) || 5000;

  const [config, setConfig] = useState<Configuration>({
    components: {
      cpu: null,
      motherboard: null,
      gpu: null,
      ram: null,
      storage: null,
      psu: null,
      case: null,
      cooler: null,
    },
    performanceScore: null,
  });

  const [assemblyService, setAssemblyService] = useState(false);

  const [expanded, setExpanded] = useState<Record<ComponentType, boolean>>({
    cpu: true,
    motherboard: false,
    gpu: false,
    ram: false,
    storage: false,
    psu: false,
    case: false,
    cooler: false,
  });

  const [filters, setFilters] = useState<Record<ComponentType, string>>({
    cpu: 'all',
    motherboard: 'all',
    gpu: 'all',
    ram: 'all',
    storage: 'all',
    psu: 'all',
    case: 'all',
    cooler: 'all',
  });

  const [sorting, setSorting] = useState<Record<ComponentType, string>>({
    cpu: 'default',
    motherboard: 'default',
    gpu: 'default',
    ram: 'default',
    storage: 'default',
    psu: 'default',
    case: 'default',
    cooler: 'default',
  });

  const [showMissingModal, setShowMissingModal] = useState(false);
  const [missingComponents, setMissingComponents] = useState<ComponentType[]>([]);

  const { data: cpuProducts } = useQuery({
    queryKey: ["products", "cpu"],
    queryFn: async () => {
      const res = await api.get<Product[]>("/products", {
        params: { type: "cpu" },
      });
      return res.data;
    },
  });

  const { data: motherboardProducts } = useQuery({
    queryKey: ["products", "motherboard"],
    queryFn: async () => {
      const res = await api.get<Product[]>("/products", {
        params: { type: "motherboard" },
      });
      return res.data;
    },
  });

  const { data: gpuProducts } = useQuery({
    queryKey: ["products", "gpu"],
    queryFn: async () => {
      const res = await api.get<Product[]>("/products", {
        params: { type: "gpu" },
      });
      return res.data;
    },
  });

  const { data: ramProducts } = useQuery({
    queryKey: ["products", "ram"],
    queryFn: async () => {
      const res = await api.get<Product[]>("/products", {
        params: { type: "ram" },
      });
      return res.data;
    },
  });

  const { data: storageProducts } = useQuery({
    queryKey: ["products", "storage"],
    queryFn: async () => {
      const res = await api.get<Product[]>("/products", {
        params: { type: "storage" },
      });
      return res.data;
    },
  });

  const { data: psuProducts } = useQuery({
    queryKey: ["products", "psu"],
    queryFn: async () => {
      const res = await api.get<Product[]>("/products", {
        params: { type: "psu" },
      });
      return res.data;
    },
  });

  const { data: caseProducts } = useQuery({
    queryKey: ["products", "case"],
    queryFn: async () => {
      const res = await api.get<Product[]>("/products", {
        params: { type: "case" },
      });
      return res.data;
    },
  });

  const { data: coolerProducts } = useQuery({
    queryKey: ["products", "cooler"],
    queryFn: async () => {
      const res = await api.get<Product[]>("/products", {
        params: { type: "cooler" },
      });
      return res.data;
    },
  });

  const totalPrice = Object.values(config.components).reduce((sum, productId) => {
    if (!productId) return sum;
    const allProducts = [
      ...(cpuProducts || []),
      ...(motherboardProducts || []),
      ...(gpuProducts || []),
      ...(ramProducts || []),
      ...(storageProducts || []),
      ...(psuProducts || []),
      ...(caseProducts || []),
      ...(coolerProducts || []),
    ];
    const product = allProducts.find((p) => p.id === productId);
    return sum + (product?.price || 0);
  }, 0) + (assemblyService ? ASSEMBLY_PRICE : 0);

  const toggleExpanded = (type: ComponentType) => {
    const isExpanding = !expanded[type];
    setExpanded((prev) => ({ ...prev, [type]: isExpanding }));

    // Scroll to component header when collapsing (immediate for better UX)
    if (!isExpanding) {
      setTimeout(() => {
        const element = document.getElementById(`component-${type}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 10);
    }
  };

  const handleSelectComponent = (type: ComponentType, productId: string) => {
    setConfig((prev) => ({
      ...prev,
      components: { ...prev.components, [type]: productId },
    }));
    // Auto-scroll to the selected component section
    setTimeout(() => {
      const element = document.getElementById(`component-${type}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleRemoveComponent = (type: ComponentType) => {
    setConfig((prev) => ({
      ...prev,
      components: { ...prev.components, [type]: null },
    }));
  };

  const handleFilterChange = (type: ComponentType, value: string) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const handleSortChange = (type: ComponentType, value: string) => {
    setSorting((prev) => ({ ...prev, [type]: value }));
  };

  const getFilteredProducts = (type: ComponentType, products: Product[]) => {
    const filter = filters[type];
    if (filter === 'all') return products;

    return products.filter((product) => {
      const combined = `${product.name} ${JSON.stringify(product.specifications)}`.toLowerCase();

      if (type === 'cpu') {
        if (filter === 'amd') return combined.includes('amd') || combined.includes('ryzen');
        if (filter === 'intel') return combined.includes('intel') || combined.includes('core');
      }
      if (type === 'motherboard') {
        if (filter === 'msi') return combined.includes('msi');
        if (filter === 'gigabyte') return combined.includes('gigabyte');
        if (filter === 'asus') return combined.includes('asus');
        if (filter === 'am5') return combined.includes('am5');
        if (filter === 'lga1851') return combined.includes('lga1851') || combined.includes('lga 1851');
        if (filter === 'lga1700') return combined.includes('lga1700') || combined.includes('lga 1700');
      }
      if (type === 'gpu') {
        if (filter === 'nvidia') return combined.includes('nvidia') || combined.includes('geforce') || combined.includes('rtx') || combined.includes('gtx');
        if (filter === 'amd') return combined.includes('amd') || combined.includes('radeon') || combined.includes('xt');
        if (filter === '8gb') return combined.includes('8 gb') || combined.includes('8gb');
        if (filter === '12gb') return combined.includes('12 gb') || combined.includes('12gb');
        if (filter === '16gb') return combined.includes('16 gb') || combined.includes('16gb');
      }
      if (type === 'ram') {
        const normalized = combined.replace(/\s/g, '');
        if (filter === '16gb') return normalized.includes('16gb') || normalized.includes('2x8gb');
        if (filter === '32gb') return normalized.includes('32gb') || normalized.includes('2x16gb');
        if (filter === '64gb') return normalized.includes('64gb') || normalized.includes('2x32gb');
        if (filter === '128gb') return normalized.includes('128gb') || normalized.includes('4x32gb');
      }
      if (type === 'storage') {
        const normalized = combined.replace(/\s/g, '');
        if (filter === '512gb') return normalized.includes('512gb') || normalized.includes('500gb');
        if (filter === '1tb') return normalized.includes('1tb') && !normalized.includes('10tb');
        if (filter === '2tb') return normalized.includes('2tb');
        if (filter === '4tb') return normalized.includes('4tb');
      }
      if (type === 'psu') {
        const normalized = combined.replace(/\s/g, '');
        if (filter === '550w') return normalized.includes('550w');
        if (filter === '650w') return normalized.includes('650w');
        if (filter === '750w') return normalized.includes('750w');
        if (filter === '850w') return normalized.includes('850w');
        if (filter === '1000w') return normalized.includes('1000w') || normalized.includes('1kw');
        if (filter === '1200w') return normalized.includes('1200w') || normalized.includes('1.2kw');
      }
      if (type === 'case') {
        if (filter === 'endorfy') return combined.includes('endorfy');
        if (filter === 'modecom') return combined.includes('modecom');
        if (filter === 'krux') return combined.includes('krux');
        if (filter === 'deepcool') return combined.includes('deepcool');
        if (filter === 'nzxt') return combined.includes('nzxt');
        if (filter === 'be quiet!') return combined.includes('be quiet!');
        if (filter === 'fractal') return combined.includes('fractal');
        if (filter === 'smx') return combined.includes('smx');
        if (filter === 'cougar') return combined.includes('cougar');
        if (filter === 'fury') return combined.includes('fury');
        if (filter === 'msi') return combined.includes('msi');
      }
      if (type === 'cooler') {
        if (filter === 'aio') return combined.includes('aio') || combined.includes('liquid') || combined.includes('wodne') || combined.includes('navis') || combined.includes('kraken');
        if (filter === 'air') return !combined.includes('aio') && !combined.includes('liquid') && !combined.includes('wodne') && !combined.includes('navis') && !combined.includes('kraken');
      }
      return true;
    });
  };

  const renderFilters = (type: ComponentType) => {
    const renderButton = (label: string, value: string, isSort: boolean = false) => (
      <button
        key={value}
        onClick={() => isSort ? handleSortChange(type, value) : handleFilterChange(type, value)}
        className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${isSort
          ? (sorting[type] === value
            ? 'bg-blue-500 text-white shadow-md'
            : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/70')
          : (filters[type] === value
            ? 'bg-emerald-500 text-white shadow-md'
            : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/70')
          }`}
      >
        {label}
      </button>
    );

    let options: { label: string; value: string }[] = [];

    if (type === 'cpu') {
      options = [
        { label: 'Wszystkie', value: 'all' },
        { label: 'AMD', value: 'amd' },
        { label: 'Intel', value: 'intel' }
      ];
    } else if (type === 'motherboard') {
      options = [
        { label: 'Wszystkie', value: 'all' },
        { label: 'MSI', value: 'msi' },
        { label: 'Gigabyte', value: 'gigabyte' },
        { label: 'Asus', value: 'asus' },
        { label: 'AM5', value: 'am5' },
        { label: 'LGA1851', value: 'lga1851' },
        { label: 'LGA1700', value: 'lga1700' }
      ];
    } else if (type === 'gpu') {
      options = [
        { label: 'Wszystkie', value: 'all' },
        { label: 'NVIDIA', value: 'nvidia' },
        { label: 'AMD', value: 'amd' },
        { label: '8GB VRAM', value: '8gb' },
        { label: '12GB VRAM', value: '12gb' },
        { label: '16GB VRAM', value: '16gb' }
      ];
    } else if (type === 'ram') {
      options = [
        { label: 'Wszystkie', value: 'all' },
        { label: '16GB', value: '16gb' },
        { label: '32GB', value: '32gb' },
        { label: '64GB', value: '64gb' },
        { label: '128GB', value: '128gb' }
      ];
    } else if (type === 'storage') {
      options = [
        { label: 'Wszystkie', value: 'all' },
        { label: '512GB', value: '512gb' },
        { label: '1TB', value: '1tb' },
        { label: '2TB', value: '2tb' },
        { label: '4TB', value: '4tb' }
      ];
    } else if (type === 'psu') {
      options = [
        { label: 'Wszystkie', value: 'all' },
        { label: '550W', value: '550w' },
        { label: '650W', value: '650w' },
        { label: '750W', value: '750w' },
        { label: '850W', value: '850w' },
        { label: '1000W', value: '1000w' },
        { label: '1200W', value: '1200w' }
      ];
    } else if (type === 'case') {
      options = [
        { label: 'Wszystkie', value: 'all' },
        { label: 'ENDORFY', value: 'endorfy' },
        { label: 'MODECOM', value: 'modecom' },
        { label: 'KRUX', value: 'krux' },
        { label: 'Deepcool', value: 'deepcool' },
        { label: 'NZXT', value: 'nzxt' },
        { label: 'be quiet!', value: 'be quiet!' },
        { label: 'Fractal Design', value: 'fractal' },
        { label: 'Silver Monkey X', value: 'smx' },
        { label: 'Cougar', value: 'cougar' },
        { label: 'Fury', value: 'fury' },
        { label: 'MSI', value: 'msi' }
      ];
    } else if (type === 'cooler') {
      options = [
        { label: 'Wszystkie', value: 'all' },
        { label: 'Powietrzne', value: 'air' },
        { label: 'Wodne AIO', value: 'aio' }
      ];
    }

    if (options.length === 0) return null;

    const sortOptions = [
      { label: 'Domyślnie', value: 'default' },
      { label: 'Cena: od najniższej', value: 'price-asc' },
      { label: 'Cena: od najwyższej', value: 'price-desc' }
    ];

    return (
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 mb-6 border border-gray-700/30">
        {/* Filters */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {options.map(opt => renderButton(opt.label, opt.value, false))}
          </div>
        </div>

        {/* Sorting - separated with subtle divider */}
        <div className="pt-4 border-t border-gray-700/20">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-gray-400 text-xs font-medium mr-1">Sortowanie:</span>
            {sortOptions.map(opt => renderButton(opt.label, opt.value, true))}
          </div>
        </div>
      </div>
    );
  };

  const getProductsForType = (type: ComponentType): Product[] => {
    let products: Product[] = [];
    switch (type) {
      case "cpu": products = cpuProducts || []; break;
      case "motherboard": products = motherboardProducts || []; break;
      case "gpu": products = gpuProducts || []; break;
      case "ram": products = ramProducts || []; break;
      case "storage": products = storageProducts || []; break;
      case "psu": products = psuProducts || []; break;
      case "case": products = caseProducts || []; break;
      case "cooler": products = coolerProducts || []; break;
    }

    const filtered = getFilteredProducts(type, products);

    const sortOption = sorting[type];
    if (sortOption === 'price-asc') {
      return [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      return [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8">
            <button
              onClick={() => router.push("/")}
              className="text-emerald-400 hover:text-emerald-300 mb-4 flex items-center transition-colors group"
            >
              <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Powrót do strony głównej
            </button>
            <h1 className="text-4xl font-bold text-white mb-2">
              Konfigurator PC
            </h1>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-20 gap-8">
            {/* Main Configurator Column */}
            <div className="lg:col-span-11 space-y-6">
              {COMPONENT_ORDER.map((type) => (
                <section
                  key={type}
                  id={`component-${type}`}
                  className={`relative rounded-2xl transition-all duration-500 ${expanded[type]
                    ? "bg-gray-900/60 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-white/10 ring-1 ring-white/5"
                    : "bg-gray-800/40 border border-white/5 hover:bg-gray-800/60"
                    } hover:shadow-[0_0_40px_rgba(16,185,129,0.2)] group/section`}
                >
                  {/* Header */}
                  <div
                    onClick={() => toggleExpanded(type)}
                    className="p-6 cursor-pointer flex items-center justify-between relative overflow-hidden"
                  >
                    {/* Header Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent opacity-0 group-hover/section:opacity-100 transition-opacity duration-500"></div>

                    <div className="flex items-center gap-4 relative z-10">
                      <div className={`w-1.5 h-12 rounded-full transition-all duration-500 ${config.components[type]
                        ? "bg-emerald-500 shadow-[0_0_20px_#10b981]"
                        : "bg-gray-700 group-hover/section:bg-emerald-500/50"
                        }`}></div>
                      <div>
                        <h2 className={`text-xl font-bold transition-colors duration-300 ${config.components[type] ? "text-white" : "text-gray-300 group-hover/section:text-emerald-300"
                          }`}>
                          {COMPONENT_LABELS[type]}
                        </h2>
                        {config.components[type] ? (
                          <div className="text-sm text-emerald-400 font-medium flex items-center gap-2 animate-fade-in">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            Wybrano komponent
                          </div>
                        ) : (
                          <div className="text-sm text-gray-500 group-hover/section:text-gray-400 transition-colors">
                            Wybierz komponent
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 relative z-10">
                      {config.components[type] && (
                        <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(16,185,129,0.1)] animate-scale-in">
                          Wybrano
                        </span>
                      )}
                      <button
                        className={`px-4 sm:px-5 py-3 sm:py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 min-w-[100px] justify-center ${expanded[type]
                          ? "bg-emerald-600 text-white border-2 border-emerald-500 hover:bg-emerald-700 shadow-lg shadow-emerald-500/30"
                          : "bg-gradient-to-br from-emerald-900/40 to-teal-900/40 text-white border-2 border-emerald-500/50 hover:border-emerald-400/70 hover:from-emerald-900/50 hover:to-teal-900/50"
                          }`}
                      >
                        <span>{expanded[type] ? "Zwiń" : "Rozwiń"}</span>
                        <svg className={`w-4 h-4 transition-transform duration-300 ${expanded[type] ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  {/* Content */}
                  <div
                    className={`grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${expanded[type] ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                  >
                    <div className="overflow-hidden">
                      <div className={`p-6 pt-0 border-t border-gray-700/50 transition-opacity duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${expanded[type] ? "opacity-100" : "opacity-0"
                        }`}>
                        {/* Filters */}
                        <div className="mt-6">
                          {renderFilters(type)}
                        </div>

                        {/* Selected Component Display */}
                        {config.components[type] && (
                          <div className="mb-8 animate-slide-up">
                            <div className="relative group/selected">
                              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl opacity-20 group-hover/selected:opacity-40 blur transition duration-500 animate-pulse-glow"></div>
                              <div className="relative bg-gray-800/80 backdrop-blur-xl rounded-xl p-5 border border-emerald-500/30 shadow-lg overflow-hidden">
                                {/* Shimmer Effect */}
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent z-10 pointer-events-none"></div>

                                <div className="flex justify-between items-start relative z-20">
                                  <div className="flex-1 pr-4">
                                    <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce-slow"></span>
                                      Wybrany komponent
                                    </div>
                                    <div className="font-bold text-xl text-white mb-1">
                                      {getProductsForType(type).find(p => p.id === config.components[type])?.name}
                                    </div>
                                    <div className="text-sm text-gray-400 flex flex-wrap gap-2 mt-3">
                                      {(() => {
                                        const product = getProductsForType(type).find(p => p.id === config.components[type]);
                                        if (!product) return null;
                                        return Object.entries(product.specifications || {}).map(([key, val]) => (
                                          <span
                                            key={key}
                                            className="inline-block bg-emerald-950/50 px-2 py-1 rounded text-xs border border-emerald-500/30 text-emerald-100"
                                          >
                                            <span className="text-emerald-400/70">{SPEC_LABELS[key] || key}:</span>{" "}
                                            <span className="text-emerald-100">{String(val)}</span>
                                          </span>
                                        ));
                                      })()}
                                    </div>
                                  </div>
                                  <div className="flex flex-col items-end gap-3">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemoveComponent(type);
                                      }}
                                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-300 group/remove"
                                      title="Usuń komponent"
                                    >
                                      <svg className="w-5 h-5 transform group-hover/remove:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                      </svg>
                                    </button>
                                    <div className="text-2xl font-bold text-white whitespace-nowrap">
                                      {getProductsForType(type).find(p => p.id === config.components[type])?.price.toLocaleString("pl-PL")} zł
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Separator if component is selected */}
                        {config.components[type] && (
                          <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                              <div className="w-full border-t border-gray-600"></div>
                            </div>
                            <div className="relative flex justify-center">
                              <span className="px-4 bg-gray-800 text-gray-400 text-sm font-medium">
                                Pozostałe komponenty
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Product List */}
                        <div key={sorting[type] + filters[type]} className="space-y-4 animate-slide-up">
                          {getProductsForType(type)
                            .filter(product => product.id !== config.components[type])
                            .map((product) => (
                              <div key={product.id} className="group/item relative">
                                {/* Hover glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl blur-lg opacity-0 group-hover/item:opacity-100 transition-all duration-500"></div>

                                <div className="relative w-full text-left p-2.5 md:p-4 rounded-xl border transition-all duration-300 border-gray-700 bg-gray-700/30 hover:border-emerald-500/50 hover:bg-gray-700/50 hover:shadow-lg">
                                  <div className="flex flex-col md:flex-row justify-between items-start gap-2.5 md:gap-4">
                                    <div
                                      onClick={() => handleSelectComponent(type, product.id)}
                                      className="flex-1 cursor-pointer min-w-0"
                                    >
                                      <div className="font-semibold text-sm md:text-lg mb-2 md:mb-1 text-white group-hover/item:text-emerald-300 transition-colors leading-tight">
                                        {product.name}
                                      </div>
                                      <div className="text-[10px] md:text-sm text-gray-400 flex flex-wrap gap-1 md:gap-2">
                                        {Object.entries(product.specifications || {}).map(([key, val]) => (
                                          <span
                                            key={key}
                                            className="inline-block bg-gray-800 px-1.5 md:px-2 py-0.5 md:py-1 rounded text-[10px] md:text-xs border border-gray-600 group-hover/item:border-gray-500 transition-colors"
                                          >
                                            <span className="text-gray-500">{SPEC_LABELS[key] || key}:</span>{" "}
                                            <span className="text-gray-300">{String(val)}</span>
                                          </span>
                                        ))}
                                      </div>
                                    </div>

                                    {/* Price and Buttons */}
                                    <div className="flex flex-row md:flex-col items-center md:items-end gap-3 w-full md:w-auto mt-2 md:mt-0">
                                      <div
                                        onClick={() => handleSelectComponent(type, product.id)}
                                        className="font-bold text-emerald-400 text-base md:text-xl whitespace-nowrap cursor-pointer flex-1 md:flex-none"
                                      >
                                        {product.price.toLocaleString("pl-PL")} zł
                                      </div>

                                      <div className="flex items-center gap-2">
                                        {/* Zwiń Button */}
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            toggleExpanded(type);
                                          }}
                                          className="px-3 py-1.5 md:py-2.5 rounded-lg border border-gray-600 text-gray-400 hover:text-white hover:bg-gray-700 hover:border-gray-500 transition-all text-xs md:text-sm font-medium flex items-center gap-1.5 h-full"
                                          title="Zwiń listę"
                                        >
                                          <svg className="w-3.5 h-3.5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                          </svg>
                                          <span className="hidden sm:inline">Zwiń</span>
                                        </button>

                                        {/* Premium "Wybierz" Button */}
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleSelectComponent(type, product.id);
                                          }}
                                          className="group/btn relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-1.5 md:py-2.5 px-3 md:px-6 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-emerald-500/50 flex-shrink-0"
                                        >
                                          {/* Glow effect */}
                                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover/btn:opacity-20 blur-xl transition-opacity duration-300"></div>

                                          {/* Button content */}
                                          <span className="relative flex items-center justify-center gap-1.5 md:gap-2 text-xs md:text-base whitespace-nowrap">
                                            <svg className="w-3.5 h-3.5 md:w-5 md:h-5 transition-transform group-hover/btn:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Wybierz
                                          </span>

                                          {/* Shine effect */}
                                          <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          {getProductsForType(type).length === 0 && (
                            <div className="text-center py-8 text-gray-500 italic">
                              Brak dostępnych produktów w tej kategorii dla wybranych filtrów.
                            </div>
                          )}
                        </div>

                        {/* Bottom Collapse Button - small and compact */}
                        <div className="mt-4 pt-4 border-t border-gray-700/30 flex justify-center">
                          <button
                            onClick={() => toggleExpanded(type)}
                            className="px-4 py-2 bg-gray-800/60 text-gray-300 border border-gray-600/50 hover:border-emerald-500/50 hover:bg-gray-700/80 hover:text-emerald-300 rounded-lg font-medium text-xs transition-all duration-300 flex items-center gap-1.5"
                          >
                            <svg className="w-3.5 h-3.5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                            <span>Zwiń</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              ))}
            </div>

            {/* Sidebar - Summary */}
            <div className="lg:col-span-9 w-full">
              <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 p-4 sm:p-6 sticky top-6">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white border-b border-gray-700 pb-3 sm:pb-4">Podsumowanie</h2>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-lg items-center">
                    <span className="text-gray-300">Suma:</span>
                    <span className="font-bold text-3xl text-emerald-400 transition-all duration-300 transform scale-100">
                      <AnimatedPrice value={totalPrice} /> zł
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    // Check if all required components are selected
                    const missingComponents: ComponentType[] = [];
                    COMPONENT_ORDER.forEach((type) => {
                      if (!config.components[type]) {
                        missingComponents.push(type);
                      }
                    });

                    if (missingComponents.length > 0) {
                      setMissingComponents(missingComponents);
                      setShowMissingModal(true);
                      return;
                    }

                    const allProducts = [
                      ...(cpuProducts || []),
                      ...(motherboardProducts || []),
                      ...(gpuProducts || []),
                      ...(ramProducts || []),
                      ...(storageProducts || []),
                      ...(psuProducts || []),
                      ...(caseProducts || []),
                      ...(coolerProducts || []),
                    ];

                    const details: Record<string, string> = {};
                    Object.entries(config.components).forEach(([type, productId]) => {
                      if (productId) {
                        const product = allProducts.find((p) => p.id === productId);
                        if (product) {
                          details[type] = JSON.stringify({
                            id: product.id,
                            name: product.name,
                            price: product.price
                          });
                        }
                      }
                    });

                    const params = new URLSearchParams({
                      ...details,
                      totalPrice: totalPrice.toString(),
                      assemblyService: assemblyService.toString(),
                      segment,
                      budget: budget.toString()
                    });

                    router.push(`/inquiry?${params.toString()}`);
                  }}
                  className="w-full px-6 py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-500/25 transform active:scale-95 mb-8"
                >
                  Zapytaj o wycenę
                </button>

                {/* FPS Guide - Eye-catching */}
                <div className="mb-8 relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-xl blur-xl opacity-50 group-hover:opacity-100 transition-all duration-500 animate-pulse" style={{ animationDuration: '3s' }}></div>
                  <div className="relative bg-gradient-to-br from-emerald-900/40 to-teal-900/40 backdrop-blur-xl rounded-xl border-2 border-emerald-500/50 overflow-hidden hover:border-emerald-400/70 transition-all duration-300 shadow-lg shadow-emerald-500/20">
                    <div className="px-6 py-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/50 group-hover:scale-110 transition-transform duration-300">
                          <span className="text-2xl">📊</span>
                        </div>
                        <h3 className="font-bold text-xl text-emerald-400">Jak sprawdzić wydajność w grach?</h3>
                      </div>
                      <div className="text-gray-300 leading-relaxed space-y-2">
                        <p className="text-sm">
                          Najprostszym sposobem jest wpisanie w YouTube nazwy procesora i karty graficznej z dopiskiem <span className="text-emerald-400 font-semibold">'FPS test'</span>.
                        </p>
                        <p className="text-xs text-gray-400">
                          Zobaczysz tam realne wyniki w popularnych grach AAA. Możesz też skorzystać z naszej pomocy - chętnie doradzimy, jaki zestaw spełni Twoje oczekiwania wydajnościowe.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Assembly Service Section */}
                <div
                  onClick={() => setAssemblyService(!assemblyService)}
                  className="p-4 sm:p-5 rounded-xl border border-gray-700 bg-gradient-to-br from-gray-800/50 to-gray-900/50 transition-all duration-300 hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:bg-gray-800 group cursor-pointer relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-4">
                    <div className="flex-1 w-full">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl sm:text-2xl">🔧</span>
                        <h3 className="text-base sm:text-lg font-bold text-white leading-tight">Montaż z instalacją systemu operacyjnego</h3>
                      </div>
                      <ul className="space-y-2 text-xs sm:text-sm text-gray-300 mb-4">
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-400 mt-0.5">✓</span>
                          <span>Profesjonalny montaż podzespołów</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-400 mt-0.5">✓</span>
                          <span>Instalacja systemu operacyjnego i sterowników</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-400 mt-0.5">✓</span>
                          <span>Testy obciążeniowe i stabilności</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-400 mt-0.5">✓</span>
                          <span>Aktualizacja BIOS</span>
                        </li>
                      </ul>
                      <div className="p-2.5 sm:p-3 bg-emerald-900/20 border border-emerald-700/30 rounded-lg mb-3">
                        <p className="text-xs sm:text-sm text-emerald-300 leading-relaxed">
                          W cenie zapewnimy Ci <span className="font-semibold">pełne serwisowanie i diagnostykę</span> całego zestawu komputerowego przez okres <span className="font-semibold">dwóch lat</span> od dnia, w którym odbierzesz zamówienie.
                        </p>
                      </div>
                      <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1.5 bg-blue-900/30 border border-blue-700/50 rounded-lg">
                        <span className="text-lg sm:text-xl">🎁</span>
                        <span className="text-blue-300 text-xs sm:text-sm font-semibold">Windows 11 Pro GRATIS</span>
                      </div>
                    </div>
                    <div className="flex flex-row sm:flex-col items-center sm:items-end gap-3 w-full sm:w-auto justify-between sm:justify-start">
                      <div className="text-xl sm:text-2xl font-bold text-emerald-400">{ASSEMBLY_PRICE} zł</div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setAssemblyService(!assemblyService);
                        }}
                        className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${assemblyService
                          ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-500/25"
                          : "bg-transparent text-gray-300 hover:bg-gray-700 border border-gray-600"
                          }`}
                      >
                        {assemblyService ? "✓ Dodano" : "Dodaj usługę"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Missing Components Modal */}
      {showMissingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative max-w-md w-full animate-scale-in">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 rounded-2xl blur-xl opacity-50 animate-pulse" style={{ animationDuration: '3s' }}></div>

            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border-2 border-red-500/50 shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-red-600/20 to-orange-600/20 px-6 py-5 border-b border-red-500/30">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">Nie wybrano wszystkich komponentów!</h3>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 py-6">
                <p className="text-gray-300 mb-4 text-sm">
                  Aby wysłać zapytanie o wycenę, musisz wybrać wszystkie wymagane komponenty.
                </p>

                <div className="bg-red-950/30 border border-red-500/30 rounded-xl p-4 mb-6">
                  <p className="text-red-300 font-semibold mb-3 text-sm">Brakujące komponenty:</p>
                  <ul className="space-y-2">
                    {missingComponents.map((type) => (
                      <li key={type} className="flex items-center gap-2 text-gray-200">
                        <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className="text-sm font-medium">{COMPONENT_LABELS[type]}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-gray-400 text-xs italic">
                  Przewiń w górę i wybierz brakujące komponenty z dostępnych opcji.
                </p>
              </div>

              {/* Footer */}
              <div className="bg-gray-900/50 px-6 py-4 border-t border-gray-700">
                <button
                  onClick={() => {
                    setShowMissingModal(false);
                    setMissingComponents([]);
                  }}
                  className="w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold hover:from-emerald-500 hover:to-teal-500 transition-all shadow-lg hover:shadow-emerald-500/25 transform active:scale-95"
                >
                  Rozumiem
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
