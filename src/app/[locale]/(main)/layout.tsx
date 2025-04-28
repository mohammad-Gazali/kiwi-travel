import { routing } from "@/i18n/routing";
import Header from "./_components/header";
import Footer from "./_components/footer";
import ReviewFeedback from "./_components/review-feedback";
import ConfirmFeedback from "./_components/confirm-feedback";
import { PageParams } from "@/types/page-params";
import { getTranslations } from "next-intl/server";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageParams<{ locale: string }>) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
  };
}

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <ReviewFeedback />
      <ConfirmFeedback />
    </>
  );
}
