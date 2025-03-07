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
import { PatientStatus, Prisma } from "@prisma/client";
import { CellContext } from "@tanstack/react-table";
import { formatDistance } from "date-fns";
import { instantiateTranslation } from "@/lib/translation";

export default function PatientsPage() {
  const t = instantiateTranslation();
  const [data, setData] = useState<
    Prisma.PatientGetPayload<{ include: { owner: true } }>[]
  >([]);

  useEffect(() => {
    (async () => {
      const req = await fetch(`/api/patients`);
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
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "breedSlug",
      header: "Breed",
    },
    {
      accessorKey: "age",
      header: "Age",
      cell: ({
        row,
      }: CellContext<
        Prisma.PatientGetPayload<{
          include: { owner: true };
        }>,
        number
      >) =>
        row.original.dateOfBirth == null
          ? "UNKNOWN"
          : `${formatDistance(row.original.dateOfBirth, new Date())} years`,
    },
    {
      accessorKey: "gender",
      header: "Gender",
    },
    {
      accessorKey: "ownerName",
      header: "Owner",
      cell: ({
        row,
      }: CellContext<
        Prisma.PatientGetPayload<{
          include: { owner: true };
        }>,
        number
      >) => `${row.original.owner.firstName} ${row.original.owner.lastName}`,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({
        row,
      }: CellContext<
        Prisma.PatientGetPayload<{
          include: { owner: true };
        }>,
        number
      >) => {
        return (
          <Badge
            className={
              row.original.status === PatientStatus.ACTIVE
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }
          >
            {row.original.status}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row }: any) => {
        const patient = row.original;
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
                <Link href={`/dashboard/patients/${patient.id}`}>
                  <DropdownMenuItem>
                    <Eye className="mr-2 h-4 w-4" />
                    {t("action_view")}
                  </DropdownMenuItem>
                </Link>
                <Link href={`/dashboard/patients/${patient.id}/edit`}>
                  <DropdownMenuItem>
                    <Pencil className="mr-2 h-4 w-4" />
                    {t("action_edit")}
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={() => handleDelete(patient.id)}>
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
        title={t("patients_main_title")}
        description={t("patients_main_description")}
        createButtonLabel={t("patients_main_action")}
        createButtonLink="/dashboard/patients/new"
      />
      <DataTable
        columns={columns}
        data={data}
        searchColumn="name"
        searchPlaceholder={t("patients_main_search")}
      />
    </div>
  );
}
