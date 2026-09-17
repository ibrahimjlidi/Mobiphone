"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { ArrowLeft, UserPlus } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function RegisterPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isConfigured } = useAuth();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    const formData = new FormData(event.currentTarget);
    const password = String(formData.get("password"));
    if (password !== String(formData.get("confirmPassword"))) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    setIsSubmitting(true);
    const { error: authError } = await getSupabaseBrowserClient().auth.signUp({
      email: String(formData.get("email")),
      password,
      options: {
        data: {
          first_name: String(formData.get("firstName")),
          last_name: String(formData.get("lastName")),
        },
      },
    });
    setIsSubmitting(false);
    if (authError) {
      setError(authError.message);
      return;
    }
    setIsSubmitted(true);
  };

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-primary/10 via-background to-accent/20 px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-md">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Retour à la boutique
        </Link>

        <Card>
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl">Créer votre compte</CardTitle>
            <CardDescription>Enregistrez-vous pour suivre vos commandes plus facilement.</CardDescription>
          </CardHeader>
          <CardContent>
            {!isConfigured ? (
              <p className="rounded-md bg-destructive/10 p-4 text-sm text-destructive">
                L&apos;authentification n&apos;est pas configurée. Ajoutez les variables Supabase dans .env.local.
              </p>
            ) : isSubmitted ? (
              <div className="space-y-4 text-center">
                <p className="font-medium text-foreground">Compte prêt à être créé</p>
                <p className="text-sm text-muted-foreground">
                  La création de compte sera reliée au service serveur prochainement.
                </p>
                <Button asChild>
                  <Link href="/login">Aller à la connexion</Link>
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
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
                  Adresse e-mail
                  <Input type="email" name="email" required autoComplete="email" placeholder="vous@exemple.com" />
                </label>
                <label className="block space-y-2 text-sm font-medium">
                  Mot de passe
                  <Input type="password" name="password" required minLength={6} autoComplete="new-password" placeholder="6 caractères minimum" />
                </label>
                <label className="block space-y-2 text-sm font-medium">
                  Confirmer le mot de passe
                  <Input type="password" name="confirmPassword" required minLength={6} autoComplete="new-password" placeholder="Répétez votre mot de passe" />
                </label>
                <Button type="submit" size="lg" className="w-full">
                  <UserPlus className="h-4 w-4" />
                  {isSubmitting ? "Création..." : "Créer mon compte"}
                </Button>
                {error && <p className="text-sm text-destructive">{error}</p>}
              </form>
            )}

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Vous avez déjà un compte ?{" "}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Se connecter
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
