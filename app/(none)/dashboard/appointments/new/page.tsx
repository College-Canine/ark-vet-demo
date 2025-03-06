"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormLayout } from "@/components/form-layout";
// import { OwnerSearch } from "@/components/select/owner-search";
import { PatientSearch } from "@/components/select/patient-search";
import { toast } from "sonner";

export default function NewAppointmentPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    date: "",
    patientId: "",
    reason: "",
    notes: "",
    duration: "30",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const req = await fetch(`/api/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const json = await req.json();

    if (json.error) return toast(json.error);

    console.log(json);

    // In a real app, this would be an API call
    router.push("/dashboard/appointments");
  };

  return (
    <FormLayout
      title="New Appointment"
      description="Schedule a new appointment"
      backHref="/dashboard/appointments"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-row gap-2">
          <div className="space-y-2 w-full">
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
          <div className="space-y-2 w-full">
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
          <Label htmlFor="reason">Reason for Visit</Label>
          <Input
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Patient</Label>
          <PatientSearch
            onSelect={(owner: string) => {
              setFormData((prev) => ({ ...prev, patientId: owner }));
            }}
          />
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
          <Button type="submit">Create Appointment</Button>
        </div>
      </form>
    </FormLayout>
  );
}
