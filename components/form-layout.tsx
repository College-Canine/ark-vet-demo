import type React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { instantiateTranslation } from "@/lib/translation";

interface FormLayoutProps {
  title: string;
  description?: string;
  backHref: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function FormLayout({
  title,
  description,
  backHref,
  children,
  footer,
}: FormLayoutProps) {
  const t = instantiateTranslation();

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-4">
        <Link href={backHref}>
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            {t("action_back")}
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>{children}</CardContent>
        {footer && <CardFooter>{footer}</CardFooter>}
      </Card>
    </div>
  );
}
