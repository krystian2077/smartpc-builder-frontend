interface CompanyDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CompanyDetailsModal({ isOpen, onClose }: CompanyDetailsModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700 overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-gray-700 flex justify-between items-center bg-gray-800">
                    <h2 className="text-xl font-bold text-white">Dane Kontaktowe</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-6 space-y-4 text-gray-300">
                    <div>
                        <h3 className="text-emerald-400 font-semibold mb-1">PRO-KOM Tadeusz Wójciak</h3>
                        <p>34-730 Rabka-Zdrój</p>
                        <p>ul. Orkana 16B</p>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-emerald-500 mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <a href="mailto:sklep@pro-kom.eu" className="hover:text-emerald-400 transition-colors">sklep@pro-kom.eu</a>
                        </div>

                        <div className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-emerald-500 mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <div>
                                <p>Stacjonarny: <a href="tel:182676511" className="hover:text-emerald-400 transition-colors">18 267 65 11</a></p>
                                <p>Komórkowy: <a href="tel:733400895" className="hover:text-emerald-400 transition-colors">733-400-895</a></p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-emerald-500 mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <p><span className="font-semibold">Pon - Pt:</span> 9:00 - 17:00</p>
                                <p><span className="font-semibold">Sobota:</span> 9:00 - 14:00</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t border-gray-700 bg-gray-800/50">
                    <button
                        onClick={onClose}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                    >
                        Zamknij
                    </button>
                </div>
            </div>
        </div>
    );
}
