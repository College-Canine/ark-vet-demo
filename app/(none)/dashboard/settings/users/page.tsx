"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormLayout } from "@/components/form-layout"

const initialUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Veterinarian" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "Receptionist" },
]

export default function UsersSettingsPage() {
  const [users, setUsers] = useState(initialUsers)
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "" })

  const handleNewUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewUser((prev) => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (userId: number, newRole: string) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, role: newRole } : user)))
  }

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault()
    if (newUser.name && newUser.email && newUser.role) {
      setUsers([...users, { ...newUser, id: users.length + 1 }])
      setNewUser({ name: "", email: "", role: "" })
    }
  }

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter((user) => user.id !== userId))
  }

  return (
    <FormLayout
      title="Users & Permissions"
      description="Manage staff accounts and access levels"
      backHref="/dashboard/settings"
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold">Current Users</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Select value={user.role} onValueChange={(value) => handleRoleChange(user.id, value)}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Veterinarian">Veterinarian</SelectItem>
                        <SelectItem value="Receptionist">Receptionist</SelectItem>
                        <SelectItem value="Technician">Technician</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteUser(user.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Add New User</h2>
          <form onSubmit={handleAddUser} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <Input name="name" placeholder="Name" value={newUser.name} onChange={handleNewUserChange} required />
              <Input
                name="email"
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={handleNewUserChange}
                required
              />
              <Select value={newUser.role} onValueChange={(value) => setNewUser((prev) => ({ ...prev, role: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Veterinarian">Veterinarian</SelectItem>
                  <SelectItem value="Receptionist">Receptionist</SelectItem>
                  <SelectItem value="Technician">Technician</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit">Add User</Button>
          </form>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Role Permissions</h2>
          <p className="text-sm text-muted-foreground">
            Configure detailed permissions for each role{" "}
            <Link href="/dashboard/settings/users/permissions" className="text-primary hover:underline">
              here
            </Link>
            .
          </p>
        </div>
      </div>
    </FormLayout>
  )
}

