"use client"

import { useState } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Eye, Download } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { PageHeader } from "@/components/page-header"
import { DataTable } from "@/components/data-table"

// Mock data
const reports = [
  {
    id: "REP001",
    name: "Monthly Financial Summary",
    type: "Financial",
    generatedDate: new Date(2023, 5, 30),
    generatedBy: "John Doe",
  },
  {
    id: "REP002",
    name: "Patient Visit Statistics",
    type: "Operational",
    generatedDate: new Date(2023, 5, 15),
    generatedBy: "Jane Smith",
  },
  {
    id: "REP003",
    name: "Inventory Status",
    type: "Inventory",
    generatedDate: new Date(2023, 5, 1),
    generatedBy: "Mike Johnson",
  },
  {
    id: "REP004",
    name: "Staff Performance Review",
    type: "HR",
    generatedDate: new Date(2023, 4, 30),
    generatedBy: "Sarah Brown",
  },
  {
    id: "REP005",
    name: "Treatment Effectiveness Analysis",
    type: "Medical",
    generatedDate: new Date(2023, 4, 15),
    generatedBy: "Dr. Emily Davis",
  },
]

export default function ReportsPage() {
  const [data, setData] = useState(reports)

  const columns = [
    {
      accessorKey: "id",
      header: "Report ID",
    },
    {
      accessorKey: "name",
      header: "Report Name",
    },
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      accessorKey: "generatedDate",
      header: "Generated Date",
      cell: ({ row }) => format(row.original.generatedDate, "MMM d, yyyy"),
    },
    {
      accessorKey: "generatedBy",
      header: "Generated By",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const report = row.original
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
                <Link href={`/dashboard/reports/${report.id}`}>
                  <DropdownMenuItem>
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4" />
                  Download
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
        title="Reports"
        description="View and generate reports."
        createButtonLabel="Generate New Report"
        createButtonLink="/dashboard/reports/new"
      />
      <DataTable columns={columns} data={data} searchColumn="name" searchPlaceholder="Search reports..." />
    </div>
  )
}

