"use client";

import { Suspense } from "react";
import InquiryPageContent from "./InquiryPageContent";

export default function InquiryPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    }>
      <InquiryPageContent />
    </Suspense>
  );
}
