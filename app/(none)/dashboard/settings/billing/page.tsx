"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormLayout } from "@/components/form-layout";

export default function BillingSettingsPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    currency: "USD",
    taxRate: "10",
    invoicePrefix: "INV-",
    invoiceFooter: "Thank you for your business!",
    paymentTerms: "Due within 30 days",
    enableOnlinePayments: true,
    paymentGateway: "stripe",
    stripeApiKey: "",
    paypalClientId: "",
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

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save the settings
    console.log("Saving billing settings:", formData);
    router.push("/dashboard/settings");
  };

  return (
    <FormLayout
      title="Billing & Payments Settings"
      description="Configure payment methods and invoice settings"
      backHref="/dashboard/settings"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="currency">Currency</Label>
          <Select
            value={formData.currency}
            onValueChange={(value) => handleSelectChange("currency", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD - US Dollar</SelectItem>
              <SelectItem value="EUR">EUR - Euro</SelectItem>
              <SelectItem value="GBP">GBP - British Pound</SelectItem>
              <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="taxRate">Default Tax Rate (%)</Label>
          <Input
            id="taxRate"
            name="taxRate"
            type="number"
            min="0"
            max="100"
            step="0.01"
            value={formData.taxRate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="invoicePrefix">Invoice Number Prefix</Label>
          <Input
            id="invoicePrefix"
            name="invoicePrefix"
            value={formData.invoicePrefix}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="invoiceFooter">Default Invoice Footer</Label>
          <Textarea
            id="invoiceFooter"
            name="invoiceFooter"
            value={formData.invoiceFooter}
            onChange={handleChange}
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="paymentTerms">Default Payment Terms</Label>
          <Input
            id="paymentTerms"
            name="paymentTerms"
            value={formData.paymentTerms}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="enableOnlinePayments"
            checked={formData.enableOnlinePayments}
            onCheckedChange={(checked: boolean) =>
              handleSwitchChange("enableOnlinePayments", checked)
            }
          />
          <Label htmlFor="enableOnlinePayments">Enable Online Payments</Label>
        </div>

        {formData.enableOnlinePayments && (
          <>
            <div className="space-y-2">
              <Label htmlFor="paymentGateway">Payment Gateway</Label>
              <Select
                value={formData.paymentGateway}
                onValueChange={(value) =>
                  handleSelectChange("paymentGateway", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payment gateway" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="stripe">Stripe</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.paymentGateway === "stripe" && (
              <div className="space-y-2">
                <Label htmlFor="stripeApiKey">Stripe API Key</Label>
                <Input
                  id="stripeApiKey"
                  name="stripeApiKey"
                  type="password"
                  value={formData.stripeApiKey}
                  onChange={handleChange}
                />
              </div>
            )}

            {formData.paymentGateway === "paypal" && (
              <div className="space-y-2">
                <Label htmlFor="paypalClientId">PayPal Client ID</Label>
                <Input
                  id="paypalClientId"
                  name="paypalClientId"
                  type="password"
                  value={formData.paypalClientId}
                  onChange={handleChange}
                />
              </div>
            )}
          </>
        )}

        <div className="flex justify-end">
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </FormLayout>
  );
}
