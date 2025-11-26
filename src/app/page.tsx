"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import InfoSection from "@/components/InfoSection";

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
          {/* Header */}
          <header className="text-center mb-16">
            <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500 mb-6">
              SmartPC Builder
            </h1>
            <p className="text-2xl text-gray-300 mb-8 font-light">
              Twój wymarzony komputer w zasięgu ręki.
              <br />
              <span className="text-emerald-400 font-medium">
                Skonfiguruj sam
              </span>{" "}
              lub wybierz{" "}
              <span className="text-emerald-400 font-medium">
                gotowy zestaw
              </span>
              .
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  document
                    .getElementById("configurator")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-4 bg-emerald-600 text-white rounded-full font-semibold text-lg hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-500/25 transform hover:-translate-y-1"
              >
                Rozpocznij konfigurację
              </button>
              <button
                onClick={() => {
                  router.push("/presets");
                }}
                className="px-8 py-4 bg-transparent text-emerald-400 border-2 border-emerald-500/30 rounded-full font-semibold text-lg hover:border-emerald-400 hover:bg-emerald-500/10 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Zobacz polecane
              </button>
            </div>
          </header>

          {/* Featured Presets Section */}
          <section id="featured" className="mb-24">
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Polecane Zestawy 2025
                </h2>
                <p className="text-gray-400">
                  Wyselekcjonowane przez ekspertów PRO-KOM
                </p>
              </div>

              <div className="flex items-center gap-4">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as any)}
                  className="bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-emerald-500"
                >
                  <option value="price_desc">Cena: od najwyższej</option>
                  <option value="price_asc">Cena: od najniższej</option>
                  <option value="series_desc">Seria: od najwyższej</option>
                  <option value="series_asc">Seria: od najniższej</option>
                </select>

                <Link
                  href="/presets"
                  className="text-emerald-400 font-semibold hover:text-emerald-300 flex items-center gap-2 whitespace-nowrap"
                >
                  Zobacz wszystkie <span className="text-xl">→</span>
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
                    onClick={() => router.push(`/presets/${preset.id}`)}
                    className="group bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-700 hover:border-emerald-500/50 transform hover:-translate-y-2"
                  >
                    <div className="h-48 relative overflow-hidden flex items-center justify-center bg-gray-900">
                      {preset.image_url ? (
                        <>
                          {/* Blurred background to fill sides */}
                          <div className="absolute inset-0">
                            <img
                              src={preset.image_url}
                              alt=""
                              className="w-full h-full object-cover blur-md scale-110 opacity-90"
                            />
                            {/* Dark overlay with emerald tint */}
                            <div className="absolute inset-0 bg-black/40"></div>
                            <div className="absolute inset-0 bg-emerald-950/20"></div>
                          </div>
                          {/* Sharp main image on top */}
                          <img
                            src={preset.image_url}
                            alt={preset.name}
                            className="relative z-10 w-full h-full object-contain"
                          />
                        </>
                      ) : (
                        <div className="text-6xl opacity-30 group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0">
                          🖥️
                        </div>
                      )}
                      <div className="absolute top-4 right-4 bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-white shadow-sm border border-gray-700 z-30">
                        {formatPrice(preset.total_price)}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                        {preset.name}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-2 mb-4 h-10">
                        {preset.description}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500 uppercase tracking-wider group-hover:text-emerald-400 transition-colors">
                            Seria
                          </span>
                          <span className="font-bold text-gray-300 group-hover:text-emerald-400 transition-colors">
                            {getSeriesName(preset.total_price)}
                          </span>
                        </div>
                        <button className="w-10 h-10 rounded-full bg-gray-700 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                          →
                        </button>
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
              <h2 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 mb-6">
                Zbuduj Swój Wymarzony PC
              </h2>

              <p className="text-xl md:text-2xl text-gray-300 mb-4">
                Stwórz idealną konfigurację dopasowaną do Twoich potrzeb
              </p>

              <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
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
                className="group relative inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 text-white rounded-2xl font-bold text-xl transition-all transform hover:scale-105 active:scale-95 shadow-2xl hover:shadow-emerald-500/50"
              >
                <span className="relative z-10 drop-shadow-lg">Konfiguruj swój PC</span>
                <svg className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                {/* Animated glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity"></div>
              </button>

              <p className="text-lg text-gray-400 mt-6 font-medium">
                ✨ Bezpłatna konsultacja i pomoc w doborze komponentów
              </p>
            </div>
          </section>

          {/* Info Section - Features, Process, FAQ, Contact */}
          <InfoSection />
        </div>
      </div>
    </main>
  );
}

