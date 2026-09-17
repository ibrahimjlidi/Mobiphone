"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useCurrency } from "@/context/CurrencyContext";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { ArrowLeft, PackageOpen } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Order {
  id: string;
  status: string;
  total_dzd: number;
  created_at: string;
}

export default function AccountPage() {
  const { user, isConfigured, isLoading } = useAuth();
  const { formatPrice } = useCurrency();
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  useEffect(() => {
    if (!user || !isConfigured) return;

    getSupabaseBrowserClient()
      .from("orders")
      .select("id, status, total_dzd, created_at")
      .order("created_at", { ascending: false })
      .then(({ data, error: queryError }) => {
        if (queryError) {
          setError(queryError.message);
          return;
        }
        setOrders(data ?? []);
      });
  }, [isConfigured, user]);

  const cancelOrder = async (orderId: string) => {
    if (!user || !isConfigured || !window.confirm("Annuler cette commande ?")) return;
    setError("");
    setCancellingId(orderId);
    const { error: updateError } = await getSupabaseBrowserClient()
      .from("orders")
      .update({ status: "cancelled" })
      .eq("id", orderId)
      .eq("user_id", user.id)
      .in("status", ["pending", "confirmed"]);

    setCancellingId(null);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === orderId ? { ...order, status: "cancelled" } : order
      )
    );
  };

  if (isLoading) {
    return <main className="container mx-auto min-h-[60vh] px-4 py-16" />;
  }

  if (!user) {
    return (
      <main className="container mx-auto flex min-h-[60vh] items-center justify-center px-4 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">Mon compte</h1>
          <p className="mt-3 text-muted-foreground">Connectez-vous pour consulter vos commandes.</p>
          <Button asChild className="mt-8"><Link href="/login">Se connecter</Link></Button>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto min-h-[60vh] px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Retour à la boutique
      </Link>
      <div className="mb-8">
        <p className="text-sm text-muted-foreground">Compte connecté</p>
        <h1 className="text-3xl font-bold text-foreground">Mes commandes</h1>
        <p className="mt-2 text-muted-foreground">{user.email}</p>
      </div>

      {error && <p className="mb-6 rounded-md bg-destructive/10 p-4 text-sm text-destructive">{error}</p>}
      {orders.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-4 py-16 text-center">
            <PackageOpen className="h-12 w-12 text-muted-foreground" />
            <div>
              <h2 className="font-semibold text-foreground">Aucune commande</h2>
              <p className="mt-1 text-sm text-muted-foreground">Vos commandes confirmées apparaîtront ici.</p>
            </div>
            <Button asChild><Link href="/">Découvrir les téléphones</Link></Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle className="text-base">Commande #{order.id.slice(0, 8)}</CardTitle>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{order.status}</span>
                  {(order.status === "pending" || order.status === "confirmed") && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => void cancelOrder(order.id)}
                      disabled={cancellingId === order.id}
                    >
                      {cancellingId === order.id ? "Annulation..." : "Annuler"}
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex justify-between border-t border-border pt-4 text-sm">
                <span className="text-muted-foreground">{new Date(order.created_at).toLocaleDateString("fr-FR")}</span>
                <span className="font-bold text-foreground">{formatPrice(order.total_dzd)}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
