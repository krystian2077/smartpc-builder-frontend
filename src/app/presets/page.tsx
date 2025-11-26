"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";

interface Preset {
  id: string;
  name: string;
  description: string | null;
  total_price: number;
  performance_score: number | null;
  priority: number;
  device_type: string;
  segment: string;
  image_url?: string;
}

export default function PresetsPage() {
  const router = useRouter();

  const { data: presets, isLoading } = useQuery({
    queryKey: ["presets"],
    queryFn: async () => {
      const res = await api.get<Preset[]>("/presets");
      return res.data;
    },
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pl-PL", {
      style: "currency",
      currency: "PLN",
      minimumFractionDigits: 0,
    }).format(price);
  };



  const getSeriesName = (price: number) => {
    if (price < 5000) return "START & GAMER";
    if (price < 8000) return "ELITE & MASTER";
    return "ULTRA & LEGEND";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <Link
              href="/"
              className="text-emerald-400 hover:text-emerald-300 mb-4 inline-flex items-center gap-2 transition-colors"
            >
              <span className="text-xl">←</span> Powrót do strony głównej
            </Link>
            <h1 className="text-4xl font-bold text-white mb-2">
              Polecane Zestawy Komputerowe
            </h1>
            <p className="text-gray-400">
              Wybierz gotowy zestaw komputerowy lub zmodyfikuj go według swoich potrzeb
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {presets?.map((preset) => (
              <div
                key={preset.id}
                className="group bg-gray-800 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 cursor-pointer border border-gray-700 hover:border-emerald-500/50 transform hover:-translate-y-1"
                onClick={() => router.push(`/presets/${preset.id}`)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                      {preset.name}
                    </h2>
                    {preset.description && (
                      <p className="text-sm text-gray-400 line-clamp-2 h-10">
                        {preset.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-3 mt-4 pt-4 border-t border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Cena:</span>
                    <span className="text-2xl font-bold text-emerald-400">
                      {formatPrice(preset.total_price)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400 group-hover:text-emerald-400 transition-colors">Seria:</span>
                    <span className="font-semibold text-white group-hover:text-emerald-400 transition-colors">
                      {getSeriesName(preset.total_price)}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/presets/${preset.id}`);
                    }}
                    className="w-full mt-4 px-4 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-500/25"
                  >
                    Zobacz szczegóły →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {presets && presets.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Brak dostępnych zestawów komputerowych
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
