"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, LockKeyhole, Smartphone } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
          <CardHeader className="space-y-4 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Smartphone className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-2xl">Content de vous revoir</CardTitle>
              <CardDescription>Connectez-vous à votre compte MobilTech.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {isSubmitted ? (
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
                <div className="flex justify-end">
                  <Link href="/login" className="text-sm text-primary hover:underline">
                    Mot de passe oublié ?
                  </Link>
                </div>
                <Button type="submit" size="lg" className="w-full">
                  <LockKeyhole className="h-4 w-4" />
                  Se connecter
                </Button>
              </form>
            )}

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Pas encore de compte ?{" "}
              <Link href="/register" className="font-medium text-primary hover:underline">
                Créer un compte
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
