"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
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
import { instantiateTranslation } from "@/lib/translation";
import { MedicalRecord } from "@prisma/client";

export default function MedicalRecordsPage() {
  const [data, setData] = useState<MedicalRecord[]>([]);
  const t = instantiateTranslation();

  useEffect(() => {
    (async () => {
      const req = await fetch(`/api/records`);
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
      header: "Record ID",
    },
    {
      accessorKey: "recordAt",
      header: "Date",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row }: any) => format(row.original.recordAt, "MMM d, yyyy"),
    },
    {
      accessorKey: "patientName",
      header: "Patient",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row }: any) => (
        <div>
          <div>{row.original.patient.name}</div>
          <div className="text-xs text-muted-foreground">
            ID: {row.original.patientId}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      accessorKey: "provider",
      header: "Provider",
    },
    {
      accessorKey: "status",
      header: "Status",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row }: any) => {
        const status = row.original.status;
        return <Badge className="bg-green-100 text-green-800">{status}</Badge>;
      },
    },
    {
      id: "actions",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row }: any) => {
        const record = row.original;
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
                <Link href={`/dashboard/records/${record.id}`}>
                  <DropdownMenuItem>
                    <Eye className="mr-2 h-4 w-4" />
                    {t("action_view")}
                  </DropdownMenuItem>
                </Link>
                <Link href={`/dashboard/records/${record.id}/edit`}>
                  <DropdownMenuItem>
                    <Pencil className="mr-2 h-4 w-4" />
                    {t("action_edit")}
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={() => handleDelete(record.id)}>
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
        title={t("records_main_title")}
        description={t("records_main_description")}
        createButtonLabel={t("records_main_action")}
        createButtonLink="/dashboard/records/new"
      />
      <DataTable
        columns={columns}
        data={data}
        searchColumn="patientName"
        searchPlaceholder={t("records_main_search")}
      />
    </div>
  );
}
