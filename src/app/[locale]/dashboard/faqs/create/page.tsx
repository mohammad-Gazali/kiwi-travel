import { PageHeader } from "@/components/dashboard/page-header";
import { FAQForm } from "../_components/faq-form";

export default function NewCountryPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Create Question"
        description="Add a new question"
        backButtonLink="/dashboard/faqs"
      />
      <FAQForm />
    </div>
  );
}
