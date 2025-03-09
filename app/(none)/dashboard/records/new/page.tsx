"use client";

import type React from "react";

import { useState } from "react";
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
import { PatientSearch } from "@/components/select/patient-search";
import { toast } from "sonner";

export default function NewMedicalRecordPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    patientId: "",
    type: "examination",
    status: "IN_PROGRESS",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const req = await fetch(`/api/records`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const json = await req.json();

    if (json.error) return toast(json.error);

    router.push(`/dashboard/records/${json.id}`);
  };

  return (
    <FormLayout
      title="New Medical Record"
      description="Create a new medical record"
      backHref="/dashboard/records"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="type">Record Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => handleSelectChange("type", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vaccination">Vaccination</SelectItem>
                <SelectItem value="examination">Examination</SelectItem>
                <SelectItem value="surgery">Surgery</SelectItem>
                <SelectItem value="dental">Dental</SelectItem>
                <SelectItem value="xray">X-Ray</SelectItem>
                <SelectItem value="medication">Medication</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleSelectChange("status", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="COMPLETED">Completed</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="IN_PROGRESS">In-Progress</SelectItem>
                <SelectItem value="REQUIRES_FOLLOW_UP">
                  Requires Follow Up
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="patientName">Patient</Label>
          <PatientSearch
            onSelect={(patientId) => {
              setFormData((prev) => ({ ...prev, patientId: patientId }));
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
            rows={3}
          />
        </div>

        <Button type="submit">Create Record</Button>
      </form>
    </FormLayout>
  );
}
