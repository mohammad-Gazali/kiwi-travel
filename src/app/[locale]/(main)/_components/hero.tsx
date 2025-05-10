import { useTranslations } from "next-intl";
import SearchCard from "./search-card";

export default function Hero() {
  const t = useTranslations("HomePage.hero");

  return (
    <section
      className="relative h-[600px] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/hero.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="container relative mx-auto flex h-full flex-col items-center justify-center text-center text-white">
        <h1 className="mb-4 px-4 text-4xl font-bold md:text-6xl">{t("headline")}</h1>
        <p className="mb-8 px-4 text-xl">{t("subheadline")}</p>
        <SearchCard />
      </div>
    </section>
  );
}
