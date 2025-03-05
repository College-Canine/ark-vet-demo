import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"

const settingsCategories = [
  {
    title: "General",
    description: "Basic clinic information and preferences",
    href: "/dashboard/settings/general",
  },
  {
    title: "Users & Permissions",
    description: "Manage staff accounts and access levels",
    href: "/dashboard/settings/users",
  },
  {
    title: "Billing & Payments",
    description: "Configure payment methods and invoice settings",
    href: "/dashboard/settings/billing",
  },
  {
    title: "Notifications",
    description: "Set up email and SMS notifications",
    href: "/dashboard/settings/notifications",
  },
  {
    title: "Integrations",
    description: "Connect with third-party services and apps",
    href: "/dashboard/settings/integrations",
  },
  {
    title: "Data & Privacy",
    description: "Manage data retention and privacy settings",
    href: "/dashboard/settings/data-privacy",
  },
]

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your clinic settings and preferences</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {settingsCategories.map((category) => (
          <Link key={category.title} href={category.href}>
            <Card className="hover:bg-muted/50">
              <CardHeader>
                <CardTitle>{category.title}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-end">
                <Button variant="ghost">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

