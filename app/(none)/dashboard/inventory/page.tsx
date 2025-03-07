"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye, Pencil, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/data-table";
import { InventoryItem } from "@prisma/client";
import { instantiateTranslation } from "@/lib/translation";

export default function InventoryPage() {
  const [data, setData] = useState<InventoryItem[]>([]);
  const t = instantiateTranslation();

  useEffect(() => {
    (async () => {
      const req = await fetch(`/api/inventory`);
      const json = await req.json();

      setData(json);
    })();
  }, []);

  const handleDelete = (id: string) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    {
      accessorKey: "id",
      header: t("table_item_id"),
    },
    {
      accessorKey: "name",
      header: t("table_name"),
    },
    {
      accessorKey: "category",
      header: t("table_inventory_category"),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row }: any) =>
        `${t(`inventory_category_${row.original.category}`)}`,
    },
    {
      accessorKey: "quantity",
      header: t("table_quantity"),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row }: any) => `${row.original.quantity} ${row.original.unit}`,
    },
    {
      accessorKey: "reorderLevel",
      header: t("table_reorder_level"),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row }: any) =>
        `${row.original.reorderLevel} ${row.original.unit}`,
    },
    {
      accessorKey: "status",
      header: t("table_status"),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row }: any) => {
        return (
          <Badge
            className={
              row.original.quantity <= 0
                ? "bg-red-100 text-red-800"
                : row.original.quantity <= (row.original.reorderLevel || 25)
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-800"
            }
          >
            {row.original.quantity <= 0
              ? t("level_out_of_stock")
              : row.original.quantity <= (row.original.reorderLevel || 25)
              ? t("level_low_stock")
              : t("level_in_stock")}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row }: any) => {
        const item = row.original;
        return (
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Link href={`/dashboard/inventory/${item.id}`}>
                  <DropdownMenuItem>
                    <Eye className="mr-2 h-4 w-4" />
                    {t("action_view")}
                  </DropdownMenuItem>
                </Link>
                <Link href={`/dashboard/inventory/${item.id}/edit`}>
                  <DropdownMenuItem>
                    <Pencil className="mr-2 h-4 w-4" />
                    {t("action_edit")}
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={() => handleDelete(item.id)}>
                  <Trash className="mr-2 h-4 w-4" />
                  {t("action_delete")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("inventory_main_title")}
        description={t("inventory_main_description")}
        createButtonLabel={t("inventory_main_action")}
        createButtonLink="/dashboard/inventory/new"
      />
      <DataTable
        columns={columns}
        data={data}
        searchColumn="name"
        searchPlaceholder={t("inventory_main_search")}
      />
    </div>
  );
}
