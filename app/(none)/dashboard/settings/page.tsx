import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { instantiateTranslation } from "@/lib/translation";

export default function SettingsPage() {
  const t = instantiateTranslation();

  const settingsCategories = [
    {
      title: t("settings_card_general_title"),
      description: t("settings_card_general_description"),
      href: "/dashboard/settings/general",
    },
    {
      title: t("settings_card_users_title"),
      description: t("settings_card_users_description"),
      href: "/dashboard/settings/users",
    },
    {
      title: t("settings_card_billing_title"),
      description: t("settings_card_users_description"),
      href: "/dashboard/settings/billing",
    },
    {
      title: t("settings_card_notifications_title"),
      description: t("settings_card_notifications_description"),
      href: "/dashboard/settings/notifications",
    },
    {
      title: t("settings_card_integrations_title"),
      description: t("settings_card_integrations_description"),
      href: "/dashboard/settings/integrations",
    },
    {
      title: t("settings_card_privacy_title"),
      description: t("settings_card_privacy_description"),
      href: "/dashboard/settings/data-privacy",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t("settings_main_title")}
        </h1>
        <p className="text-muted-foreground">
          {t("settings_main_description")}
        </p>
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
  );
}
