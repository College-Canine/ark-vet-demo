"use client";

import { useState } from "react";
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

// Mock data
const patients = [
  {
    id: "P001",
    name: "Max",
    type: "Golden Retriever",
    breed: "Golden Retriever",
    age: 5,
    gender: "Male",
    ownerName: "John Smith",
    status: "Active",
  },
  {
    id: "P002",
    name: "Bella",
    type: "Cat",
    breed: "Siamese",
    age: 3,
    gender: "Female",
    ownerName: "Sarah Johnson",
    status: "Active",
  },
  {
    id: "P003",
    name: "Charlie",
    type: "Dog",
    breed: "Labrador",
    age: 7,
    gender: "Male",
    ownerName: "Michael Brown",
    status: "Active",
  },
  {
    id: "P004",
    name: "Luna",
    type: "Cat",
    breed: "Maine Coon",
    age: 2,
    gender: "Female",
    ownerName: "Emily Davis",
    status: "Active",
  },
  {
    id: "P005",
    name: "Cooper",
    type: "Dog",
    breed: "Beagle",
    age: 4,
    gender: "Male",
    ownerName: "David Wilson",
    status: "Active",
  },
  {
    id: "P006",
    name: "Lucy",
    type: "Dog",
    breed: "Dachshund",
    age: 6,
    gender: "Female",
    ownerName: "Jennifer Taylor",
    status: "Inactive",
  },
  {
    id: "P007",
    name: "Oliver",
    type: "Cat",
    breed: "Persian",
    age: 8,
    gender: "Male",
    ownerName: "Robert Anderson",
    status: "Active",
  },
  {
    id: "P008",
    name: "Daisy",
    type: "Dog",
    breed: "Shih Tzu",
    age: 3,
    gender: "Female",
    ownerName: "Jessica Martinez",
    status: "Active",
  },
  {
    id: "P009",
    name: "Rocky",
    type: "Dog",
    breed: "German Shepherd",
    age: 5,
    gender: "Male",
    ownerName: "Thomas Garcia",
    status: "Active",
  },
  {
    id: "P010",
    name: "Milo",
    type: "Cat",
    breed: "Bengal",
    age: 4,
    gender: "Male",
    ownerName: "Lisa Robinson",
    status: "Inactive",
  },
];

export default function PatientsPage() {
  const [data, setData] = useState(patients);

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
      accessorKey: "type",
      header: "Type",
    },
    {
      accessorKey: "breed",
      header: "Breed",
    },
    {
      accessorKey: "age",
      header: "Age",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row }: any) => `${row.original.age} years`,
    },
    {
      accessorKey: "gender",
      header: "Gender",
    },
    {
      accessorKey: "ownerName",
      header: "Owner",
    },
    {
      accessorKey: "status",
      header: "Status",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row }: any) => {
        const status = row.original.status;
        return (
          <Badge
            className={
              status === "Active"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }
          >
            {status}
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
                    View
                  </DropdownMenuItem>
                </Link>
                <Link href={`/dashboard/patients/${patient.id}/edit`}>
                  <DropdownMenuItem>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={() => handleDelete(patient.id)}>
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
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
        title="Patients"
        description="Manage your patient records."
        createButtonLabel="New Patient"
        createButtonLink="/dashboard/patients/new"
      />
      <DataTable
        columns={columns}
        data={data}
        searchColumn="name"
        searchPlaceholder="Search patients..."
      />
    </div>
  );
}
