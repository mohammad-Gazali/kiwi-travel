import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus } from "lucide-react"

interface PageHeaderProps {
  title: string
  description?: string
  createButtonLabel?: string
  createButtonLink?: string
  backButtonLink?: string
}

export function PageHeader({
  title,
  description,
  createButtonLabel,
  createButtonLink,
  backButtonLink,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        {backButtonLink && (
          <Button variant="ghost" size="sm" className="mb-2 h-7 -ml-2" asChild>
            <Link href={backButtonLink}>
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </Button>
        )}
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      {createButtonLabel && createButtonLink && (
        <Button asChild>
          <Link href={createButtonLink}>
            <Plus className="h-4 w-4" />
            {createButtonLabel}
          </Link>
        </Button>
      )}
    </div>
  )
}

