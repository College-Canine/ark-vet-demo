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
const appointments = [
  {
    id: "1",
    date: new Date(2023, 5, 15, 9, 0),
    patientName: "Max",
    patientType: "Golden Retriever",
    ownerName: "John Smith",
    reason: "Annual checkup",
    status: "Confirmed",
  },
  {
    id: "2",
    date: new Date(2023, 5, 15, 10, 0),
    patientName: "Bella",
    patientType: "Siamese Cat",
    ownerName: "Sarah Johnson",
    reason: "Vaccination",
    status: "Confirmed",
  },
  {
    id: "3",
    date: new Date(2023, 5, 15, 11, 0),
    patientName: "Charlie",
    patientType: "Labrador",
    ownerName: "Michael Brown",
    reason: "Skin issue",
    status: "Confirmed",
  },
  {
    id: "4",
    date: new Date(2023, 5, 15, 13, 0),
    patientName: "Luna",
    patientType: "Maine Coon",
    ownerName: "Emily Davis",
    reason: "Dental cleaning",
    status: "Pending",
  },
  {
    id: "5",
    date: new Date(2023, 5, 15, 14, 0),
    patientName: "Cooper",
    patientType: "Beagle",
    ownerName: "David Wilson",
    reason: "Limping",
    status: "Confirmed",
  },
  {
    id: "6",
    date: new Date(2023, 5, 15, 15, 0),
    patientName: "Lucy",
    patientType: "Dachshund",
    ownerName: "Jennifer Taylor",
    reason: "Ear infection",
    status: "Cancelled",
  },
  {
    id: "7",
    date: new Date(2023, 5, 15, 16, 0),
    patientName: "Oliver",
    patientType: "Persian Cat",
    ownerName: "Robert Anderson",
    reason: "Weight check",
    status: "Confirmed",
  },
  {
    id: "8",
    date: new Date(2023, 5, 16, 9, 0),
    patientName: "Daisy",
    patientType: "Shih Tzu",
    ownerName: "Jessica Martinez",
    reason: "Vaccination",
    status: "Confirmed",
  },
  {
    id: "9",
    date: new Date(2023, 5, 16, 10, 0),
    patientName: "Rocky",
    patientType: "German Shepherd",
    ownerName: "Thomas Garcia",
    reason: "Hip evaluation",
    status: "Pending",
  },
  {
    id: "10",
    date: new Date(2023, 5, 16, 11, 0),
    patientName: "Milo",
    patientType: "Bengal Cat",
    ownerName: "Lisa Robinson",
    reason: "Vomiting",
    status: "Confirmed",
  },
]

export default function AppointmentsPage() {
  const [data, setData] = useState(appointments)

  const handleDelete = (id: string) => {
    setData(data.filter((item) => item.id !== id))
  }

  const columns = [
    {
      accessorKey: "date",
      header: "Date & Time",
      cell: ({ row }) => format(row.original.date, "MMM d, yyyy h:mm a"),
    },
    {
      accessorKey: "patientName",
      header: "Patient",
      cell: ({ row }) => (
        <div>
          <div>{row.original.patientName}</div>
          <div className="text-xs text-muted-foreground">{row.original.patientType}</div>
        </div>
      ),
    },
    {
      accessorKey: "ownerName",
      header: "Owner",
    },
    {
      accessorKey: "reason",
      header: "Reason",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status
        let color
        switch (status) {
          case "Confirmed":
            color = "bg-green-100 text-green-800"
            break
          case "Pending":
            color = "bg-yellow-100 text-yellow-800"
            break
          case "Cancelled":
            color = "bg-red-100 text-red-800"
            break
          default:
            color = "bg-gray-100 text-gray-800"
        }
        return <Badge className={color}>{status}</Badge>
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const appointment = row.original
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
                    View
                  </DropdownMenuItem>
                </Link>
                <Link href={`/dashboard/appointments/${appointment.id}/edit`}>
                  <DropdownMenuItem>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={() => handleDelete(appointment.id)}>
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
        title="Appointments"
        description="Manage your upcoming and past appointments."
        createButtonLabel="New Appointment"
        createButtonLink="/dashboard/appointments/new"
      />
      <DataTable columns={columns} data={data} searchColumn="patientName" searchPlaceholder="Search patients..." />
    </div>
  )
}

