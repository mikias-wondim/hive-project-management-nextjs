import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ModeToggle } from "./theme-mode-toggle";
import UserMenu from "./UserMenu";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
interface HeaderProps {
  title: string;
  logo?: string;
  className?: string;
}

export default function Header({ title, logo, className }: HeaderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const isLandingPage = usePathname() === "/";

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  if (loading) return null;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 mx-4 flex items-center justify-between border-b bg-background/80 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex gap-2 items-center font-bold hover:text-primary transition-colors"
        >
          {logo && (
            <Image
              src={logo}
              alt={title}
              width={32}
              height={32}
              className="h-8 text-muted-foreground dark:text-muted-foreground dark:invert w-fit"
            />
          )}
          <span className="text-xl font-heading">{title}</span>
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <UserMenu user={user} />
          ) : (
            <>
              {isLandingPage && (
                <>
                  <Button variant="outline" asChild>
                    <Link href="/login">Sign In</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/create-account">Get Started</Link>
                  </Button>
                </>
              )}
            </>
          )}
          <div className="border-l h-6 border-muted dark:border-muted" />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
