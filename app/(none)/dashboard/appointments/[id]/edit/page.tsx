"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormLayout } from "@/components/form-layout";

// Mock data function
const getAppointment = (id: string) => {
  const appointments = [
    {
      id: "1",
      date: "2023-06-15T09:00",
      patientName: "Max",
      patientType: "Golden Retriever",
      patientId: "P001",
      ownerName: "John Smith",
      ownerPhone: "(555) 123-4567",
      ownerEmail: "john.smith@example.com",
      reason: "Annual checkup",
      notes:
        "Patient due for vaccinations. Owner mentioned slight limping in right front leg.",
      status: "Confirmed",
      duration: "30",
    },
  ];
  return appointments.find((a) => a.id === id);
};

export default function EditAppointmentPage() {
  const params = { id: "testing" };
  const router = useRouter();
  const [formData, setFormData] = useState({
    date: "",
    patientName: "",
    patientType: "",
    patientId: "",
    ownerName: "",
    ownerPhone: "",
    ownerEmail: "",
    reason: "",
    notes: "",
    status: "",
    duration: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    const data = getAppointment(params.id);
    if (data) {
      setFormData(data);
    }
    setLoading(false);
  }, [params.id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would be an API call
    router.push(`/dashboard/appointments/${params.id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <FormLayout
      title="Edit Appointment"
      description={`Appointment #${params.id}`}
      backHref={`/dashboard/appointments/${params.id}`}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="date">Date & Time</Label>
            <Input
              id="date"
              name="date"
              type="datetime-local"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Input
              id="duration"
              name="duration"
              type="number"
              value={formData.duration}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value) => handleSelectChange("status", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Confirmed">Confirmed</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="reason">Reason for Visit</Label>
          <Input
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="patientName">Patient Name</Label>
            <Input
              id="patientName"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="patientType">Patient Type</Label>
            <Input
              id="patientType"
              name="patientType"
              value={formData.patientType}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="patientId">Patient ID</Label>
          <Input
            id="patientId"
            name="patientId"
            value={formData.patientId}
            onChange={handleChange}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="ownerName">Owner Name</Label>
            <Input
              id="ownerName"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ownerPhone">Owner Phone</Label>
            <Input
              id="ownerPhone"
              name="ownerPhone"
              value={formData.ownerPhone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ownerEmail">Owner Email</Label>
            <Input
              id="ownerEmail"
              name="ownerEmail"
              type="email"
              value={formData.ownerEmail}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </FormLayout>
  );
}
