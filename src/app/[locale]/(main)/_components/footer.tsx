import Link from "next/link";
import { Plane } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("General.footer");

  return (
    <footer className="bg-muted py-8 text-foreground">
      <div className="container mx-auto px-4 md:px-0">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center space-x-2">
              <Plane className="h-6 w-6" />
              <span className="text-xl font-bold">Kiwi Travel</span>
            </Link>
            <p className="mt-2 text-sm">{t("discoverTheWorld")}</p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              {t("quickLinksTitle")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:underline">
                  {t("quickLinks.home")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  {t("quickLinks.destinations")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  {t("quickLinks.trips")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  {t("quickLinks.aboutUs")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">{t("supportTitle")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:underline">
                  {t("supportLinks.faqs")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  {t("supportLinks.contactUs")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  {t("supportLinks.privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  {t("supportLinks.termsOfService")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">{t("followUsTitle")}</h3>
            <div className="flex flex-col gap-4">
              <Link href="#" className="hover:text-primary">
                {t("socialLinks.facebook")}
              </Link>
              <Link href="#" className="hover:text-primary">
                {t("socialLinks.twitter")}
              </Link>
              <Link href="#" className="hover:text-primary">
                {t("socialLinks.instagram")}
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-foreground/20 pt-8 text-center">
          <p>
            &copy; {new Date().getFullYear()} Kiwi Travel. {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
