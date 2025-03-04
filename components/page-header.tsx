import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface PageHeaderProps {
  title: string
  description?: string
  createButtonLabel?: string
  createButtonLink?: string
}

export function PageHeader({ title, description, createButtonLabel, createButtonLink }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      {createButtonLabel && createButtonLink && (
        <Link href={createButtonLink}>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            {createButtonLabel}
          </Button>
        </Link>
      )}
    </div>
  )
}

