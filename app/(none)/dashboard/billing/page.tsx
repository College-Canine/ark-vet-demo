"use client";

import { useState } from "react";
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

// Mock data
const invoices = [
  {
    id: "INV001",
    date: new Date(2023, 5, 15),
    patientName: "Max",
    patientId: "P001",
    ownerName: "John Smith",
    amount: 150.0,
    status: "Paid",
  },
  {
    id: "INV002",
    date: new Date(2023, 5, 16),
    patientName: "Bella",
    patientId: "P002",
    ownerName: "Sarah Johnson",
    amount: 200.0,
    status: "Pending",
  },
  {
    id: "INV003",
    date: new Date(2023, 5, 17),
    patientName: "Charlie",
    patientId: "P003",
    ownerName: "Michael Brown",
    amount: 300.0,
    status: "Overdue",
  },
  {
    id: "INV004",
    date: new Date(2023, 5, 18),
    patientName: "Luna",
    patientId: "P004",
    ownerName: "Emily Davis",
    amount: 175.0,
    status: "Paid",
  },
  {
    id: "INV005",
    date: new Date(2023, 5, 19),
    patientName: "Cooper",
    patientId: "P005",
    ownerName: "David Wilson",
    amount: 225.0,
    status: "Pending",
  },
];

export default function BillingPage() {
  const [data, setData] = useState(invoices);
  const t = instantiateTranslation();

  const handleDelete = (id: string) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    {
      accessorKey: "id",
      header: "Invoice ID",
    },
    {
      accessorKey: "date",
      header: "Date",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row }: any) => format(row.original.date, "MMM d, yyyy"),
    },
    {
      accessorKey: "patientName",
      header: "Patient",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row }: any) => (
        <div>
          <div>{row.original.patientName}</div>
          <div className="text-xs text-muted-foreground">
            ID: {row.original.patientId}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "ownerName",
      header: "Owner",
    },
    {
      accessorKey: "amount",
      header: "Amount",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row }: any) => `$${row.original.amount.toFixed(2)}`,
    },
    {
      accessorKey: "status",
      header: "Status",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row }: any) => {
        const status = row.original.status;
        let color;
        switch (status) {
          case "Paid":
            color = "bg-green-100 text-green-800";
            break;
          case "Pending":
            color = "bg-yellow-100 text-yellow-800";
            break;
          case "Overdue":
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
        const invoice = row.original;
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
                <Link href={`/dashboard/billing/${invoice.id}`}>
                  <DropdownMenuItem>
                    <Eye className="mr-2 h-4 w-4" />
                    {t("action_view")}
                  </DropdownMenuItem>
                </Link>
                <Link href={`/dashboard/billing/${invoice.id}/edit`}>
                  <DropdownMenuItem>
                    <Pencil className="mr-2 h-4 w-4" />
                    {t("action_edit")}
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={() => handleDelete(invoice.id)}>
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
        title={t("billing_main_title")}
        description={t("billing_main_description")}
        createButtonLabel={t("billing_main_action")}
        createButtonLink="/dashboard/billing/new"
      />
      <DataTable
        columns={columns}
        data={data}
        searchColumn="patientName"
        searchPlaceholder={t("billing_main_search")}
      />
    </div>
  );
}
