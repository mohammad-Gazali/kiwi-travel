import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

interface Social {
  name: string;
  link: string;
}

export default function Footer() {
  const t = useTranslations("General.footer");

  const phones = ["+201003637624", "+905352699881", "+79645056936"];

  const socials: Social[] = [
    {
      name: "Instagram",
      link: "https://www.instagram.com/kiwitraveleg?igsh=MXJzZjFwY2Fzc2E2Zw==",
    },
    {
      name: "Facebook",
      link: "https://www.facebook.com/share/16NjtcXwqN/?mibextid=wwXIfr",
    },
    {
      name: "VK",
      link: "https://vk.com/kiwitravelseg",
    },
    {
      name: "WhatsApp",
      link: "https://chat.whatsapp.com/CPsj1lzPPb8A5VtdaVOZ20",
    },
    {
      name: "Telegram",
      link: "https://t.me/karimkiwi",
    },
    {
      name: "Viber",
      link: "https://invite.viber.com/?g2=AQA0x%2BECmdFOrlSTvNRusTVCZ9u6iaAtDGMI1Ok8C480GH8eKU2hM9%2F8J8kWlMHp",
    },
  ];

  return (
    <footer className="bg-[#0b3275] py-8 text-primary-foreground">
      <div className="container mx-auto px-4 md:px-0">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center space-x-2">
              <img className="-mt-2 w-48" src="/logo-footer.svg" alt="Karim Tour" />
            </Link>
            <p className="mt-2 text-sm">{t("discoverTheWorld")}</p>

            {/* Contact information added here */}
            <div className="mt-4 grid gap-2">
              <h3 className="text-sm font-semibold">{t("contactUs")}</h3>
              <ul>
                {phones.map((phone) => (
                  <li key={phone}>
                    <a
                      className="text-sm text-[#ff8106] hover:underline"
                      href={`tel:${phone}`}
                    >
                      {phone}
                    </a>
                  </li>
                ))}
              </ul>
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
            <ul className="grid list-disc grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-4">
              {socials.map((social) => (
                <li key={social.name}>
                  <a
                    key={social.name}
                    href={social.link}
                    target="_blank"
                    className="hover:text-[#ff8106]"
                  >
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-foreground/20 pt-8 text-center">
          <p>
            &copy; {new Date().getFullYear()} Karim Tour. {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
