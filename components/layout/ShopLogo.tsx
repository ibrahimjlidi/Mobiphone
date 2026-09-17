import { shop } from "@/config/shop";
import Image from "next/image";
import Link from "next/link";

export default function ShopLogo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2.5 text-gray-900 hover:text-gray-700 transition-colors ${className}`}
      aria-label={`${shop.name} ${shop.nameAccent} — Accueil`}
    >
      {shop.logo.src ? (
        <Image
          src={shop.logo.src}
          alt={shop.logo.alt}
          width={36}
          height={36}
          className="h-9 w-9 shrink-0"
          priority
        />
      ) : null}
      <span className="text-xl sm:text-2xl tracking-tight font-semibold">
        {shop.name}
        <span className="text-primary"> {shop.nameAccent}</span>
      </span>
    </Link>
  );
}
