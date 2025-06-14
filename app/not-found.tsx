"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
      <h1 className="text-8xl font-bold text-blue-600">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mt-4">
        Page Not Found
      </h2>
      <p className="text-gray-600 mt-2 max-w-md">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </p>
      <button
        onClick={() => router.push("/")}
        className="mt-6 px-6 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
      >
        Go back home
      </button>
    </div>
  );
}
