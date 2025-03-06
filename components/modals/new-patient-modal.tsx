"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Gender } from "@prisma/client";
import { OwnerSearch } from "../select/owner-search";

type NewPatientModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (patient: string) => void;
};

export function NewPatientModal({
  isOpen,
  onClose,
  onSave,
}: NewPatientModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    gender: Gender.UNKNOWN,
    species: "",
    breed: "",
    ownerId: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const response = await fetch("/api/patients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    onSave(data.id);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Patient</DialogTitle>
          <DialogDescription>
            Enter the details for the new patient.
          </DialogDescription>
        </DialogHeader>
        <form>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="breed" className="text-right">
                Breed
              </Label>
              <Input
                id="breed"
                name="breed"
                value={formData.breed}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender" className="text-right">
                Gender
              </Label>
              <Input
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender" className="text-right">
                Owner
              </Label>
              <OwnerSearch
                onSelect={(item) => {
                  setFormData((prev) => ({ ...prev, ownerId: item }));
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSubmit} type="button">
              Save Patient
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
