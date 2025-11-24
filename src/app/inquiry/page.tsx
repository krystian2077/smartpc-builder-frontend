"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";

export default function InquiryPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    consent_contact: false,
    consent_rodo: false,
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post("/inquiries", data);
      return res.data;
    },
    onSuccess: (data) => {
      router.push(`/inquiry/thank-you?ref=${data.reference_number}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent_rodo) {
      alert("Musisz wyrazić zgodę na przetwarzanie danych (RODO)");
      return;
    }

    // Parse component details from URL params
    const componentTypes = ["cpu", "motherboard", "gpu", "ram", "storage", "psu", "case", "cooler"];
    const components: Record<string, any> = {};

    componentTypes.forEach((type) => {
      const componentData = searchParams.get(type);
      if (componentData) {
        try {
          components[type] = JSON.parse(componentData);
        } catch (e) {
          // If parsing fails, store as string (backward compatibility)
          components[type] = componentData;
        }
      }
    });

    const inquiryData = {
      ...formData,
      inquiry_type: "quote_request",
      source: "configurator",
      configuration_data: {
        device: searchParams.get("device"),
        segment: searchParams.get("segment"),
        budget: searchParams.get("budget"),
        totalPrice: searchParams.get("totalPrice"),
        assemblyService: searchParams.get("assemblyService") === "true",
        components: components,
      },
    };

    mutation.mutate(inquiryData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <header className="mb-8">
            <button
              onClick={() => router.back()}
              className="text-emerald-400 hover:text-emerald-300 mb-4 flex items-center transition-colors group"
            >
              <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Powrót do konfiguratora
            </button>
            <h1 className="text-4xl font-bold text-white mb-2">
              Formularz zapytania ofertowego
            </h1>
            <p className="text-gray-400">
              Wypełnij formularz, a skontaktujemy się z Tobą w sprawie wyceny
            </p>
          </header>

          <form onSubmit={handleSubmit} className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border-2 border-emerald-500/20 p-8 space-y-6 animate-fade-in overflow-hidden">
            {/* Animated background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-2xl blur-xl opacity-50 animate-pulse-glow pointer-events-none"></div>
            <div className="relative z-10 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Imię *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.first_name}
                    onChange={(e) =>
                      setFormData({ ...formData, first_name: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-gray-700 focus:shadow-lg focus:shadow-emerald-500/20 transition-all duration-300 hover:border-emerald-500/50"
                    placeholder="Jan"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Nazwisko *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.last_name}
                    onChange={(e) =>
                      setFormData({ ...formData, last_name: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                    placeholder="Kowalski"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  placeholder="jan.kowalski@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Telefon
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  placeholder="+48 123 456 789"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Wiadomość
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all resize-none"
                  placeholder="Dodatkowe informacje lub pytania..."
                />
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-700">
                <label className="flex items-start cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData.consent_contact}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        consent_contact: e.target.checked,
                      })
                    }
                    className="mt-1 mr-3 w-4 h-4 text-emerald-600 bg-gray-700 border-gray-600 rounded focus:ring-emerald-500 focus:ring-2"
                  />
                  <span className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors">
                    Wyrażam zgodę na kontakt w sprawie zapytania
                  </span>
                </label>
                <label className="flex items-start cursor-pointer group">
                  <input
                    type="checkbox"
                    required
                    checked={formData.consent_rodo}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        consent_rodo: e.target.checked,
                      })
                    }
                    className="mt-1 mr-3 w-4 h-4 text-emerald-600 bg-gray-700 border-gray-600 rounded focus:ring-emerald-500 focus:ring-2"
                  />
                  <span className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors">
                    Wyrażam zgodę na przetwarzanie danych osobowych (RODO) *
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full px-6 py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-500/25 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {mutation.isPending ? "Wysyłanie..." : "Wyślij zapytanie"}
              </button>

              {mutation.isError && (
                <div className="p-4 bg-red-900/20 border border-red-700/50 rounded-lg text-red-400 text-sm">
                  Wystąpił błąd podczas wysyłania formularza. Spróbuj ponownie.
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}



