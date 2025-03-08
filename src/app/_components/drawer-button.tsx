"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  SignOutButton,
  useClerk,
} from "@clerk/nextjs";
import { LogOut, Menu, User, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { useState } from "react";

export const DrawerButton = () => {
  const [open, setOpen] = useState(false);
  const { openUserProfile } = useClerk();

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerTrigger asChild>
        <Button className="md:hidden" variant="outline" size="icon">
          <Menu />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-80">
        <DrawerHeader>
          <DrawerTitle className="flex items-center justify-between">
            Kiwi Travel
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Button
                variant="outline"
                size="icon"
                onClick={() => setOpen(false)}
              >
                <X />
              </Button>
            </div>
          </DrawerTitle>
          <DrawerDescription className="sr-only">
            Sidenav for settings
          </DrawerDescription>
        </DrawerHeader>
        <div className="m-4">
          <div className="flex flex-col gap-4">
            <SignedOut>
              <SignInButton>
                <Button variant="outline">Sign In</Button>
              </SignInButton>
              <SignUpButton>
                <Button>Sign Up</Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Button
                onClick={() => {
                  setOpen(false);
                  openUserProfile();
                }}
              >
                <User /> Open Profile
              </Button>
              <SignOutButton>
                <Button onClick={() => setOpen(false)} variant="outline">
                  <LogOut />
                  Sign out
                </Button>
              </SignOutButton>
            </SignedIn>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerButton;
