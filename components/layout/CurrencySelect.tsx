"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { shop, type CurrencyCode } from "@/config/shop";
import { useCurrency } from "@/context/CurrencyContext";

export default function CurrencySelect() {
  const { currency, setCurrency } = useCurrency();
  const codes = Object.keys(shop.currencies) as CurrencyCode[];

  return (
    <Select
      value={currency}
      onValueChange={(value) => setCurrency(value as CurrencyCode)}
    >
      <SelectTrigger
        className="w-[108px] h-9 text-xs border-gray-300"
        aria-label="Devise d'affichage"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {codes.map((code) => (
          <SelectItem key={code} value={code} className="text-xs">
            {code} ({shop.currencies[code].symbol})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
