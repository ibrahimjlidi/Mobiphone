"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

const standalonePaths = new Set(["/login", "/register"]);

export default function AppChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (standalonePaths.has(pathname)) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <>
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}
