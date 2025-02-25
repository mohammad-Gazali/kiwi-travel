import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";
import { Plane } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="z-10 fixed w-full top-0 h-16 border-b shadow bg-background text-foreground p-4">
      <nav className="container flex items-center justify-between gap-4 mx-auto">
        <Link className="flex gap-2 items-center" href="/">
          <Plane className="h-8 w-8 text-primary" />
          <h1 className="font-medium text-2xl">
            Kiwi Travel
          </h1>
        </Link>
        <div className="flex gap-4">
          <SignedOut>
            <SignInButton>
              <Button variant="ghost">Sign In</Button>
            </SignInButton>
            <SignUpButton>
              <Button>Sign Up</Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Header;
