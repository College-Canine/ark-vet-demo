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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getMedicalRecord = (id: string) => {
  return {
    id: "MR001",
    date: "2023-06-15",
    patientName: "Max",
    patientId: "P001",
    patientType: "Golden Retriever",
    ownerName: "John Smith",
    type: "Vaccination",
    provider: "Dr. Johnson",
    status: "Completed",
    description: "Annual vaccinations - DHPP, Rabies, Bordetella",
    notes:
      "Patient was well-behaved during the procedure. No adverse reactions observed.",
    medications:
      "DHPP Vaccine (1 ml, Subcutaneous)\nRabies Vaccine (1 ml, Subcutaneous)\nBordetella Vaccine (1 ml, Intranasal)",
    followUp: "Next vaccination due in 1 year. Schedule reminder for owner.",
  };
};

export default function EditMedicalRecordPage() {
  const params = { id: "testing" };
  const router = useRouter();
  const [formData, setFormData] = useState({
    id: "",
    date: "",
    patientName: "",
    patientId: "",
    patientType: "",
    ownerName: "",
    type: "",
    provider: "",
    status: "",
    description: "",
    notes: "",
    medications: "",
    followUp: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    const data = getMedicalRecord(params.id);
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
    router.push(`/dashboard/records/${params.id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <FormLayout
      title="Edit Medical Record"
      description={`Record #${params.id}`}
      backHref={`/dashboard/records/${params.id}`}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="id">Record ID</Label>
            <Input
              id="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
              disabled
            />
          </div>
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
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="type">Record Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => handleSelectChange("type", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Vaccination">Vaccination</SelectItem>
                <SelectItem value="Examination">Examination</SelectItem>
                <SelectItem value="Surgery">Surgery</SelectItem>
                <SelectItem value="Dental">Dental</SelectItem>
                <SelectItem value="X-Ray">X-Ray</SelectItem>
                <SelectItem value="Medication">Medication</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
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
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="provider">Provider</Label>
          <Input
            id="provider"
            name="provider"
            value={formData.provider}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
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
            <Label htmlFor="patientId">Patient ID</Label>
            <Input
              id="patientId"
              name="patientId"
              value={formData.patientId}
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
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={2}
            required
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

        <div className="space-y-2">
          <Label htmlFor="medications">Medications</Label>
          <Textarea
            id="medications"
            name="medications"
            value={formData.medications}
            onChange={handleChange}
            rows={3}
            placeholder="Name (dosage, route)"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="followUp">Follow-up</Label>
          <Textarea
            id="followUp"
            name="followUp"
            value={formData.followUp}
            onChange={handleChange}
            rows={2}
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
