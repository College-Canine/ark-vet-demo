"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormLayout } from "@/components/form-layout";

export default function DataPrivacySettingsPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    dataRetentionPeriod: "5",
    dataRetentionUnit: "years",
    automaticDeletion: false,
    privacyPolicyUrl: "",
    privacyContactEmail: "",
    consentFormText: "",
    enableDataEncryption: true,
    enableAuditLogs: true,
    enableAnonymization: false,
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
    console.log("Saving data & privacy settings:", formData);
    router.push("/dashboard/settings");
  };

  return (
    <FormLayout
      title="Data & Privacy Settings"
      description="Manage data retention and privacy settings"
      backHref="/dashboard/settings"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label>Data Retention Period</Label>
          <div className="flex space-x-2">
            <Input
              type="number"
              name="dataRetentionPeriod"
              value={formData.dataRetentionPeriod}
              onChange={handleChange}
              min="1"
              className="w-24"
            />
            <Select
              value={formData.dataRetentionUnit}
              onValueChange={(value) =>
                handleSelectChange("dataRetentionUnit", value)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="days">Days</SelectItem>
                <SelectItem value="months">Months</SelectItem>
                <SelectItem value="years">Years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="automaticDeletion"
            checked={formData.automaticDeletion}
            onCheckedChange={(checked: boolean) =>
              handleSwitchChange("automaticDeletion", checked)
            }
          />
          <Label htmlFor="automaticDeletion">
            Enable Automatic Data Deletion
          </Label>
        </div>

        <div className="space-y-2">
          <Label htmlFor="privacyPolicyUrl">Privacy Policy URL</Label>
          <Input
            id="privacyPolicyUrl"
            name="privacyPolicyUrl"
            type="url"
            value={formData.privacyPolicyUrl}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="privacyContactEmail">Privacy Contact Email</Label>
          <Input
            id="privacyContactEmail"
            name="privacyContactEmail"
            type="email"
            value={formData.privacyContactEmail}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="consentFormText">Default Consent Form Text</Label>
          <Textarea
            id="consentFormText"
            name="consentFormText"
            value={formData.consentFormText}
            onChange={handleChange}
            rows={4}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="enableDataEncryption"
            checked={formData.enableDataEncryption}
            onCheckedChange={(checked) =>
              handleSwitchChange("enableDataEncryption", checked)
            }
          />
          <Label htmlFor="enableDataEncryption">Enable Data Encryption</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="enableAuditLogs"
            checked={formData.enableAuditLogs}
            onCheckedChange={(checked) =>
              handleSwitchChange("enableAuditLogs", checked)
            }
          />
          <Label htmlFor="enableAuditLogs">Enable Audit Logs</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="enableAnonymization"
            checked={formData.enableAnonymization}
            onCheckedChange={(checked) =>
              handleSwitchChange("enableAnonymization", checked)
            }
          />
          <Label htmlFor="enableAnonymization">
            Enable Data Anonymization for Reports
          </Label>
        </div>

        <div className="flex justify-end">
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </FormLayout>
  );
}
