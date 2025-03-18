"use client";

import { DataTable } from "@/components/data-table";
import { instantiateTranslation } from "@/lib/translation";
import { Prisma } from "@prisma/client";
// import { ItemText } from "@radix-ui/react-select";

export default function InventoryPageClient({
  item,
}: {
  item: Prisma.InventoryItemGetPayload<{
    include: {
      supplier: true;
      purchases: true;
      sales: true;
      usages: true;
      returns: true;
    };
  }>;
}) {
  const t = instantiateTranslation();
  const columns = [
    {
      accessorKey: "createdAt",
      header: t("table_date_time"),
    },
    {
      accessorKey: "name",
      header: t("table_name"),
    },
  ];
  return (
    <DataTable
      columns={columns}
      data={[
        ...(item.purchases || []),
        ...(item.sales || []),
        ...(item.usages || []),
        ...(item.returns || []),
      ]}
      searchColumn="name"
      searchPlaceholder={t("inventory_main_search")}
    />
  );
}
