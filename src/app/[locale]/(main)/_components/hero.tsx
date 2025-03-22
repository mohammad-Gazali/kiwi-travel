import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SearchForm from "./search-form";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("HomePage.hero");

  return (
    <section
      className="relative h-[600px] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('https://placehold.co/1600x600')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="container relative mx-auto flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <h1 className="mb-4 text-4xl font-bold md:text-6xl">{t("headline")}</h1>
        <p className="mb-8 text-xl">{t("subheadline")}</p>
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>{t("cardTitle")}</CardTitle>
          </CardHeader>
          <CardContent>
            <SearchForm />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
