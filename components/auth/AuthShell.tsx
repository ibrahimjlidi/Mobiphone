import { UserRound } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

interface AuthShellProps {
  title: string;
  description: string;
  children: ReactNode;
}

export default function AuthShell({
  title,
  description,
  children,
}: AuthShellProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_20%_15%,#7bb7f5_0%,transparent_34%),linear-gradient(145deg,#2f89e8_0%,#0d4f9c_58%,#063875_100%)] px-5 py-12 sm:px-8">
      <div className="pointer-events-none absolute -bottom-48 -left-48 h-[580px] w-[580px] rounded-full bg-white/10 blur-3xl" />
      <div className="relative z-10 w-full max-w-md text-center [&_a]:text-white/80 [&_a:hover]:text-white [&_button]:bg-[#073d82] [&_button]:text-white [&_button]:hover:bg-[#0a4e9f] [&_h1]:text-white [&_input]:rounded-none [&_input]:border-0 [&_input]:border-b-2 [&_input]:border-white/75 [&_input]:bg-transparent [&_input]:text-white [&_input]:placeholder:text-white/60 [&_label]:text-left [&_label]:text-white">
        <Link href="/" className="mb-8 inline-block text-xl font-bold tracking-tight text-white">
          MobilTech <span className="text-sky-100">Maghreb</span>
        </Link>
        <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-[#06427f] shadow-xl shadow-blue-950/25">
          <UserRound className="h-12 w-12 text-white" strokeWidth={1.5} />
        </div>
        <h1 className="text-3xl font-light uppercase tracking-[0.22em] sm:text-4xl">{title}</h1>
        <p className="mt-4 text-sm tracking-wide text-white/75">{description}</p>
        <div className="mx-auto mt-10 max-w-sm text-left">{children}</div>
      </div>
    </main>
  );
}
