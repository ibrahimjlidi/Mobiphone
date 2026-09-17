/**
 * Modifiez ce fichier avec les informations de votre boutique.
 * Prix catalogue : toujours en DZD (dinar algérien) dans products.json / products.csv
 */

export type CurrencyCode = "DZD" | "MAD" | "TND";

export const shop = {
  name: "MobilTech",
  nameAccent: "Maghreb",
  tagline: "Smartphones neufs & garantis",
  description:
    "Vente de téléphones neufs Apple, Samsung, Xiaomi et plus. Livraison Maghreb, garantie et SAV.",

  logo: {
    /** Logo dans public/ — laissez vide pour afficher seulement le texte */
    src: "/logo.svg",
    alt: "MobilTech Maghreb",
  },

  contact: {
    emails: ["contact@mobiltech.dz", "sav@mobiltech.dz"],
    phones: ["+213 555 12 34 56", "+213 770 00 00 00"],
    address: ["45 Rue Didouche Mourad", "16000 Alger, Algérie"],
    hours: {
      weekdays: "Lundi – vendredi : 9 h – 19 h",
      saturday: "Samedi : 10 h – 16 h",
      sunday: "Dimanche : fermé",
    },
  },

  /** Seuil livraison gratuite (montant en DZD) */
  freeShippingThresholdDZD: 80000,

  /** Taux indicatifs pour affichage — mettez à jour selon votre taux du jour */
  currencies: {
    DZD: {
      code: "DZD" as const,
      label: "Dinar algérien",
      symbol: "DA",
      rateFromDZD: 1,
      decimals: 0,
    },
    MAD: {
      code: "MAD" as const,
      label: "Dirham marocain",
      symbol: "DH",
      rateFromDZD: 0.075,
      decimals: 0,
    },
    TND: {
      code: "TND" as const,
      label: "Dinar tunisien",
      symbol: "DT",
      rateFromDZD: 0.023,
      decimals: 3,
    },
  },

  defaultCurrency: "DZD" as CurrencyCode,
};

export function getFreeShippingThresholdDZD(): number {
  return shop.freeShippingThresholdDZD;
}
