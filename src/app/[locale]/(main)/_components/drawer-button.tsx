"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
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
  useUser,
} from "@clerk/nextjs";
import { LogOut, Menu, User, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState } from "react";
import { Link } from "@/i18n/routing";;
import { useTranslations } from "next-intl";
import LanguageToggle from "./language-toggle";

export const DrawerButton = () => {
  const [open, setOpen] = useState(false);
  const { openUserProfile } = useClerk();

  const t = useTranslations("General.header");

  const { user } = useUser();

  const isAdmin = !!user?.publicMetadata?.isAdmin;

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
            Karim Tour
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <LanguageToggle />
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
            {t("sidenavDescription")}
          </DrawerDescription>
        </DrawerHeader>
        <div className="m-4">
          <div className="flex flex-col gap-2">
            {
              isAdmin && (
                <Link onClick={() => setOpen(false)} href="/dashboard">
                  <Button className="w-full">{t("dashboard")}</Button>
                </Link>
              )
            }
            <SignedIn>
              <Link onClick={() => setOpen(false)} href="/bookings">
                <Button className="w-full">{t("bookings")}</Button>
              </Link>
            </SignedIn>
          </div>
        </div>
        <DrawerFooter>
          <SignedOut>
            <SignInButton>
              <Button variant="outline">{t("signIn")}</Button>
            </SignInButton>
            <SignUpButton>
              <Button>{t("signUp")}</Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Button
              onClick={() => {
                setOpen(false);
                openUserProfile();
              }}
            >
              <User /> {t("openProfile")}
            </Button>
            <SignOutButton>
              <Button onClick={() => setOpen(false)} variant="outline">
                <LogOut />
                {t("signOut")}
              </Button>
            </SignOutButton>
          </SignedIn>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerButton;
