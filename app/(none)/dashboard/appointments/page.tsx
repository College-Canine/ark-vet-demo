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
import { Prisma } from "@prisma/client";
import { CellContext } from "@tanstack/react-table";
import { instantiateTranslation } from "@/lib/translation";

export default function AppointmentsPage() {
  const t = instantiateTranslation();
  const [data, setData] = useState<
    Prisma.AppointmentGetPayload<{
      include: { patient: true; owner: true };
    }>[]
  >([]);

  useEffect(() => {
    (async () => {
      const appointmentReq = await fetch("/api/appointments");
      const appointments = await appointmentReq.json();

      setData(appointments);
    })();
  }, []);

  const handleDelete = (id: number) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    {
      accessorKey: "date",
      header: "Date & Time",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({
        row,
      }: CellContext<
        Prisma.AppointmentGetPayload<{
          include: { patient: true; owner: true };
        }>,
        number
      >) => format(row.original.startTime, "MMM d, yyyy h:mm a"),
    },
    {
      accessorKey: "patientName",
      header: "Patient",
      // @ts-nocheck This is stupid typing.
      cell: ({
        row,
      }: CellContext<
        Prisma.AppointmentGetPayload<{
          include: { patient: true; owner: true };
        }>,
        number
      >) => (
        <div>
          <div>{row.original.patient.name}</div>
          <div className="text-xs text-muted-foreground">
            {row.original.patient.breedSlug}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "owner",
      header: "Owner",
      // @ts-nocheck This is stupid typing.
      cell: ({
        row,
      }: CellContext<
        Prisma.AppointmentGetPayload<{
          include: { patient: true; owner: true };
        }>,
        number
      >) => (
        <div>
          <div>
            {row.original.owner.firstName} {row.original.owner.lastName}
          </div>
          <div className="text-xs text-muted-foreground">
            {row.original.owner.phone || row.original.owner.email}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "reason",
      header: "Reason",
    },
    {
      accessorKey: "status",
      header: "Status",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row }: any) => {
        const status = row.original.status;
        let color;
        switch (status) {
          case "Confirmed":
            color = "bg-green-100 text-green-800";
            break;
          case "Pending":
            color = "bg-yellow-100 text-yellow-800";
            break;
          case "Cancelled":
            color = "bg-red-100 text-red-800";
            break;
          default:
            color = "bg-gray-100 text-gray-800";
        }
        return <Badge className={color}>{status}</Badge>;
      },
    },
    {
      id: "actions",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row }: any) => {
        const appointment = row.original;
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
                <Link href={`/dashboard/appointments/${appointment.id}`}>
                  <DropdownMenuItem>
                    <Eye className="mr-2 h-4 w-4" />
                    {t("action_view")}
                  </DropdownMenuItem>
                </Link>
                <Link href={`/dashboard/appointments/${appointment.id}/edit`}>
                  <DropdownMenuItem>
                    <Pencil className="mr-2 h-4 w-4" />
                    {t("action_edit")}
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={() => handleDelete(appointment.id)}>
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
        title={t("appointments_main_title")}
        description={t("appointments_main_description")}
        createButtonLabel={t("appointments_main_action")}
        createButtonLink="/dashboard/appointments/new"
      />
      <DataTable
        columns={columns}
        data={data}
        searchColumn="patientName"
        searchPlaceholder={t("appointments_main_search")}
      />
    </div>
  );
}
