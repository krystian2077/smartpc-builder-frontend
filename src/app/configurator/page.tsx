"use client";

import { Suspense } from "react";
import ConfiguratorPageContent from "./ConfiguratorPageContent";

export default function ConfiguratorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    }>
      <ConfiguratorPageContent />
    </Suspense>
  );
}
