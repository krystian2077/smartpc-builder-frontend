'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

import ContactModal from '@/components/ContactModal';
import CompanyDetailsModal from '@/components/CompanyDetailsModal';

interface Product {
  id: string;
  name: string;
  type: string;
  price: number;
  image_url?: string;
  description?: string;
  specifications: Record<string, any>;
}

interface Preset {
  id: string;
  name: string;
  description: string;
  total_price: number;
  performance_score: number;
  products: Product[];
  image_url?: string;
}

export default function PresetDetails() {
  const params = useParams();
  const router = useRouter();
  const [preset, setPreset] = useState<Preset | null>(null);
  const [loading, setLoading] = useState(true);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [contactType, setContactType] = useState<'quote_request' | 'general_contact' | 'configuration_check' | 'find_for_me'>('quote_request');
  const [showFpsGuide, setShowFpsGuide] = useState(false);

  useEffect(() => {
    const fetchPreset = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/presets/${params.id}/details`);
        if (!res.ok) throw new Error('Failed to fetch preset');
        const data = await res.json();
        setPreset(data);
      } catch (error) {
        console.error('Error fetching preset:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchPreset();
    }
  }, [params.id]);

  const getPolishTypeName = (type: string): string => {
    const typeMap: Record<string, string> = {
      'cpu': 'Procesor',
      'gpu': 'Karta graficzna',
      'motherboard': 'Płyta główna',
      'ram': 'Pamięć RAM',
      'storage': 'Dysk',
      'psu': 'Zasilacz',
      'case': 'Obudowa',
      'cooler': 'Chłodzenie',
      'laptop': 'Laptop'
    };
    return typeMap[type.toLowerCase()] || type;
  };

  const getComponentDescription = (product: Product): string => {
    const specs = product.specifications;
    const type = product.type.toLowerCase();

    switch (type) {
      case 'cpu':
        const cores = specs.cores || specs.core_count;
        const socket = specs.socket;
        return `${cores} rdzeni, nowoczesna architektura ${socket || 'AM5/LGA1700'}`;

      case 'gpu':
        const vram = specs.vram || specs.memory;
        return `${vram || '8GB'} VRAM - wydajna karta do gier AAA, ray tracing`;

      case 'ram':
        const capacity = specs.capacity || specs.size;
        const speed = specs.speed || specs.frequency;
        return `${capacity || '32GB'} DDR${specs.type || '5'} ${speed || '6000'}MHz - szybka, gotowa pod gry i multitasking`;

      case 'motherboard':
        const chipset = specs.chipset;
        const formFactor = specs.form_factor;
        return `${chipset || 'B650'} - nowoczesne złącza, DDR5, stabilna baza pod rozbudowę`;

      case 'storage':
        const storageCapacity = specs.capacity || specs.size;
        const interface_type = specs.interface;
        return `${storageCapacity || '1TB'} ${interface_type || 'NVMe'} - szybki dysk, duża pojemność`;

      case 'psu':
        const wattage = specs.wattage || specs.power;
        const efficiency = specs.efficiency || specs.certification;
        return `${wattage || '750'}W, certyfikat ${efficiency || '80+ Bronze'}, stabilne zasilanie`;

      case 'case':
        return `Przestronna, dobry przepływ powietrza, nowoczesny design`;

      case 'cooler':
        const coolerType = specs.type;
        return `${coolerType === 'aio' ? 'Chłodzenie wodne AIO' : 'Wydajne chłodzenie'} - cicho i chłodno`;

      default:
        return 'Wysokowydajny komponent';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!preset) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <h1 className="text-2xl mb-4">Preset not found</h1>
        <Link href="/" className="text-emerald-400 hover:text-emerald-300">
          Return to Home
        </Link>
      </div>
    );
  }

  const handleContact = (type: 'quote_request' | 'general_contact') => {
    setContactType(type);
    setIsContactModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors group">
          <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Powrót do zestawów
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Image & Key Info */}
          <div className="lg:col-span-1 space-y-8">
            {/* Image Card with WOW effect */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-xl hover:border-emerald-500/50 transition-all duration-300">
                <div className="aspect-square bg-gray-900 rounded-xl overflow-hidden relative flex items-center justify-center mb-8">
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
                        className="relative z-10 w-full h-full object-contain scale-125 group-hover:scale-[1.3] transition-transform duration-500"
                      />
                    </>
                  ) : (
                    <svg className="w-32 h-32 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )}
                </div>

                {(() => {
                  const nameMatch = preset.name.match(/^(.*?)\s*(\(.*\))$/);
                  if (nameMatch) {
                    return (
                      <div className="mb-4">
                        <h1 className="text-2xl font-bold text-white leading-tight mb-1">
                          {nameMatch[1]}
                        </h1>
                        <div className="text-sm text-gray-400 font-medium">
                          {nameMatch[2]}
                        </div>
                      </div>
                    );
                  }
                  return <h1 className="text-2xl font-bold mb-4 leading-tight">{preset.name}</h1>;
                })()}
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 mb-6">
                  {preset.total_price.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' })}
                </div>

                <div className="space-y-4">
                  <button
                    onClick={() => handleContact('quote_request')}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-emerald-500/50"
                  >
                    Zapytaj o dostępność
                  </button>
                  <button
                    onClick={() => setIsCompanyModalOpen(true)}
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-all border border-gray-600 hover:border-emerald-500/50"
                  >
                    Skontaktuj się z nami
                  </button>
                </div>
              </div>
            </div>

            {/* Performance Score with WOW effect */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-emerald-500/50 transition-all duration-300">
                <h3 className="text-lg font-semibold mb-4 text-gray-200 flex items-center gap-2">
                  <span className="text-2xl">🎮</span>
                  Performance Score
                </h3>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-emerald-200 bg-emerald-900/50">
                        Gaming Power
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-emerald-200">
                        {Math.round(preset.performance_score)}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-700">
                    <div
                      style={{ width: `${Math.min(100, Math.round(preset.performance_score))}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-1000"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* FPS Guide - Collapsible */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl blur-xl opacity-50 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-xl border-2 border-emerald-500/40 overflow-hidden hover:border-emerald-400/60 transition-all duration-300">
                <button
                  onClick={() => setShowFpsGuide(!showFpsGuide)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-emerald-500/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                      <span className="text-xl">📊</span>
                    </div>
                    <span className="font-bold text-emerald-400 text-left">Jak sprawdzić wydajność w grach?</span>
                  </div>
                  <svg
                    className={`w-5 h-5 text-emerald-400 transition-transform duration-300 ${showFpsGuide ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out ${showFpsGuide ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}
                >
                  <div className="px-6 pb-6 pt-2 text-gray-300 leading-relaxed border-t border-emerald-500/30">
                    <p className="mb-3">
                      Najprostszym sposobem jest wpisanie w YouTube nazwy procesora i karty graficznej z dopiskiem 'FPS test'.
                    </p>
                    <p className="text-sm text-gray-400 mb-3">
                      Przykład: <span className="text-emerald-400 font-mono">"Ryzen 5 7500F RTX 4070 FPS test"</span>
                    </p>
                    <p className="text-sm">
                      Zobaczysz tam realne wyniki w popularnych grach AAA. Możesz też skorzystać z naszej pomocy - chętnie doradzimy, jaki zestaw spełni Twoje oczekiwania wydajnościowe.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Details & Components */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description with WOW effect */}
            <div className="relative group animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-emerald-500/30 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-white group-hover:text-emerald-400 transition-colors">
                  <span className="text-3xl animate-bounce-slow">📝</span>
                  Opis zestawu
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mb-6 group-hover:w-32 transition-all duration-500"></div>
                <p className="text-gray-300 leading-relaxed text-lg font-light tracking-wide">
                  {preset.description}
                </p>
              </div>
            </div>

            {/* Components with descriptions */}
            <div className="relative group animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-emerald-500/30 transition-all duration-300 shadow-xl">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white group-hover:text-emerald-400 transition-colors">
                  <span className="text-3xl animate-spin-slow">⚙️</span>
                  Komponenty
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mb-8 group-hover:w-32 transition-all duration-500"></div>
                <div className="grid gap-4">
                  {preset.products.map((product) => (
                    <div
                      key={product.id}
                      className="group/item relative"
                    >
                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl blur-lg opacity-0 group-hover/item:opacity-100 transition-all duration-500"></div>

                      <div className="relative flex items-start p-5 bg-gradient-to-br from-gray-700/30 to-gray-800/30 rounded-xl border border-gray-700 hover:border-emerald-500/50 hover:bg-gray-700/50 transition-all duration-300">
                        <div className="w-14 h-14 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center mr-4 group-hover/item:scale-110 transition-transform duration-300 border border-gray-700 group-hover/item:border-emerald-500/50">
                          <span className="text-3xl">
                            {product.type === 'cpu' ? '🧠' :
                              product.type === 'gpu' ? '🎮' :
                                product.type === 'ram' ? '🚀' :
                                  product.type === 'motherboard' ? '💻' :
                                    product.type === 'storage' ? '💿' :
                                      product.type === 'psu' ? '⚡' :
                                        product.type === 'case' ? '🌟' :
                                          product.type === 'cooler' ? '❄️' : '🔧'}
                          </span>
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-grow">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-semibold px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/30">
                                  {getPolishTypeName(product.type)}
                                </span>
                              </div>
                              <h3 className="font-bold text-lg text-white group-hover/item:text-emerald-400 transition-colors">
                                {product.name}
                              </h3>
                              <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                                {getComponentDescription(product)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        type={contactType}
        presetName={preset.name}
        presetId={preset.id}
      />

      <CompanyDetailsModal
        isOpen={isCompanyModalOpen}
        onClose={() => setIsCompanyModalOpen(false)}
      />
    </div>
  );
}
