"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { FormLayout } from "@/components/form-layout"

export default function NotificationsSettingsPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    enableEmailNotifications: true,
    emailSender: "noreply@acmevet.com",
    emailSignature: "Best regards,\nThe Acme Vet Team",
    enableSmsNotifications: false,
    smsPhoneNumber: "",
    appointmentReminders: true,
    appointmentReminderTime: "24",
    newAppointmentNotifications: true,
    cancelledAppointmentNotifications: true,
    invoiceNotifications: true,
    lowInventoryAlerts: true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would save the settings
    console.log("Saving notification settings:", formData)
    router.push("/dashboard/settings")
  }

  return (
    <FormLayout
      title="Notification Settings"
      description="Configure email and SMS notifications"
      backHref="/dashboard/settings"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Email Notifications</h2>
          <div className="flex items-center space-x-2">
            <Switch
              id="enableEmailNotifications"
              checked={formData.enableEmailNotifications}
              onCheckedChange={(checked) => handleSwitchChange("enableEmailNotifications", checked)}
            />
            <Label htmlFor="enableEmailNotifications">Enable Email Notifications</Label>
          </div>

          {formData.enableEmailNotifications && (
            <>
              <div className="space-y-2">
                <Label htmlFor="emailSender">Email Sender Address</Label>
                <Input
                  id="emailSender"
                  name="emailSender"
                  type="email"
                  value={formData.emailSender}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emailSignature">Email Signature</Label>
                <Textarea
                  id="emailSignature"
                  name="emailSignature"
                  value={formData.emailSignature}
                  onChange={handleChange}
                  rows={3}
                />
              </div>
            </>
          )}
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">SMS Notifications</h2>
          <div className="flex items-center space-x-2">
            <Switch
              id="enableSmsNotifications"
              checked={formData.enableSmsNotifications}
              onCheckedChange={(checked) => handleSwitchChange("enableSmsNotifications", checked)}
            />
            <Label htmlFor="enableSmsNotifications">Enable SMS Notifications</Label>
          </div>

          {formData.enableSmsNotifications && (
            <div className="space-y-2">
              <Label htmlFor="smsPhoneNumber">SMS Sender Phone Number</Label>
              <Input
                id="smsPhoneNumber"
                name="smsPhoneNumber"
                type="tel"
                value={formData.smsPhoneNumber}
                onChange={handleChange}
                required
              />
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Notification Types</h2>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Switch
                id="appointmentReminders"
                checked={formData.appointmentReminders}
                onCheckedChange={(checked) => handleSwitchChange("appointmentReminders", checked)}
              />
              <Label htmlFor="appointmentReminders">Appointment Reminders</Label>
            </div>
            {formData.appointmentReminders && (
              <div className="ml-6 space-y-2">
                <Label htmlFor="appointmentReminderTime">Send Reminder (hours before appointment)</Label>
                <Input
                  id="appointmentReminderTime"
                  name="appointmentReminderTime"
                  type="number"
                  min="1"
                  max="72"
                  value={formData.appointmentReminderTime}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="newAppointmentNotifications"
              checked={formData.newAppointmentNotifications}
              onCheckedChange={(checked) => handleSwitchChange("newAppointmentNotifications", checked)}
            />
            <Label htmlFor="newAppointmentNotifications">New Appointment Notifications</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="cancelledAppointmentNotifications"
              checked={formData.cancelledAppointmentNotifications}
              onCheckedChange={(checked) => handleSwitchChange("cancelledAppointmentNotifications", checked)}
            />
            <Label htmlFor="cancelledAppointmentNotifications">Cancelled Appointment Notifications</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="invoiceNotifications"
              checked={formData.invoiceNotifications}
              onCheckedChange={(checked) => handleSwitchChange("invoiceNotifications", checked)}
            />
            <Label htmlFor="invoiceNotifications">Invoice Notifications</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="lowInventoryAlerts"
              checked={formData.lowInventoryAlerts}
              onCheckedChange={(checked) => handleSwitchChange("lowInventoryAlerts", checked)}
            />
            <Label htmlFor="lowInventoryAlerts">Low Inventory Alerts</Label>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </FormLayout>
  )
}

