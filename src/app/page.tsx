"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import InfoSection from "@/components/InfoSection";

// ... (existing imports)

// ... (inside Home component)



type DeviceType = "pc" | "laptop";
type Segment = "home" | "gaming" | "pro";

const SEGMENT_LABELS: Record<Segment, string> = {
  home: "Home",
  gaming: "Gaming",
  pro: "Pro",
};

const BUDGET_PRESETS = [
  { label: "Do 3000 zł", value: 3000 },
  { label: "3000-5000 zł", value: 5000 },
  { label: "5000-8000 zł", value: 8000 },
  { label: "8000-12000 zł", value: 12000 },
  { label: "Powyżej 12000 zł", value: 15000 },
];

interface Preset {
  id: string;
  name: string;
  description: string;
  total_price: number;
  performance_score: number;
  segment: string;
  image_url?: string; // Assuming we might add this later, or use a placeholder
}

export default function Home() {
  const router = useRouter();
  // Default to 'pc' and remove the state for deviceType if not needed for switching
  const [deviceType] = useState<DeviceType>("pc");
  const [segment, setSegment] = useState<Segment | null>(null);
  const [budget, setBudget] = useState<number>(5000);
  const [customBudget, setCustomBudget] = useState(false);
  const [sortOption, setSortOption] = useState<"price_asc" | "price_desc" | "series_asc" | "series_desc">("price_desc");

  const { data: featuredPresets, isLoading } = useQuery({
    queryKey: ["featuredPresets"],
    queryFn: async () => {
      const res = await api.get<Preset[]>("/presets", {
        params: { limit: 100 },
      });
      return res.data;
    },
  });

  const sortedPresets = [...(featuredPresets || [])].sort((a, b) => {
    switch (sortOption) {
      case "price_asc":
      case "series_asc":
        return a.total_price - b.total_price;
      case "price_desc":
      case "series_desc":
        return b.total_price - a.total_price;
      default:
        return 0;
    }
  });

  const handleStart = () => {
    if (!segment) return;

    const params = new URLSearchParams({
      device: "pc",
      segment,
      budget: budget.toString(),
    });

    router.push(`/configurator?${params.toString()}`);
  };

  const getSeriesName = (price: number) => {
    if (price < 5000) return "START & GAMER";
    if (price < 8000) return "ELITE & MASTER";
    return "ULTRA & LEGEND";
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pl-PL", {
      style: "currency",
      currency: "PLN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section - Elegant Premium */}
          <header className="text-center mb-24 relative">
            {/* Subtle Animated Background */}
            <div className="absolute -inset-20 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-emerald-500/5 via-teal-500/5 to-cyan-500/5 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '6s' }}></div>
              <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gradient-to-r from-blue-500/3 via-teal-500/3 to-emerald-500/3 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }}></div>
            </div>

            <div className="relative z-10">
              {/* Elegant Title */}
              <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
                <span className="text-white drop-shadow-2xl">
                  SmartPC Builder
                </span>
              </h1>

              {/* Clean Subtitle */}
              <p className="text-xl md:text-2xl text-gray-300 mb-4 font-normal max-w-3xl mx-auto leading-relaxed">
                Twój wymarzony komputer w zasięgu ręki.
              </p>
              <p className="text-lg md:text-xl text-gray-400 mb-12 font-light max-w-2xl mx-auto">
                <span className="text-emerald-400 font-semibold">
                  Skonfiguruj sam
                </span>{" "}
                lub wybierz{" "}
                <span className="text-emerald-400 font-semibold">
                  gotowy zestaw
                </span>
                .
              </p>

              {/* Refined CTA Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                {/* Primary Button */}
                <button
                  onClick={() => {
                    document
                      .getElementById("configurator")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group relative px-8 py-4 overflow-hidden rounded-xl font-semibold text-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <span className="relative text-white flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Rozpocznij konfigurację
                  </span>
                </button>

                {/* Secondary Button */}
                <button
                  onClick={() => {
                    router.push("/presets");
                  }}
                  className="group relative px-8 py-4 overflow-hidden rounded-xl font-semibold text-lg transition-all transform hover:scale-105 active:scale-95"
                >
                  <div className="absolute inset-0 bg-gray-800/50 border-2 border-emerald-500/30 group-hover:border-emerald-500/60 rounded-xl backdrop-blur-sm transition-all"></div>
                  <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/5 transition-all rounded-xl"></div>

                  <span className="relative text-emerald-400 group-hover:text-emerald-300 flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    Zobacz polecane
                  </span>
                </button>
              </div>
            </div>
          </header>

          {/* Featured Presets Section - Clean & Elegant */}
          <section id="featured" className="mb-24">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end mb-6 sm:mb-8 gap-4">
              {/* Clean Title Section */}
              <div>
                <div className="inline-block mb-2">
                  <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 font-semibold text-xs tracking-wider uppercase">
                    ⭐ TOP 2025
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                  Polecane Zestawy 2025
                </h2>
                <p className="text-sm sm:text-base text-gray-400 flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Wyselekcjonowane przez ekspertów PRO-KOM
                </p>
              </div>

              {/* Clean Controls */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as any)}
                  className="bg-gray-800/80 text-white border border-gray-700 hover:border-emerald-500/50 rounded-lg px-4 py-3 sm:py-2.5 focus:outline-none focus:border-emerald-500 transition-all font-medium shadow-lg backdrop-blur-sm text-sm w-full sm:w-auto"
                >
                  <option value="price_desc">Cena: od najwyższej</option>
                  <option value="price_asc">Cena: od najniższej</option>
                  <option value="series_desc">Seria: od najwyższej</option>
                  <option value="series_asc">Seria: od najniższej</option>
                </select>

                <Link
                  href="/presets"
                  className="group/link px-5 py-3 sm:py-2.5 bg-gray-800/50 border border-emerald-500/30 hover:border-emerald-500/60 hover:bg-gray-800/80 rounded-lg font-semibold text-emerald-400 hover:text-emerald-300 flex items-center justify-center gap-2 transition-all shadow-lg backdrop-blur-sm text-sm w-full sm:w-auto"
                >
                  <span>Zobacz wszystkie</span>
                  <svg className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-96 bg-gray-800 rounded-2xl animate-pulse border border-gray-700"
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {sortedPresets.map((preset) => (
                  <div
                    key={preset.id}
                    className="group relative animate-fade-in"
                    style={{ animationDelay: `${sortedPresets.indexOf(preset) * 0.1}s` }}
                  >
                    {/* Enhanced glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 animate-pulse-glow"></div>

                    <div
                      onClick={() => router.push(`/presets/${preset.id}`)}
                      className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer border border-gray-700 hover:border-emerald-500/70 transform hover:-translate-y-3 hover:scale-[1.02]"
                    >
                      <div className="h-48 relative overflow-hidden flex items-center justify-center bg-gray-900">
                        {preset.image_url ? (
                          <>
                            <div className="absolute inset-0">
                              <img
                                src={preset.image_url}
                                alt=""
                                className="w-full h-full object-cover blur-md scale-110 opacity-90"
                              />
                              <div className="absolute inset-0 bg-black/40"></div>
                              <div className="absolute inset-0 bg-emerald-950/20"></div>
                            </div>
                            <img
                              src={preset.image_url}
                              alt={preset.name}
                              className="relative z-10 w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                            />
                          </>
                        ) : (
                          <div className="text-6xl opacity-30 group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0 animate-float">
                            🖥️
                          </div>
                        )}
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-gray-900/95 to-gray-800/95 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold text-white shadow-lg border border-emerald-500/40 z-30 group-hover:border-emerald-400/70 group-hover:shadow-emerald-500/50 transition-all group-hover:scale-110">
                          {formatPrice(preset.total_price)}
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-teal-400 transition-all duration-300 line-clamp-2">
                          {preset.name}
                        </h3>
                        <p className="text-gray-400 text-sm line-clamp-2 mb-4 h-10 group-hover:text-gray-300 transition-colors">
                          {preset.description}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-700 group-hover:border-emerald-500/50 transition-all duration-300">
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-500 uppercase tracking-wider group-hover:text-emerald-400 transition-colors">
                              Seria
                            </span>
                            <span className="font-bold text-gray-300 group-hover:text-emerald-400 transition-colors">
                              {getSeriesName(preset.total_price)}
                            </span>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 text-emerald-400 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-emerald-600 group-hover:to-teal-600 group-hover:text-white transition-all group-hover:scale-125 group-hover:rotate-12 shadow-lg group-hover:shadow-emerald-500/50">
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Configurator Section */}
          <section
            id="configurator"
            className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 rounded-3xl shadow-2xl p-12 md:p-16 border border-emerald-500/20 overflow-hidden"
          >
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
              <div className="absolute top-10 right-10 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="relative z-10 text-center max-w-4xl mx-auto">
              {/* Icon */}
              <div className="mb-8 inline-block">
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-2xl animate-pulse"></div>
                  <div className="relative bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-full p-6 shadow-lg shadow-emerald-500/50">
                    <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Heading */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 mb-6 leading-tight">
                Zbuduj Swój Wymarzony PC
              </h2>

              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 leading-relaxed px-4 sm:px-0">
                Stwórz idealną konfigurację dopasowaną do Twoich potrzeb
              </p>

              <p className="text-base sm:text-lg text-gray-400 mb-10 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
                Nasz inteligentny konfigurator pomoże Ci wybrać najlepsze komponenty. Wybierz każdą część osobno i zbuduj komputer swoich marzeń! 🚀
              </p>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                  <div className="text-4xl mb-3">⚡</div>
                  <h3 className="text-lg font-bold text-white mb-2">Szybko i łatwo</h3>
                  <p className="text-sm text-gray-400">Intuicyjny proces konfiguracji</p>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                  <div className="text-4xl mb-3">🎯</div>
                  <h3 className="text-lg font-bold text-white mb-2">Pełna kontrola</h3>
                  <p className="text-sm text-gray-400">Wybierz każdy komponent</p>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                  <div className="text-4xl mb-3">💰</div>
                  <h3 className="text-lg font-bold text-white mb-2">Najlepsze ceny</h3>
                  <p className="text-sm text-gray-400">Konkurencyjne oferty</p>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => router.push('/configurator?device=pc&segment=gaming&budget=5000')}
                className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-12 py-5 sm:py-6 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 text-white rounded-2xl font-bold text-lg sm:text-xl transition-all transform hover:scale-105 active:scale-95 shadow-2xl hover:shadow-emerald-500/50 w-full sm:w-auto max-w-md mx-auto"
              >
                <span className="relative z-10 drop-shadow-lg">Konfiguruj swój PC</span>
                <svg className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 group-hover:translate-x-1 transition-transform drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                {/* Animated glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity"></div>
              </button>

              <p className="text-base sm:text-lg text-gray-400 mt-6 font-medium leading-relaxed px-4 sm:px-0">
                ✨ Bezpłatna konsultacja i pomoc w doborze komponentów
              </p>
            </div>
          </section>
          {/* Info & FAQ Section */}
          <InfoSection />
        </div>
      </div>
    </main>
  );
}

