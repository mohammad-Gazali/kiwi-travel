import { Link } from "@/i18n/routing";
import { Mail, MapPin, Phone, Plane } from "lucide-react";
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

            {/* Contact information added here */}
            <div className="mt-4 space-y-2">
              <h3 className="text-sm font-semibold">{t("contactUs")}</h3>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4" />
                <span>support@kiwitravel.com</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="mt-0.5 h-4 w-4" />
                <span>123 Travel Street, Adventure City, AC 12345</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              {t("quickLinksTitle")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:underline">
                  {t("quickLinks.home")}
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:underline">
                  {t("quickLinks.destinations")}
                </Link>
              </li>
              <li>
                <Link href="/trips" className="hover:underline">
                  {t("quickLinks.trips")}
                </Link>
              </li>
              {/* About Us link removed */}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">{t("supportTitle")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faqs" className="hover:underline">
                  {t("supportLinks.faqs")}
                </Link>
              </li>
              {/* Contact Us link removed */}
              <li>
                <Link href="/privacy" className="hover:underline">
                  {t("supportLinks.privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:underline">
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
