"use client";

import products from "@/data/products.json";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import ProductCard from "./ProductCard";

type PriceRange = "all" | "lt50" | "50-100" | "100-150" | "gt150";

const PRICE_RANGES: { value: PriceRange; label: string }[] = [
  { value: "all", label: "Tous les prix" },
  { value: "lt50", label: "Moins de 50 000 DA" },
  { value: "50-100", label: "50 000 – 100 000 DA" },
  { value: "100-150", label: "100 000 – 150 000 DA" },
  { value: "gt150", label: "Plus de 150 000 DA" },
];

function matchesPriceRange(priceDZD: number, range: PriceRange): boolean {
  switch (range) {
    case "lt50":
      return priceDZD < 50000;
    case "50-100":
      return priceDZD >= 50000 && priceDZD < 100000;
    case "100-150":
      return priceDZD >= 100000 && priceDZD < 150000;
    case "gt150":
      return priceDZD >= 150000;
    default:
      return true;
  }
}

export default function ProductCatalog() {
  const [brand, setBrand] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<PriceRange>("all");
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) setSearch(q);
  }, [searchParams]);

  const brands = useMemo(() => {
    const set = new Set(products.map((p) => p.brand).filter(Boolean));
    return Array.from(set).sort() as string[];
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((p) => {
      if (brand !== "all" && p.brand !== brand) return false;
      if (!matchesPriceRange(p.price, priceRange)) return false;
      if (q) {
        const haystack = `${p.name} ${p.brand ?? ""} ${p.description ?? ""}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [brand, priceRange, search]);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col lg:flex-row gap-4 lg:items-end lg:justify-between">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 flex-1">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
              Marque
            </label>
            <Select value={brand} onValueChange={setBrand}>
              <SelectTrigger aria-label="Filtrer par marque">
                <SelectValue placeholder="Toutes les marques" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les marques</SelectItem>
                {brands.map((b) => (
                  <SelectItem key={b} value={b}>
                    {b}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
              Prix (DZD)
            </label>
            <Select
              value={priceRange}
              onValueChange={(v) => setPriceRange(v as PriceRange)}
            >
              <SelectTrigger aria-label="Filtrer par prix">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PRICE_RANGES.map((r) => (
                  <SelectItem key={r.value} value={r.value}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="sm:col-span-2 lg:col-span-1">
            <label
              htmlFor="catalog-search"
              className="text-xs font-medium text-muted-foreground mb-1.5 block"
            >
              Recherche
            </label>
            <Input
              id="catalog-search"
              type="search"
              placeholder="Modèle, marque..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <p className="text-sm text-muted-foreground shrink-0">
          {filtered.length} téléphone{filtered.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.length > 0 ? (
          filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Aucun téléphone trouvé
            </h3>
            <p className="text-muted-foreground mb-4">
              Modifiez les filtres ou la recherche
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
