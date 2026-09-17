"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, UserPlus } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function RegisterPage() {
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
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl">Créer votre compte</CardTitle>
            <CardDescription>Enregistrez-vous pour suivre vos commandes plus facilement.</CardDescription>
          </CardHeader>
          <CardContent>
            {isSubmitted ? (
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
                  Créer mon compte
                </Button>
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
