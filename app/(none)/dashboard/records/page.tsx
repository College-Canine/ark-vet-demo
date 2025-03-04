"use client"

import { useState } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Eye, Pencil, Trash } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { PageHeader } from "@/components/page-header"
import { DataTable } from "@/components/data-table"

// Mock data
const records = [
  {
    id: "MR001",
    date: new Date(2023, 5, 15),
    patientName: "Max",
    patientId: "P001",
    type: "Vaccination",
    provider: "Dr. Johnson",
    status: "Completed",
  },
  {
    id: "MR002",
    date: new Date(2023, 5, 14),
    patientName: "Bella",
    patientId: "P002",
    type: "Surgery",
    provider: "Dr. Wilson",
    status: "Completed",
  },
  {
    id: "MR003",
    date: new Date(2023, 5, 13),
    patientName: "Charlie",
    patientId: "P003",
    type: "Examination",
    provider: "Dr. Martinez",
    status: "Completed",
  },
  {
    id: "MR004",
    date: new Date(2023, 5, 12),
    patientName: "Luna",
    patientId: "P004",
    type: "Dental",
    provider: "Dr. Johnson",
    status: "Completed",
  },
  {
    id: "MR005",
    date: new Date(2023, 5, 11),
    patientName: "Cooper",
    patientId: "P005",
    type: "X-Ray",
    provider: "Dr. Wilson",
    status: "Completed",
  },
  {
    id: "MR006",
    date: new Date(2023, 5, 10),
    patientName: "Lucy",
    patientId: "P006",
    type: "Medication",
    provider: "Dr. Martinez",
    status: "Completed",
  },
  {
    id: "MR007",
    date: new Date(2023, 5, 9),
    patientName: "Oliver",
    patientId: "P007",
    type: "Vaccination",
    provider: "Dr. Johnson",
    status: "Completed",
  },
  {
    id: "MR008",
    date: new Date(2023, 5, 8),
    patientName: "Daisy",
    patientId: "P008",
    type: "Examination",
    provider: "Dr. Wilson",
    status: "Completed",
  },
  {
    id: "MR009",
    date: new Date(2023, 5, 7),
    patientName: "Rocky",
    patientId: "P009",
    type: "Surgery",
    provider: "Dr. Martinez",
    status: "Completed",
  },
  {
    id: "MR010",
    date: new Date(2023, 5, 6),
    patientName: "Milo",
    patientId: "P010",
    type: "Vaccination",
    provider: "Dr. Johnson",
    status: "Completed",
  },
]

export default function MedicalRecordsPage() {
  const [data, setData] = useState(records)

  const handleDelete = (id: string) => {
    setData(data.filter((item) => item.id !== id))
  }

  const columns = [
    {
      accessorKey: "id",
      header: "Record ID",
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => format(row.original.date, "MMM d, yyyy"),
    },
    {
      accessorKey: "patientName",
      header: "Patient",
      cell: ({ row }) => (
        <div>
          <div>{row.original.patientName}</div>
          <div className="text-xs text-muted-foreground">ID: {row.original.patientId}</div>
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
      cell: ({ row }) => {
        const status = row.original.status
        return <Badge className="bg-green-100 text-green-800">{status}</Badge>
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const record = row.original
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
                    View
                  </DropdownMenuItem>
                </Link>
                <Link href={`/dashboard/records/${record.id}/edit`}>
                  <DropdownMenuItem>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={() => handleDelete(record.id)}>
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      },
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Medical Records"
        description="View and manage patient medical records."
        createButtonLabel="New Record"
        createButtonLink="/dashboard/records/new"
      />
      <DataTable columns={columns} data={data} searchColumn="patientName" searchPlaceholder="Search patients..." />
    </div>
  )
}

