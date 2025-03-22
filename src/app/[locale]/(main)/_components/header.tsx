import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import DrawerButton from "./drawer-button";
import { useTranslations } from "next-intl";
import LanguageToggle from "./language-toggle";

export const Header = () => {
  const t = useTranslations("General.header");

  return (
    <header className="z-10 fixed w-full top-0 h-16 border-b shadow bg-background text-foreground p-4">
      <nav className="container flex items-center justify-between gap-4 mx-auto">
        <Link className="flex gap-2 items-center" href="/">
          <Plane className="h-8 w-8 text-primary" />
          <h1 className="font-medium text-2xl">
            Kiwi Travel
          </h1>
        </Link>
        <div className="md:flex hidden gap-4">
          <SignedOut>
            <SignInButton>
              <Button variant="outline">
                {t("signIn")}
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button>
                {t("signUp")}
              </Button>
            </SignUpButton>
          </SignedOut>
          <ThemeToggle />
          <LanguageToggle />
          <SignedIn>
            <Link href="/dashboard">
              <Button>
                {t("dashboard")}
              </Button>
            </Link>
            <UserButton />
          </SignedIn>
        </div>
        <DrawerButton />
      </nav>
    </header>
  );
};

export default Header;
