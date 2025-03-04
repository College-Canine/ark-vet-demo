"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { DetailView } from "@/components/detail-view";
import { DetailItem } from "@/components/detail-item";

// Mock data function
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getMedicalRecord = (id: string) => {
  return {
    id: "MR001",
    date: new Date(2023, 5, 15),
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
    medications: [
      {
        name: "DHPP Vaccine",
        dosage: "1 ml",
        route: "Subcutaneous",
      },
      {
        name: "Rabies Vaccine",
        dosage: "1 ml",
        route: "Subcutaneous",
      },
      {
        name: "Bordetella Vaccine",
        dosage: "1 ml",
        route: "Intranasal",
      },
    ],
    followUp: "Next vaccination due in 1 year. Schedule reminder for owner.",
    createdBy: "Dr. Johnson",
    createdAt: new Date(2023, 5, 15, 10, 30),
    updatedAt: new Date(2023, 5, 15, 10, 45),
  };
};

export default function MedicalRecordDetailPage() {
  const params = { id: "testing" };
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [record, setRecord] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    const data = getMedicalRecord(params.id);
    setRecord(data);
    setLoading(false);
  }, [params.id]);

  const handleDelete = () => {
    // In a real app, this would be an API call
    router.push("/dashboard/records");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!record) {
    return <div>Medical record not found</div>;
  }

  return (
    <DetailView
      title="Medical Record"
      description={`Record #${record.id}`}
      backHref="/dashboard/records"
      editHref={`/dashboard/records/${record.id}/edit`}
      onDelete={handleDelete}
    >
      <div className="grid gap-6">
        <div>
          <h3 className="text-lg font-medium">Record Information</h3>
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DetailItem label="Record ID" value={record.id} />
            <DetailItem
              label="Date"
              value={format(record.date, "MMMM d, yyyy")}
            />
            <DetailItem label="Type" value={record.type} />
            <DetailItem label="Provider" value={record.provider} />
            <DetailItem
              label="Status"
              value={
                <Badge className="bg-green-100 text-green-800">
                  {record.status}
                </Badge>
              }
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium">Patient Information</h3>
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DetailItem label="Patient Name" value={record.patientName} />
            <DetailItem label="Patient ID" value={record.patientId} />
            <DetailItem label="Patient Type" value={record.patientType} />
            <DetailItem label="Owner" value={record.ownerName} />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium">Description</h3>
          <div className="mt-3">
            <p className="text-sm">{record.description}</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium">Notes</h3>
          <div className="mt-3">
            <p className="text-sm">{record.notes}</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium">Medications</h3>
          <div className="mt-3">
            <ul className="space-y-2">
              {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                record.medications.map((medication: any, index: number) => (
                  <li key={index} className="text-sm">
                    <span className="font-medium">{medication.name}</span> -{" "}
                    {medication.dosage} ({medication.route})
                  </li>
                ))
              }
            </ul>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium">Follow-up</h3>
          <div className="mt-3">
            <p className="text-sm">{record.followUp}</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium">Additional Information</h3>
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DetailItem label="Created By" value={record.createdBy} />
            <DetailItem
              label="Created At"
              value={format(record.createdAt, "MMMM d, yyyy 'at' h:mm a")}
            />
            <DetailItem
              label="Last Updated"
              value={format(record.updatedAt, "MMMM d, yyyy 'at' h:mm a")}
            />
          </div>
        </div>
      </div>
    </DetailView>
  );
}
