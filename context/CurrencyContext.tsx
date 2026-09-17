"use client";

import { type CurrencyCode, shop } from "@/config/shop";
import { formatPrice as formatPriceFn } from "@/lib/formatPrice";
import React, { createContext, useContext, useEffect, useState } from "react";

interface CurrencyContextProps {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (amountDZD: number) => string;
}

const CurrencyContext = createContext<CurrencyContextProps | undefined>(
  undefined
);

const STORAGE_KEY = "mobiltech-currency";

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>(
    shop.defaultCurrency
  );

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as CurrencyCode | null;
    if (saved && shop.currencies[saved]) {
      setCurrencyState(saved);
    }
  }, []);

  const setCurrency = (code: CurrencyCode) => {
    setCurrencyState(code);
    localStorage.setItem(STORAGE_KEY, code);
  };

  const formatPrice = (amountDZD: number) => formatPriceFn(amountDZD, currency);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within CurrencyProvider");
  }
  return context;
}
