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
import { ArrowLeft, Pencil, Trash } from "lucide-react";
import { instantiateTranslation } from "@/lib/translation";

interface DetailViewProps {
  title: string;
  description?: string;
  backHref: string;
  editHref?: string;
  onDelete?: () => void;
  children: React.ReactNode;
  rightSide?: React.ReactNode;
}

export function DetailView({
  title,
  description,
  backHref,
  editHref,
  onDelete,
  children,
  rightSide,
}: DetailViewProps) {
  const t = instantiateTranslation();

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-4 flex justify-between">
        <div>
          <Link href={backHref}>
            <Button variant="ghost" size="sm" className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              {t("action_back")}
            </Button>
          </Link>
        </div>
        <div className="flex gap-2">
          {editHref && (
            <Link href={editHref}>
              <Button variant="outline" size="sm" className="gap-1">
                <Pencil className="h-4 w-4" />
                {t("action_edit")}
              </Button>
            </Link>
          )}
          {onDelete && (
            <Button
              variant="destructive"
              size="sm"
              className="gap-1"
              onClick={onDelete}
            >
              <Trash className="h-4 w-4" />
              {t("action_delete")}
            </Button>
          )}
        </div>
      </div>
      <Card>
        <CardHeader>
          <div className="w-full flex flex-row justify-between">
            <div>
              <CardTitle>{title}</CardTitle>
              {description && <CardDescription>{description}</CardDescription>}
            </div>
            <div className="flex flex-row gap-2 justify-end">{rightSide}</div>
          </div>
        </CardHeader>
        <CardContent>{children}</CardContent>
        {(editHref || onDelete) && (
          <CardFooter className="flex justify-between">
            <div></div>
            <div></div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
