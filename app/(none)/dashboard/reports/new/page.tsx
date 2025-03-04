"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormLayout } from "@/components/form-layout"

export default function GenerateReportPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    startDate: "",
    endDate: "",
    includeCharts: false,
    includeTables: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would trigger report generation
    router.push("/dashboard/reports")
  }

  return (
    <FormLayout title="Generate New Report" description="Create a new report" backHref="/dashboard/reports">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Report Name</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Report Type</Label>
          <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select report type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Financial">Financial</SelectItem>
              <SelectItem value="Operational">Operational</SelectItem>
              <SelectItem value="Inventory">Inventory</SelectItem>
              <SelectItem value="Medical">Medical</SelectItem>
              <SelectItem value="HR">HR</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={3} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <Input id="endDate" name="endDate" type="date" value={formData.endDate} onChange={handleChange} required />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="flex items-center space-x-2">
            <Input
              type="checkbox"
              name="includeCharts"
              checked={formData.includeCharts}
              onChange={handleCheckboxChange}
            />
            <span>Include Charts</span>
          </Label>
        </div>

        <div className="space-y-2">
          <Label className="flex items-center space-x-2">
            <Input
              type="checkbox"
              name="includeTables"
              checked={formData.includeTables}
              onChange={handleCheckboxChange}
            />
            <span>Include Tables</span>
          </Label>
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit">Generate Report</Button>
        </div>
      </form>
    </FormLayout>
  )
}

