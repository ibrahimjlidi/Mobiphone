/**
 * Importe data/products.csv → data/products.json
 * Usage: npm run import:products
 *
 * Colonnes CSV (séparateur virgule, UTF-8) :
 * id, name, brand, storage, price, image, description
 * - price : montant en DZD (nombre entier)
 * - image : /products/photo.jpg (dossier public/products) ou URL https://...
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const csvPath = path.join(root, "data", "products.csv");
const jsonPath = path.join(root, "data", "products.json");

function parseCsvLine(line) {
  const fields = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }
    if (char === "," && !inQuotes) {
      fields.push(current.trim());
      current = "";
      continue;
    }
    current += char;
  }
  fields.push(current.trim());
  return fields;
}

function parseCsv(text) {
  const lines = text.replace(/^\uFEFF/, "").split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) {
    throw new Error("CSV vide ou sans en-têtes");
  }
  const headers = parseCsvLine(lines[0]);
  return lines.slice(1).map((line, index) => {
    const values = parseCsvLine(line);
    if (values.length !== headers.length) {
      throw new Error(`Ligne ${index + 2} : colonnes invalides`);
    }
    const row = Object.fromEntries(headers.map((h, i) => [h, values[i]]));
    return {
      id: Number(row.id),
      name: row.name,
      brand: row.brand,
      storage: row.storage,
      price: Number(row.price),
      image: row.image,
      description: row.description,
    };
  });
}

const csv = fs.readFileSync(csvPath, "utf8");
const products = parseCsv(csv);
fs.writeFileSync(jsonPath, JSON.stringify(products, null, 2) + "\n", "utf8");
console.log(`✓ ${products.length} produits écrits dans data/products.json`);
