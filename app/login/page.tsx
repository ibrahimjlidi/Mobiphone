"use client";

import { Button } from "@/components/ui/button";
import AuthShell from "@/components/auth/AuthShell";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { LockKeyhole } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isConfigured } = useAuth();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const { error: authError } = await getSupabaseBrowserClient().auth.signInWithPassword({
      email: String(formData.get("email")),
      password: String(formData.get("password")),
    });
    setIsSubmitting(false);
    if (authError) {
      setError(authError.message);
      return;
    }
    setIsSubmitted(true);
  };

  return (
    <AuthShell
      title="Connexion"
      description="Content de vous revoir"
    >
            {!isConfigured ? (
              <p className="rounded-md bg-destructive/10 p-4 text-sm text-destructive">
                L&apos;authentification n&apos;est pas configurée. Ajoutez les variables Supabase dans .env.local.
              </p>
            ) : isSubmitted ? (
              <div className="space-y-4 text-center">
                <p className="font-medium text-foreground">Connexion en cours...</p>
                <p className="text-sm text-muted-foreground">
                  L&apos;authentification sera reliée au service serveur prochainement.
                </p>
                <Button variant="outline" asChild>
                  <Link href="/">Continuer sans se connecter</Link>
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <label className="block space-y-2 text-sm font-medium">
                  Adresse e-mail
                  <Input type="email" name="email" required autoComplete="email" placeholder="vous@exemple.com" />
                </label>
                <label className="block space-y-2 text-sm font-medium">
                  Mot de passe
                  <Input type="password" name="password" required minLength={6} autoComplete="current-password" placeholder="Votre mot de passe" />
                </label>
                <div className="flex items-center justify-between gap-3">
                  <label className="flex items-center gap-2 text-sm text-white/80">
                    <input type="checkbox" name="remember" className="h-4 w-4 accent-white" />
                    Se souvenir de moi
                  </label>
                  <Link href="/login" className="text-sm hover:underline">
                    Mot de passe oublié ?
                  </Link>
                </div>
                <Button type="submit" size="lg" className="w-full">
                  <LockKeyhole className="h-4 w-4" />
                  {isSubmitting ? "Connexion..." : "Se connecter"}
                </Button>
                {error && <p className="text-sm text-destructive">{error}</p>}
              </form>
            )}

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Pas encore de compte ?{" "}
              <Link href="/register" className="font-medium text-primary hover:underline">
                Créer un compte
              </Link>
            </p>
    </AuthShell>
  );
}
