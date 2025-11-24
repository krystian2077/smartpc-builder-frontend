'use client';

import { useState } from 'react';

export default function InfoSection() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const stats = [
        { number: "500+", label: "Zadowolonych klientów", icon: "👥" },
        { number: "2-5", label: "Dni realizacji", icon: "⚡" },
        { number: "24", label: "Miesiące gwarancji", icon: "🛡️" },
        { number: "100%", label: "Testów jakości", icon: "✓" },
    ];

    const features = [
        {
            icon: "🔧",
            title: "Montaż na bieżąco",
            description: "Każdy komputer składamy od podstaw specjalnie dla Ciebie",
            highlight: "Nie sprzedajemy magazynowych 'leżaków'"
        },
        {
            icon: "👨‍🔧",
            title: "Autorski montaż",
            description: "Osobiste podejście do każdego zestawu",
            highlight: "Precyzja, estetyka i dbałość o detale"
        },
        {
            icon: "🖥️",
            title: "Gotowy do akcji",
            description: "Windows 11 Pro, BIOS, sterowniki - wszystko skonfigurowane",
            highlight: "Włączasz i działasz od razu"
        },
        {
            icon: "📦",
            title: "Pancerne pakowanie",
            description: "Profesjonalne zabezpieczenie na czas transportu",
            highlight: "Pianka + karton + folia bąbelkowa"
        },
        {
            icon: "🚚",
            title: "Ubezpieczona przesyłka",
            description: "Kurier z pełnym ubezpieczeniem wartości",
            highlight: "Zero ryzyka podczas dostawy"
        },
        {
            icon: "🎨",
            title: "Pełna personalizacja",
            description: "Zmiana komponentów? Żaden problem!",
            highlight: "Dostosujemy zestaw do Twoich potrzeb"
        },
        {
            icon: "💬",
            title: "Wsparcie eksperta",
            description: "Kontakt bezpośredni z nami",
            highlight: "Bez botów, bez infolinii, bez czekania"
        },
        {
            icon: "📄",
            title: "Faktura VAT 23%",
            description: "Pełna dokumentacja finansowa",
            highlight: "Wszystko legalnie i na firmę"
        },
    ];

    const processes = [
        {
            step: "01",
            title: "Aktualizacja BIOS",
            description: "Najnowsze oprogramowanie płyty głównej"
        },
        {
            step: "02",
            title: "Stress testy",
            description: "Testy obciążeniowe CPU i GPU"
        },
        {
            step: "03",
            title: "Optymalizacja RAM",
            description: "Ustawienie profili XMP/EXPO"
        },
        {
            step: "04",
            title: "Cable management",
            description: "Perfekcyjne ułożenie okablowania"
        },
        {
            step: "05",
            title: "Konfiguracja wentylatorów",
            description: "Optymalna kultura pracy"
        },
        {
            step: "06",
            title: "Kontrola jakości",
            description: "Finalna inspekcja przed wysyłką"
        },
    ];

    const faqs = [
        {
            question: "Ile trwa realizacja zamówienia?",
            answer: "Każdy komputer składamy na indywidualne zamówienie. Zazwyczaj proces ten zajmuje od 2 do 5 dni roboczych, w zależności od dostępności komponentów i obłożenia serwisu. Priorytetowo traktujemy jakość - nie śpieszymy się kosztem dokładności."
        },
        {
            question: "Czy komputer ma zainstalowany system Windows?",
            answer: "Tak! Każdy zestaw ma preinstalowany system Windows 11 Pro (wersja próbna lub aktywowana, jeśli dokupisz licencję). Dodatkowo wgrywamy wszystkie sterowniki, aktualizujemy BIOS i konfigurujemy system. Komputer jest gotowy do pracy od razu po wyjęciu z pudełka - wystarczy podłączyć i włączyć."
        },
        {
            question: "Co robicie z komputerem przed wysyłką?",
            answer: "Każda jednostka przechodzi 6-etapowy proces kontroli jakości: aktualizację BIOS-u płyty głównej, rygorystyczne testy obciążeniowe (stress testy CPU i GPU), konfigurację krzywych wentylatorów dla optymalnej kultury pracy, ustawienie profili pamięci RAM (XMP/EXPO), perfekcyjne ułożenie kabli (cable management) oraz finalną inspekcję. To gwarancja, że otrzymasz w pełni przetestowany i zoptymalizowany sprzęt."
        },
        {
            question: "Jak wygląda gwarancja?",
            answer: "Udzielamy 24-miesięcznej gwarancji na każdy zestaw. W razie problemów kontaktujesz się bezpośrednio z nami - bez czekania na infolinię, bez automatów. Oferujemy wsparcie door-to-door (kurier odbiera i dostarcza) lub szybki serwis w naszej siedzibie. Twój spokój to nasz priorytet."
        },
        {
            question: "Jak pakujecie komputery do wysyłki?",
            answer: "Bezpieczeństwo to absolutny priorytet. Wnętrze komputera wypełniamy specjalną pianką lub wypełniaczami, aby usztywnić ciężkie elementy (szczególnie kartę graficzną). Całość pakujemy w oryginalny karton od obudowy, a następnie w dodatkowy, wzmocniony karton transportowy z dużą ilością folii bąbelkowej. Każda przesyłka jest w pełni ubezpieczona."
        },
        {
            question: "Czy mogę zobaczyć, jak składacie mój komputer?",
            answer: "Oczywiście! Często relacjonujemy proces składania na naszych mediach społecznościowych. Jeśli chcesz, możemy również podesłać Ci zdjęcia z montażu Twojej konkretnej jednostki - wystarczy o to poprosić przy składaniu zamówienia. Transparentność to podstawa zaufania."
        },
        {
            question: "Jak sprawdzić wydajność w grach?",
            answer: "Najprostszym sposobem jest wpisanie w YouTube nazwy procesora i karty graficznej z dopiskiem 'FPS test' (np. 'Ryzen 5 7500F RTX 4070 FPS test'). Zobaczysz tam realne wyniki w popularnych grach AAA. Możesz też skorzystać z naszej pomocy - chętnie doradzimy, jaki zestaw spełni Twoje oczekiwania wydajnościowe."
        },
    ];

    return (
        <section className="relative py-32 bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
            </div>

            <div className="container mx-auto px-4 max-w-7xl relative z-10">

                {/* Hero Section */}
                <div className="text-center mb-20">
                    <div className="inline-block mb-6">
                        <span className="px-6 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 font-semibold text-sm tracking-wider uppercase backdrop-blur-sm">
                            ✨ Profesjonalny montaż komputerów
                        </span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-extrabold mb-6">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
                            Dlaczego SmartPC Builder?
                        </span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Stawiamy na <span className="text-emerald-400 font-semibold">jakość</span>, <span className="text-emerald-400 font-semibold">transparentność</span> i <span className="text-emerald-400 font-semibold">profesjonalizm</span>.
                        <br />Zobacz, co zyskujesz wybierając nasze zestawy.
                    </p>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-50"></div>
                            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 text-center hover:border-emerald-500/50 transition-all hover:-translate-y-1">
                                <div className="text-4xl mb-2">{stat.icon}</div>
                                <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Features Grid */}
                <div className="mb-32">
                    <div className="text-center mb-16">
                        <h3 className="text-3xl md:text-4xl font-bold mb-4">Co dostajesz w zestawie</h3>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Każdy element naszej usługi został zaprojektowany z myślą o Twoim komforcie i bezpieczeństwie
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, idx) => (
                            <div
                                key={idx}
                                className="group relative"
                            >
                                {/* Glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>

                                {/* Card */}
                                <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-2 h-full">
                                    <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                                        {feature.icon}
                                    </div>
                                    <h4 className="text-xl font-bold mb-3 text-white group-hover:text-emerald-400 transition-colors">
                                        {feature.title}
                                    </h4>
                                    <p className="text-gray-400 text-sm leading-relaxed mb-3">
                                        {feature.description}
                                    </p>
                                    <div className="pt-3 border-t border-gray-700/50">
                                        <p className="text-emerald-400 text-xs font-semibold">
                                            ✓ {feature.highlight}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Process Section */}
                <div className="mb-32">
                    <div className="text-center mb-16">
                        <h3 className="text-3xl md:text-4xl font-bold mb-4">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
                                Nasz proces kontroli jakości
                            </span>
                        </h3>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            6 etapów, które przechodzi każdy komputer przed wysyłką
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {processes.map((process, idx) => (
                            <div key={idx} className="relative group">
                                {/* Enhanced Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl group-hover:blur-2xl"></div>

                                <div className="relative bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] group-hover:bg-gray-800/60">
                                    <div className="flex items-start gap-5">
                                        <div className="flex-shrink-0 relative">
                                            <div className="absolute inset-0 bg-emerald-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
                                            <div className="relative w-14 h-14 bg-gradient-to-br from-gray-800 to-gray-900 border border-emerald-500/30 rounded-xl flex items-center justify-center font-bold text-xl text-emerald-400 shadow-lg group-hover:scale-110 transition-transform duration-300 group-hover:border-emerald-500/70">
                                                {process.step}
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg text-white mb-2 group-hover:text-emerald-300 transition-colors">
                                                {process.title}
                                            </h4>
                                            <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                                                {process.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="max-w-4xl mx-auto mb-20">
                    <div className="text-center mb-16">
                        <h3 className="text-3xl md:text-4xl font-bold mb-4">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
                                Często zadawane pytania
                            </span>
                        </h3>
                        <p className="text-gray-400">
                            Wszystko, co musisz wiedzieć o naszych usługach
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <div
                            key={idx}
                            className={`group relative rounded-2xl transition-all duration-500 ${openFaq === idx
                                    ? 'bg-gray-800/90 border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.25)]'
                                    : 'bg-gray-800/40 border-gray-700/50 hover:border-emerald-500 hover:bg-gray-800/80 hover:shadow-[0_0_25px_rgba(16,185,129,0.2)]'
                                } border backdrop-blur-xl overflow-hidden`}
                        >
                            {/* Premium Glow Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-emerald-500/5 opacity-0 transition-opacity duration-500 ${openFaq === idx || 'group-hover:opacity-100'
                                } pointer-events-none`}></div>

                            <button
                                onClick={() => toggleFaq(idx)}
                                className="w-full px-8 py-6 text-left flex justify-between items-center relative z-10"
                            >
                                <span className={`font-bold text-lg pr-8 transition-colors duration-300 ${openFaq === idx ? 'text-emerald-400' : 'text-gray-200 group-hover:text-emerald-300'
                                    }`}>
                                    {faq.question}
                                </span>
                                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-500 ${openFaq === idx
                                        ? 'bg-emerald-500 text-white border-emerald-400 rotate-180 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                                        : 'bg-gray-800 border-gray-600 text-gray-400 group-hover:border-emerald-500 group-hover:text-emerald-400 group-hover:shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                                    }`}>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </button>

                            <div
                                className={`transition-all duration-500 ease-in-out ${openFaq === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="px-8 pb-8 pt-0 text-gray-300 leading-relaxed relative z-10">
                                    <div className="h-px w-full bg-gradient-to-r from-emerald-500/50 via-emerald-500/20 to-transparent mb-6"></div>
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Contact CTA */}
            <div className="relative mb-32">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-3xl blur-2xl"></div>
                <div className="relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl p-12 rounded-3xl border border-emerald-500/30 text-center">
                    <div className="text-5xl mb-6">💬</div>
                    <h3 className="text-3xl font-bold mb-4">Masz pytania? Jesteśmy tu dla Ciebie!</h3>
                    <p className="text-gray-300 mb-10 max-w-2xl mx-auto text-lg">
                        Skontaktuj się z nami bezpośrednio. Bez botów, bez infolinii - tylko konkretna pomoc od ekspertów.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <a
                            href="mailto:sklep@pro-kom.eu"
                            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-2xl hover:shadow-emerald-500/50"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span>sklep@pro-kom.eu</span>
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity"></div>
                        </a>
                        <a
                            href="tel:733400896"
                            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-xl font-bold text-lg transition-all border-2 border-gray-600 hover:border-emerald-500/50 backdrop-blur-sm"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span>733-400-896</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Company Info Section */}
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-3xl blur-3xl"></div>

                <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-700/50 overflow-hidden">
                    {/* Header */}
                    <div className="text-center pt-16 pb-12 px-6">
                        <div className="inline-block mb-6">
                            <span className="px-6 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 font-semibold text-sm tracking-wider uppercase backdrop-blur-sm">
                                🏢 O nas
                            </span>
                        </div>
                        <h3 className="text-4xl md:text-5xl font-extrabold mb-4">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
                                PRO-KOM
                            </span>
                        </h3>
                        <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            Dla nas nie jesteś przysłowiowym Kowalskim, którego trzeba odfajkować i o nim zapomnieć. Dla nas każdy klient traktowany jest jak gość pięciogwiazdkowego hotelu, dlatego może liczyć na to, że będziemy dokładać wszelkich starań, aby był zadowolony. <span className="text-emerald-400 font-semibold">Zostań naszym klientem, a z pewnością nie będziesz chciał współpracować z innymi!</span>
                        </p>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-6 pb-16">

                        {/* Left Column - Store Photo */}
                        <div className="space-y-6">
                            <div className="relative group overflow-hidden rounded-2xl">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                                <img
                                    src="/store-photo.jpg"
                                    alt="Sklep PRO-KOM w Rabce-Zdroju"
                                    className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                                    <div className="flex items-center gap-3 text-white">
                                        <div className="w-12 h-12 bg-emerald-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-emerald-500/30">
                                            <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-bold text-lg">Nasz sklep</p>
                                            <p className="text-sm text-gray-300">Rabka-Zdrój, ul. Orkana 16B</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Company Details Cards */}
                            <div className="grid grid-cols-1 gap-4">
                                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-5 hover:border-emerald-500/50 transition-all">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-400 mb-1">Firma</p>
                                            <p className="font-bold text-white">TADEUSZ WÓJCIAK PRO-KOM</p>
                                            <p className="text-sm text-gray-300 mt-1">NIP: 7352511447</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-5 hover:border-emerald-500/50 transition-all">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-400 mb-1">Adres</p>
                                            <p className="font-bold text-white">ul. Orkana 16B</p>
                                            <p className="text-sm text-gray-300">34-730 Rabka-Zdrój</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-5 hover:border-emerald-500/50 transition-all">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-400 mb-1">Kontakt</p>
                                            <div className="space-y-2">
                                                <a href="tel:182676511" className="block font-semibold text-white hover:text-emerald-400 transition-colors">
                                                    📞 18 267 65 11 <span className="text-xs text-gray-400">(stacjonarny)</span>
                                                </a>
                                                <a href="tel:733400896" className="block font-semibold text-white hover:text-emerald-400 transition-colors">
                                                    📱 733 400 896 <span className="text-xs text-gray-400">(komórkowy)</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Google Map */}
                        <div className="space-y-6">
                            <div className="relative group overflow-hidden rounded-2xl h-full min-h-[400px]">
                                <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2583.8!2d19.9645!3d49.6089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4715e5c8b8b8b8b8%3A0x1234567890abcdef!2sOrkana%2016B%2C%2034-730%20Rabka-Zdr%C3%B3j!5e0!3m2!1spl!2spl!4v1234567890123!5m2!1spl!2spl"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, minHeight: '600px' }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="rounded-2xl"
                                ></iframe>

                                {/* Map Overlay Info */}
                                <div className="absolute top-6 left-6 right-6 z-20">
                                    <div className="bg-gray-900/90 backdrop-blur-xl border border-emerald-500/30 rounded-xl p-4 shadow-2xl">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center animate-pulse">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="font-bold text-white">Jesteśmy tutaj!</p>
                                                <p className="text-sm text-emerald-400">Rabka-Zdrój, ul. Orkana 16B</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Directions Button */}
                                <div className="absolute bottom-6 left-6 right-6 z-20">
                                    <a
                                        href="https://www.google.com/maps/dir//Orkana+16B,+34-730+Rabka-Zdrój"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-4 px-6 rounded-xl text-center transition-all transform hover:scale-105 shadow-2xl"
                                    >
                                        <div className="flex items-center justify-center gap-3">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                            </svg>
                                            <span>Wyznacz trasę w Google Maps</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Banner - Extended */}
                    <div className="bg-gradient-to-b from-emerald-600/20 via-emerald-600/30 to-emerald-700/40 border-t border-emerald-500/30 px-6 py-16">
                        <div className="max-w-5xl mx-auto text-center">
                            <p className="text-2xl md:text-3xl text-white mb-8 font-bold">
                                <span className="text-emerald-400">Zapraszamy osobiście!</span> Chętnie pokażemy Ci nasze zestawy i pomożemy wybrać idealną konfigurację.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                                {/* First card - Bezpłatne konsultacje */}
                                <div className="group relative">
                                    {/* Glow effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/30 to-teal-400/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                                    <div className="relative bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl border-2 border-emerald-500/40 rounded-2xl p-8 hover:border-emerald-400/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/30 min-h-[180px]">
                                        <div className="flex flex-col items-center justify-center gap-4 h-full">
                                            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/50 group-hover:scale-110 transition-transform duration-300">
                                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="text-white font-bold text-xl text-center group-hover:text-emerald-400 transition-colors">
                                                Bezpłatne<br />konsultacje
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="group relative">
                                    {/* Glow effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/30 to-teal-400/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                                    <div className="relative bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl border-2 border-emerald-500/40 rounded-2xl p-8 hover:border-emerald-400/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/30 min-h-[180px]">
                                        <div className="flex flex-col items-center justify-center gap-4 h-full">
                                            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/50 group-hover:scale-110 transition-transform duration-300">
                                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="text-white font-bold text-xl text-center group-hover:text-emerald-400 transition-colors">Możliwość odbioru osobistego</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="group relative">
                                    {/* Glow effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/30 to-teal-400/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                                    <div className="relative bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl border-2 border-emerald-500/40 rounded-2xl p-8 hover:border-emerald-400/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/30 min-h-[180px]">
                                        <div className="flex flex-col items-center justify-center gap-4 h-full">
                                            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/50 group-hover:scale-110 transition-transform duration-300">
                                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="text-white font-bold text-xl text-center group-hover:text-emerald-400 transition-colors">Parking przed sklepem</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}
