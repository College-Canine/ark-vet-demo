"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { DetailView } from "@/components/detail-view";
import { DetailItem } from "@/components/detail-item";

// Mock data function
const getAppointment = (id: string) => {
  const appointments = [
    {
      id: "1",
      date: new Date(2023, 5, 15, 9, 0),
      patientName: "Max",
      patientType: "Golden Retriever",
      patientId: "P001",
      ownerName: "John Smith",
      ownerPhone: "(555) 123-4567",
      ownerEmail: "john.smith@example.com",
      reason: "Annual checkup",
      notes:
        "Patient due for vaccinations. Owner mentioned slight limping in right front leg.",
      status: "Confirmed",
      duration: 30,
      createdAt: new Date(2023, 4, 10),
    },
  ];
  return appointments.find((a) => a.id === id);
};

export default function AppointmentDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [appointment, setAppointment] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    const data = getAppointment(params.id);
    setAppointment(data);
    setLoading(false);
  }, [params.id]);

  const handleDelete = () => {
    // In a real app, this would be an API call
    router.push("/dashboard/appointments");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!appointment) {
    return <div>Appointment not found</div>;
  }

  return (
    <DetailView
      title="Appointment Details"
      description={`Appointment #${appointment.id}`}
      backHref="/dashboard/appointments"
      editHref={`/dashboard/appointments/${appointment.id}/edit`}
      onDelete={handleDelete}
    >
      <div className="grid gap-6">
        <div>
          <h3 className="text-lg font-medium">Appointment Information</h3>
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DetailItem
              label="Date & Time"
              value={format(appointment.date, "MMMM d, yyyy 'at' h:mm a")}
            />
            <DetailItem
              label="Duration"
              value={`${appointment.duration} minutes`}
            />
            <DetailItem
              label="Status"
              value={
                <Badge
                  className={
                    appointment.status === "Confirmed"
                      ? "bg-green-100 text-green-800"
                      : appointment.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : appointment.status === "Cancelled"
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
            <DetailItem label="Patient Name" value={appointment.patientName} />
            <DetailItem label="Patient Type" value={appointment.patientType} />
            <DetailItem label="Patient ID" value={appointment.patientId} />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium">Owner Information</h3>
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DetailItem label="Owner Name" value={appointment.ownerName} />
            <DetailItem label="Phone" value={appointment.ownerPhone} />
            <DetailItem label="Email" value={appointment.ownerEmail} />
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
