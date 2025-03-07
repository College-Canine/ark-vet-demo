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
import { SupplierSearch } from "@/components/select/supplier-search";
import { toast } from "sonner";
import { instantiateTranslation } from "@/lib/translation";

export default function NewInventoryItemPage() {
  const t = instantiateTranslation();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    quantity: "",
    unit: "",
    reorderPoint: "",
    supplierId: "",
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

    const req = await fetch(`/api/inventory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const json = await req.json();

    if (json.error) return toast(json.error);

    // In a real app, this would be an API call
    router.push(`/dashboard/inventory/${json.id}`);
  };

  return (
    <FormLayout
      title="New Inventory Item"
      description="Add a new item to inventory"
      backHref="/dashboard/inventory"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleSelectChange("category", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="diagnostic-equipment">
                  {t("inventory_category_diagnostic-equipment")}
                </SelectItem>
                <SelectItem value="surgical-instruments">
                  {t("inventory_category_surgical-instruments")}
                </SelectItem>
                <SelectItem value="wound-care">
                  {t("inventory_category_wound-care")}
                </SelectItem>
                <SelectItem value="medications">
                  {t("inventory_category_medications")}
                </SelectItem>
                <SelectItem value="vaccines">
                  {t("inventory_category_vaccines")}
                </SelectItem>
                <SelectItem value="anesthesia-supplies">
                  {t("inventory_category_anesthesia-supplies")}
                </SelectItem>
                <SelectItem value="dental-care">
                  {t("inventory_category_dental-care")}
                </SelectItem>
                <SelectItem value="rehabilitation-therapy">
                  {t("inventory_category_rehabilitation-therapy")}
                </SelectItem>
                <SelectItem value="parasiticides">
                  {t("inventory_category_parasiticides")}
                </SelectItem>
                <SelectItem value="nutrition-supplements">
                  {t("inventory_category_nutrition-supplements")}
                </SelectItem>
                <SelectItem value="bandaging-materials">
                  {t("inventory_category_bandaging-materials")}
                </SelectItem>
                <SelectItem value="fluid-therapy">
                  {t("inventory_category_fluid-therapy")}
                </SelectItem>
                <SelectItem value="emergency-care">
                  {t("inventory_category_emergency-care")}
                </SelectItem>
                <SelectItem value="imaging-supplies">
                  {t("inventory_category_imaging-supplies")}
                </SelectItem>
                <SelectItem value="restraint-equipment">
                  {t("inventory_category_restraint-equipment")}
                </SelectItem>
                <SelectItem value="laboratory-supplies">
                  {t("inventory_category_laboratory-supplies")}
                </SelectItem>
                <SelectItem value="disinfectants-cleaning">
                  {t("inventory_category_disinfectants-cleaning")}
                </SelectItem>
                <SelectItem value="bedding-housing">
                  {t("inventory_category_bedding-housing")}
                </SelectItem>
                <SelectItem value="feeding-equipment">
                  {t("inventory_category_feeding-equipment")}
                </SelectItem>
                <SelectItem value="microchips-identification">
                  {t("inventory_category_microchips-identification")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="unit">Unit</Label>
            <Input
              id="unit"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reorderPoint">Reorder Point</Label>
            <Input
              id="reorderPoint"
              name="reorderPoint"
              type="number"
              value={formData.reorderPoint}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="supplier">Supplier</Label>
          <SupplierSearch
            onSelect={(supplierId) => {
              setFormData((prev) => ({ ...prev, supplierId: supplierId }));
            }}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit">Create Item</Button>
        </div>
      </form>
    </FormLayout>
  );
}
