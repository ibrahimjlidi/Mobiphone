"use client";

import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase/client";
import type { Session, User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isConfigured: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isConfigured = isSupabaseConfigured();

  useEffect(() => {
    if (!isConfigured) {
      setIsLoading(false);
      return;
    }

    const supabase = getSupabaseBrowserClient();
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setIsLoading(false);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setIsLoading(false);
    });

    return () => data.subscription.unsubscribe();
  }, [isConfigured]);

  const signOut = async () => {
    if (!isConfigured) return;
    await getSupabaseBrowserClient().auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user: session?.user ?? null,
        session,
        isLoading,
        isConfigured,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
