// app/logout/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      await fetch("/api/logout", { method: "POST" });
      router.replace("/login");
    };

    logout();
  }, [router]);

  return <p className="text-center mt-10">Logging out...</p>;
}
