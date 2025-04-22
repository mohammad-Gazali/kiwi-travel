import type { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getLocale, getTranslations } from "next-intl/server";
import { localeAttributeFactory } from "@/lib/utils";
import { api } from "@/trpc/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("FAQsPage");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function FAQPage() {
  const t = await getTranslations("FAQsPage");

  const faqs = await api.faq.list();

  const locale = await getLocale();
  const localeAttribute = localeAttributeFactory(locale);

  return (
    <main className="container mx-auto mt-20 px-4 py-8 lg:grid lg:px-0">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
        <p className="mt-4 text-muted-foreground">{t("description")}</p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq) => (
          <AccordionItem key={faq.id} value={`item-${faq.id}`}>
            <AccordionTrigger className="text-left">
              {localeAttribute(faq, "question")}
            </AccordionTrigger>
            <AccordionContent>
              {localeAttribute(faq, "answer")}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  );
}
