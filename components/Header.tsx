import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { ModeToggle } from "./theme-mode-toggle";
import UserMenu from "./UserMenu";

interface HeaderProps {
  title: string;
  logo?: string;
  className?: string;
}

export default function Header({ title, logo, className }: HeaderProps) {
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b bg-background/80 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center font-bold hover:text-primary transition-colors"
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
          <span className="text-xl">{title}</span>
        </Link>

        <div className="flex items-center gap-4">
          <UserMenu />
          <div className="border-l h-6 border-muted dark:border-muted" />

          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
