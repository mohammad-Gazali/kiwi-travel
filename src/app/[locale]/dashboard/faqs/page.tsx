import { PageHeader } from "@/components/dashboard/page-header"
import { FAQsList } from "./_components/faqs-list"

export default function FAQPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="F.A.Q."
        description="Manage your frequently asked questions"
        createButtonLabel="Add Question"
        createButtonLink="/dashboard/faqs/create"
      />
      <FAQsList />
    </div>
  )
}