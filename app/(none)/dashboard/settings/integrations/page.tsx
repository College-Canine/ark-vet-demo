"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { FormLayout } from "@/components/form-layout";

const integrations = [
  {
    id: "lab_integration",
    name: "Laboratory Integration",
    description: "Connect with external laboratory services for test results",
    configFields: ["API Key", "Lab Endpoint URL"],
  },
  {
    id: "pharmacy_integration",
    name: "Pharmacy Integration",
    description: "Integrate with local pharmacies for prescription fulfillment",
    configFields: ["Pharmacy ID", "API Key"],
  },
  {
    id: "imaging_integration",
    name: "Imaging Integration",
    description: "Connect with imaging services for X-rays and other scans",
    configFields: ["Service Provider", "Account ID", "API Key"],
  },
];

export default function IntegrationsSettingsPage() {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [formData, setFormData] = useState<Record<string, any>>(
    integrations.reduce(
      (acc, integration) => ({
        ...acc,
        [integration.id]: {
          enabled: false,
          config: integration.configFields.reduce(
            (fieldAcc, field) => ({
              ...fieldAcc,
              [field.toLowerCase().replace(/ /g, "_")]: "",
            }),
            {}
          ),
        },
      }),
      {}
    )
  );

  const handleSwitchChange = (integrationId: string, checked: boolean) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFormData((prev: Record<string, any>) => ({
      ...prev,
      [integrationId]: {
        ...prev[integrationId],
        enabled: checked,
      },
    }));
  };

  const handleConfigChange = (
    integrationId: string,
    field: string,
    value: string
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFormData((prev: Record<string, any>) => ({
      ...prev,
      [integrationId]: {
        ...prev[integrationId],
        config: {
          ...prev[integrationId].config,
          [field]: value,
        },
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save the settings
    console.log("Saving integration settings:", formData);
    router.push("/dashboard/settings");
  };

  return (
    <FormLayout
      title="Integrations Settings"
      description="Connect with third-party services and apps"
      backHref="/dashboard/settings"
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        {integrations.map((integration) => (
          <div key={integration.id} className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">{integration.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {integration.description}
                </p>
              </div>
              <Switch
                id={`enable_${integration.id}`}
                checked={formData[integration.id].enabled}
                onCheckedChange={(checked) =>
                  handleSwitchChange(integration.id, checked)
                }
              />
            </div>

            {formData[integration.id].enabled && (
              <div className="space-y-4 rounded-md border p-4">
                {integration.configFields.map((field) => (
                  <div key={field} className="space-y-2">
                    <Label
                      htmlFor={`${integration.id}_${field
                        .toLowerCase()
                        .replace(/ /g, "_")}`}
                    >
                      {field}
                    </Label>
                    <Input
                      id={`${integration.id}_${field
                        .toLowerCase()
                        .replace(/ /g, "_")}`}
                      value={
                        formData[integration.id].config[
                          field.toLowerCase().replace(/ /g, "_")
                        ]
                      }
                      onChange={(e) =>
                        handleConfigChange(
                          integration.id,
                          field.toLowerCase().replace(/ /g, "_"),
                          e.target.value
                        )
                      }
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="flex justify-end">
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </FormLayout>
  );
}
