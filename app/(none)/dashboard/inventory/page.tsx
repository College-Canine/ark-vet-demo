"use client"

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Eye, Pencil, Trash } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { PageHeader } from "@/components/page-header"
import { DataTable } from "@/components/data-table"

// Mock data
const inventoryItems = [
  {
    id: "INV001",
    name: "Vaccine A",
    category: "Vaccines",
    quantity: 100,
    unit: "doses",
    reorderPoint: 20,
    status: "In Stock",
  },
  {
    id: "INV002",
    name: "Antibiotic B",
    category: "Medications",
    quantity: 50,
    unit: "bottles",
    reorderPoint: 10,
    status: "Low Stock",
  },
  {
    id: "INV003",
    name: "Syringe C",
    category: "Supplies",
    quantity: 500,
    unit: "pieces",
    reorderPoint: 100,
    status: "In Stock",
  },
  {
    id: "INV004",
    name: "Pet Food D",
    category: "Food",
    quantity: 25,
    unit: "bags",
    reorderPoint: 5,
    status: "In Stock",
  },
  {
    id: "INV005",
    name: "Shampoo E",
    category: "Grooming",
    quantity: 30,
    unit: "bottles",
    reorderPoint: 10,
    status: "In Stock",
  },
]

export default function InventoryPage() {
  const [data, setData] = useState(inventoryItems)

  const handleDelete = (id: string) => {
    setData(data.filter((item) => item.id !== id))
  }

  const columns = [
    {
      accessorKey: "id",
      header: "Item ID",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      cell: ({ row }) => `${row.original.quantity} ${row.original.unit}`,
    },
    {
      accessorKey: "reorderPoint",
      header: "Reorder Point",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status
        let color
        switch (status) {
          case "In Stock":
            color = "bg-green-100 text-green-800"
            break
          case "Low Stock":
            color = "bg-yellow-100 text-yellow-800"
            break
          case "Out of Stock":
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
        const item = row.original
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
                    View
                  </DropdownMenuItem>
                </Link>
                <Link href={`/dashboard/inventory/${item.id}/edit`}>
                  <DropdownMenuItem>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={() => handleDelete(item.id)}>
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
        title="Inventory"
        description="Manage your inventory items."
        createButtonLabel="New Item"
        createButtonLink="/dashboard/inventory/new"
      />
      <DataTable columns={columns} data={data} searchColumn="name" searchPlaceholder="Search items..." />
    </div>
  )
}

