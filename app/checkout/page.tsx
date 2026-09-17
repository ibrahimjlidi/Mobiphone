"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/constants";
import { ArrowLeft, CheckCircle2, LockKeyhole, Truck } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { formatPrice } = useCurrency();
  const [isConfirmed, setIsConfirmed] = useState(false);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 900;
  const total = subtotal + shipping;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsConfirmed(true);
    clearCart();
  };

  if (isConfirmed) {
    return (
      <main className="container mx-auto flex min-h-[60vh] items-center justify-center px-4 py-16">
        <div className="max-w-lg text-center">
          <CheckCircle2 className="mx-auto mb-6 h-16 w-16 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">
            Commande confirmée
          </h1>
          <p className="mt-3 text-muted-foreground">
            Merci pour votre commande. Vous recevrez bientôt les détails de la
            livraison par e-mail.
          </p>
          <Button asChild className="mt-8">
            <Link href="/">Retour à la boutique</Link>
          </Button>
        </div>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="container mx-auto flex min-h-[60vh] items-center justify-center px-4 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">
            Votre panier est vide
          </h1>
          <p className="mt-3 text-muted-foreground">
            Ajoutez un smartphone avant de passer commande.
          </p>
          <Button asChild className="mt-8">
            <Link href="/">Voir les téléphones</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild aria-label="Retour au panier">
          <Link href="/cart">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Finaliser la commande</h1>
          <p className="mt-1 text-muted-foreground">Livraison rapide et paiement sécurisé</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <Card>
          <CardHeader>
            <CardTitle>Informations de livraison</CardTitle>
          </CardHeader>
          <CardContent>
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-medium">
                  Prénom
                  <Input name="firstName" required autoComplete="given-name" placeholder="Votre prénom" />
                </label>
                <label className="space-y-2 text-sm font-medium">
                  Nom
                  <Input name="lastName" required autoComplete="family-name" placeholder="Votre nom" />
                </label>
              </div>
              <label className="block space-y-2 text-sm font-medium">
                E-mail
                <Input name="email" type="email" required autoComplete="email" placeholder="vous@exemple.com" />
              </label>
              <label className="block space-y-2 text-sm font-medium">
                Adresse
                <Input name="address" required autoComplete="street-address" placeholder="12 rue de la République" />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-medium">
                  Ville
                  <Input name="city" required autoComplete="address-level2" placeholder="Alger" />
                </label>
                <label className="space-y-2 text-sm font-medium">
                  Téléphone
                  <Input name="phone" type="tel" required autoComplete="tel" placeholder="+213 555 00 00 00" />
                </label>
              </div>

              <div className="border-t border-border pt-6">
                <h2 className="mb-4 text-lg font-semibold text-foreground">Mode de paiement</h2>
                <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-primary bg-primary/5 p-4">
                  <input type="radio" name="payment" value="cash" defaultChecked className="mt-1 accent-[var(--primary)]" />
                  <span>
                    <span className="block font-medium text-foreground">Paiement à la livraison</span>
                    <span className="text-sm text-muted-foreground">Payez en espèces à la réception.</span>
                  </span>
                </label>
              </div>

              <Button type="submit" size="lg" className="w-full">
                <LockKeyhole className="h-4 w-4" />
                Confirmer la commande · {formatPrice(total)}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="h-fit lg:sticky lg:top-4">
          <CardHeader>
            <CardTitle>Votre commande</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between gap-4 text-sm">
                <span className="text-muted-foreground">
                  {item.name} × {item.quantity}
                </span>
                <span className="shrink-0 font-medium text-foreground">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
            <div className="space-y-2 border-t border-border pt-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sous-total</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Truck className="h-4 w-4" /> Livraison
                </span>
                <span>{shipping === 0 ? "Gratuite" : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-3 text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">{formatPrice(total)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
