import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { DetailView } from "@/components/detail-view";
import { DetailItem } from "@/components/detail-item";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function MedicalRecordDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // const handleDelete = () => {
  //   // In a real app, this would be an API call
  //   router.push("/dashboard/records");
  // };

  const { id } = await params;
  const record = await prisma.medicalRecord.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      patient: {
        include: {
          owner: true,
          breed: true,
        },
      },
      createdBy: true,
    },
  });

  if (record == null) return notFound();

  return (
    <DetailView
      title="Medical Record"
      description={`Record #${record.id}`}
      backHref="/dashboard/records"
      editHref={`/dashboard/records/${record.id}/edit`}
      // onDelete={handleDelete}
    >
      <div className="grid gap-6">
        <div>
          <h3 className="text-lg font-medium">Record Information</h3>
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DetailItem label="Record ID" value={record.id} />
            <DetailItem
              label="Date"
              value={format(record.recordAt, "MMMM d, yyyy")}
            />
            <DetailItem label="Type" value={record.type} />
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
            <DetailItem label="Patient Name" value={record.patient.name} />
            <DetailItem label="Patient ID" value={record.patient.id} />
            <DetailItem
              label="Patient Breed"
              value={record.patient.breed.name}
            />
            <DetailItem
              label="Owner"
              value={`${record.patient.owner.firstName} ${record.patient.owner.lastName}`}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium">Notes</h3>
          <div className="mt-3">
            <p className="text-sm">{record.notes}</p>
          </div>
        </div>
        {/* 
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
        </div> */}

        <div>
          <h3 className="text-lg font-medium">Additional Information</h3>
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DetailItem
              label="Created By"
              value={
                <>
                  <span>
                    {record.createdBy.firstName} {record.createdBy.lastName}
                  </span>
                </>
              }
            />
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
