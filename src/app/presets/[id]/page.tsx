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

  useEffect(() => {
    const fetchPreset = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/v1/presets/${params.id}/details`);
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
      'cpu': 'PROCESOR',
      'gpu': 'KARTA GRAFICZNA',
      'motherboard': 'PŁYTA GŁÓWNA',
      'ram': 'PAMIĘĆ RAM',
      'storage': 'DYSK',
      'psu': 'ZASILACZ',
      'case': 'OBUDOWA',
      'cooler': 'CHŁODZENIE',
      'laptop': 'LAPTOP'
    };
    return typeMap[type.toLowerCase()] || type.toUpperCase();
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
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Powrót do zestawów
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Image & Key Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-xl">
              <div className="aspect-square bg-gray-900 rounded-xl overflow-hidden relative flex items-center justify-center mb-8">
                {preset.image_url ? (
                  <>
                    {/* Blurred background to fill space */}
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
                      className="relative z-10 w-full h-full object-contain scale-125"
                    />
                  </>
                ) : (
                  <svg className="w-32 h-32 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )}
              </div>

              <h1 className="text-3xl font-bold mb-2">{preset.name}</h1>
              <div className="text-4xl font-bold text-emerald-400 mb-6">
                {preset.total_price.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' })}
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => handleContact('quote_request')}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-emerald-500/25"
                >
                  Zapytaj o dostępność
                </button>
                <button
                  onClick={() => setIsCompanyModalOpen(true)}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-all border border-gray-600"
                >
                  Skontaktuj się z nami
                </button>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4 text-gray-200">Performance Score</h3>
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
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Details & Components */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
              <h2 className="text-2xl font-bold mb-4">Opis zestawu</h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                {preset.description}
              </p>
            </div>

            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
              <h2 className="text-2xl font-bold mb-6">Komponenty</h2>
              <div className="grid gap-4">
                {preset.products.map((product) => (
                  <div
                    key={product.id}
                    className="group flex items-center p-4 bg-gray-700/30 rounded-xl border border-gray-700 hover:border-emerald-500/50 hover:bg-gray-700/50 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                      {/* Icon based on type */}
                      <span className="text-2xl">
                        {product.type === 'cpu' ? '🧠' :
                          product.type === 'gpu' ? '🎮' :
                            product.type === 'ram' ? '💾' :
                              product.type === 'motherboard' ? '🔌' :
                                product.type === 'storage' ? '💿' :
                                  product.type === 'psu' ? '⚡' :
                                    product.type === 'case' ? '📦' :
                                      product.type === 'cooler' ? '❄️' : '🔧'}
                      </span>
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg text-white group-hover:text-emerald-400 transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-400 mt-1">
                            {getPolishTypeName(product.type)} • {product.description || 'Wysokowydajny komponent'}
                          </p>
                        </div>
                        <span className="font-mono text-gray-400 group-hover:text-white transition-colors">
                          {product.price.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
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
