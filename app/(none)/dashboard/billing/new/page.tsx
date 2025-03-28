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

export default function NewInvoicePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    date: "",
    dueDate: "",
    patientName: "",
    patientId: "",
    patientType: "",
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",
    amount: "",
    status: "Pending",
    items: [{ description: "", quantity: "", unitPrice: "" }],
    notes: "",
    paymentMethod: "",
    paymentDate: "",
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

  const handleItemChange = (index: number, field: string, value: string) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData((prev) => ({ ...prev, items: newItems }));
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { description: "", quantity: "", unitPrice: "" }],
    }));
  };

  const removeItem = (index: number) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, items: newItems }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    (async () => {
      const req = await fetch(`/api/invoices`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const json = await req.json();

      if (json.error) return toast(json.error);

      // In a real app, this would be an API call
      router.push("/dashboard/billing");
    })();
  };

  return (
    <FormLayout
      title="New Invoice"
      description="Create a new invoice"
      backHref="/dashboard/billing"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="date">Invoice Date</Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="patient">Patient</Label>
          <PatientSearch
            onSelect={function (patient: string): void {
              setFormData((prev) => ({ ...prev, patientId: patient }));
            }}
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">General Charges</h3>
          {formData.items.map((item, index) => (
            <div key={index} className="grid gap-4 sm:grid-cols-3 mb-4">
              <div className="space-y-2">
                <Label htmlFor={`item-description-${index}`}>Description</Label>
                <Input
                  id={`item-description-${index}`}
                  value={item.description}
                  onChange={(e) =>
                    handleItemChange(index, "description", e.target.value)
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`item-quantity-${index}`}>Quantity</Label>
                <Input
                  id={`item-quantity-${index}`}
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(index, "quantity", e.target.value)
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`item-unitPrice-${index}`}>Unit Price</Label>
                <Input
                  id={`item-unitPrice-${index}`}
                  type="number"
                  step="0.01"
                  value={item.unitPrice}
                  onChange={(e) =>
                    handleItemChange(index, "unitPrice", e.target.value)
                  }
                  required
                />
              </div>
            </div>
          ))}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={addItem}>
              Add Item
            </Button>
            {formData.items.length > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => removeItem(formData.items.length - 1)}
              >
                Remove Last Item
              </Button>
            )}
          </div>
        </div>

        {/* <div>
          <h3 className="text-lg font-medium mb-4">Item Charges</h3>
          {formData.items.map((item, index) => (
            <div key={index} className="grid gap-4 sm:grid-cols-3 mb-4">
              <div className="space-y-2">
                <Label htmlFor={`item-description-${index}`}>Description</Label>
                <Input
                  id={`item-description-${index}`}
                  value={item.description}
                  onChange={(e) =>
                    handleItemChange(index, "description", e.target.value)
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`item-quantity-${index}`}>Quantity</Label>
                <Input
                  id={`item-quantity-${index}`}
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(index, "quantity", e.target.value)
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`item-unitPrice-${index}`}>Unit Price</Label>
                <Input
                  id={`item-unitPrice-${index}`}
                  type="number"
                  step="0.01"
                  value={item.unitPrice}
                  onChange={(e) =>
                    handleItemChange(index, "unitPrice", e.target.value)
                  }
                  required
                />
              </div>
            </div>
          ))}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={addItem}>
              Add Item
            </Button>
            {formData.items.length > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => removeItem(formData.items.length - 1)}
              >
                Remove Last Item
              </Button>
            )}
          </div>
        </div> */}

        <div className="space-y-2">
          <Label htmlFor="amount">
            Total Amount:{" "}
            {formData.items.reduce(
              (a, b) => a + parseInt(b.quantity) * parseFloat(b.unitPrice),
              0
            )}
          </Label>
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

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="paymentMethod">Payment Method</Label>
            <Select
              value={formData.paymentMethod}
              onValueChange={(value) =>
                handleSelectChange("paymentMethod", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Credit Card">Credit Card</SelectItem>
                <SelectItem value="Debit Card">Debit Card</SelectItem>
                <SelectItem value="Cash">Cash</SelectItem>
                <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit">Create Invoice</Button>
        </div>
      </form>
    </FormLayout>
  );
}
