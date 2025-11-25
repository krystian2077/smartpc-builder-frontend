"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ThankYouPageContent() {
  const searchParams = useSearchParams();
  const refNumber = searchParams.get("ref");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-3xl mx-auto px-4 relative z-10">
        <div className="bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700 p-12 text-center">
          {/* Success icon with animation */}
          <div className="mb-8 relative">
            <div className="inline-block relative">
              <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full p-6 shadow-lg shadow-emerald-500/50">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
            🎉 Gratulacje!
          </h1>

          <p className="text-2xl text-gray-300 mb-3">
            Twoje zapytanie zostało wysłane
          </p>

          <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
            Dziękujemy za zaufanie! Nasz zespół już pracuje nad przygotowaniem najlepszej oferty dla Twojego wymarzonego komputera. Skontaktujemy się z Tobą wkrótce! 🚀
          </p>

          {/* Reference number box */}
          {refNumber && (
            <div className="bg-gradient-to-br from-emerald-900/40 to-emerald-800/40 border-2 border-emerald-500/50 rounded-2xl p-8 mb-8 backdrop-blur-sm">
              <div className="flex items-center justify-center gap-2 mb-3">
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <p className="text-sm font-semibold text-emerald-300 uppercase tracking-wide">
                  Numer referencyjny
                </p>
              </div>
              <p className="text-3xl font-bold text-emerald-400 mb-3 font-mono tracking-wider">
                {refNumber}
              </p>
              <p className="text-sm text-emerald-300/80">
                💾 Zachowaj ten numer - przyda się przy kontakcie z nami
              </p>
            </div>
          )}

          {/* Info cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-700/50 rounded-xl p-4 border border-gray-600">
              <div className="text-3xl mb-2">⚡</div>
              <p className="text-sm font-semibold text-white mb-1">Szybka odpowiedź</p>
              <p className="text-xs text-gray-400">Odezwiemy się w ciągu 24h</p>
            </div>
            <div className="bg-gray-700/50 rounded-xl p-4 border border-gray-600">
              <div className="text-3xl mb-2">💎</div>
              <p className="text-sm font-semibold text-white mb-1">Najlepsza oferta</p>
              <p className="text-xs text-gray-400">Dopasowana do Twoich potrzeb</p>
            </div>
            <div className="bg-gray-700/50 rounded-xl p-4 border border-gray-600">
              <div className="text-3xl mb-2">🛡️</div>
              <p className="text-sm font-semibold text-white mb-1">Gwarancja jakości</p>
              <p className="text-xs text-gray-400">Profesjonalna obsługa</p>
            </div>
          </div>

          {/* CTA Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl font-bold hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg shadow-emerald-500/25 transform hover:scale-105 active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Powrót do strony głównej
          </Link>

          {/* Additional message */}
          <p className="text-sm text-gray-500 mt-8">
            Masz pytania? Skontaktuj się z nami: <a href="mailto:kontakt@pro-kom.eu" className="text-emerald-400 hover:text-emerald-300 underline">kontakt@pro-kom.eu</a>
          </p>
        </div>
      </div>
    </div>
  );
}

