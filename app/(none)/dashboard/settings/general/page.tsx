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

export default function GeneralSettingsPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    clinicName: "Acme Vet Clinic",
    address: "123 Main St, Anytown, USA",
    phone: "(555) 123-4567",
    email: "info@acmevet.com",
    website: "https://www.acmevet.com",
    businessHours: "Mon-Fri: 9am-6pm, Sat: 10am-4pm, Sun: Closed",
    timezone: "America/New_York",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12h",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would save the settings
    console.log("Saving settings:", formData)
    router.push("/dashboard/settings")
  }

  return (
    <FormLayout
      title="General Settings"
      description="Manage your clinic's basic information and preferences"
      backHref="/dashboard/settings"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="clinicName">Clinic Name</Label>
          <Input id="clinicName" name="clinicName" value={formData.clinicName} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Textarea id="address" name="address" value={formData.address} onChange={handleChange} rows={3} required />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input id="website" name="website" type="url" value={formData.website} onChange={handleChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="businessHours">Business Hours</Label>
          <Textarea
            id="businessHours"
            name="businessHours"
            value={formData.businessHours}
            onChange={handleChange}
            rows={3}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="timezone">Timezone</Label>
          <Select value={formData.timezone} onValueChange={(value) => handleSelectChange("timezone", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select timezone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
              <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
              <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
              <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="dateFormat">Date Format</Label>
            <Select value={formData.dateFormat} onValueChange={(value) => handleSelectChange("dateFormat", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select date format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="timeFormat">Time Format</Label>
            <Select value={formData.timeFormat} onValueChange={(value) => handleSelectChange("timeFormat", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select time format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12h">12-hour</SelectItem>
                <SelectItem value="24h">24-hour</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </FormLayout>
  )
}

