import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { DetailView } from "@/components/detail-view";
import { DetailItem } from "@/components/detail-item";
import { AppointmentStatus } from "@prisma/client";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function AppointmentDetailPageClient({
  params,
}: {
  params: Promise<{
    id: number;
  }>;
}) {
  const { id } = await params;
  const appointment = await prisma.appointment.findUnique({
    where: {
      id: id - 0,
    },
    include: {
      patient: true,
      owner: true,
    },
  });

  if (appointment == null) return notFound();

  return (
    <DetailView
      title="Appointment Details"
      description={`Appointment #${appointment.id}`}
      backHref="/dashboard/appointments"
      editHref={`/dashboard/appointments/${appointment.id}/edit`}
      //   onDelete={handleDelete}
    >
      <div className="grid gap-6">
        <div>
          <h3 className="text-lg font-medium">Appointment Information</h3>
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DetailItem
              label="Date & Time"
              value={format(appointment.startTime, "MMMM d, yyyy 'at' h:mm a")}
            />
            <DetailItem
              label="Duration"
              value={`${
                (appointment.endTime.getTime() -
                  appointment.startTime.getTime()) /
                (1000 * 60)
              } minutes`}
            />
            <DetailItem
              label="Status"
              value={
                <Badge
                  className={
                    appointment.status === AppointmentStatus.COMPLETED
                      ? "bg-green-100 text-green-800"
                      : appointment.status === AppointmentStatus.SCHEDULED
                      ? "bg-yellow-100 text-yellow-800"
                      : appointment.status === AppointmentStatus.CANCELED
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800"
                  }
                >
                  {appointment.status}
                </Badge>
              }
            />
            <DetailItem label="Reason" value={appointment.reason} />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium">Patient Information</h3>
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DetailItem label="Patient Name" value={appointment.patient.name} />
            <DetailItem
              label="Patient Type"
              value={appointment.patient.breedSlug}
            />
            <DetailItem
              label="Patient ID"
              value={appointment.patientId.toUpperCase()}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium">Owner Information</h3>
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DetailItem
              label="Owner Name"
              value={`${appointment.owner.firstName} ${appointment.owner.lastName}`}
            />
            <DetailItem label="Phone" value={appointment.owner.phone} />
            <DetailItem label="Email" value={appointment.owner.email} />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium">Notes</h3>
          <div className="mt-3">
            <p className="text-sm">{appointment.notes}</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium">Additional Information</h3>
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DetailItem
              label="Created"
              value={format(appointment.createdAt, "MMMM d, yyyy")}
            />
          </div>
        </div>
      </div>
    </DetailView>
  );
}
