import { Button } from "@/components/ui/button";

import Link from "next/link";

import { format, formatDistance } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { DetailView } from "@/components/detail-view";
import { DetailItem } from "@/components/detail-item";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { PatientStatus } from "@prisma/client";

export default async function PatientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const patient = await prisma.patient.findUnique({
    where: {
      id,
    },
    include: {
      breed: true,
      owner: true,
      appointments: true,
      records: true,
    },
  });

  if (patient == null) return notFound();

  // const handleDelete = () => {
  //   // In a real app, this would be an API call
  //   // router.push("/dashboard/patients");
  // };

  return (
    <DetailView
      title="Patient Details"
      description={`Patient #${patient.id}`}
      backHref="/dashboard/patients"
      editHref={`/dashboard/patients/${patient.id}/edit`}
      // onDelete={handleDelete}
    >
      <Tabs defaultValue="details">
        <TabsList className="mb-4">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="medical-history">Medical History</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Patient Information</h3>
            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <DetailItem label="Name" value={patient.name} />
              <DetailItem label="ID" value={patient.id} />
              <DetailItem label="Breed" value={patient.breed.name} />
              <DetailItem
                label="Date of Birth"
                value={
                  patient.dateOfBirth == null
                    ? "unknown date of birth"
                    : format(patient.dateOfBirth, "MMMM d, yyyy")
                }
              />
              <DetailItem
                label="Age"
                value={
                  patient.dateOfBirth == null
                    ? "unknown age"
                    : formatDistance(patient.dateOfBirth, new Date())
                }
              />
              <DetailItem label="Gender" value={patient.gender} />
              {/* <DetailItem label="Weight" value={`${patient.weight} kg`} /> */}
              {/* <DetailItem
                label="Microchip Number"
                value={patient.microchipNumber}
              /> */}
              <DetailItem
                label="Status"
                value={
                  <Badge
                    className={
                      patient.status === PatientStatus.ACTIVE
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }
                  >
                    {patient.status}
                  </Badge>
                }
              />
              <DetailItem
                label="Registration Date"
                value={format(patient.createdAt, "MMMM d, yyyy")}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium">Owner Information</h3>
            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <DetailItem
                label="Name"
                value={`${patient.owner.firstName} ${patient.owner.lastName}`}
              />
              <DetailItem label="Phone" value={patient.owner.phone} />
              <DetailItem label="Email" value={patient.owner.email} />
              <DetailItem label="Address" value={patient.owner.address} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="medical-history">
          <div className="space-y-4">
            {patient.records.map((record, index: number) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{record.notes}</CardTitle>
                    <Badge variant="outline">
                      {format(record.createdAt, "MMM d, yyyy")}
                    </Badge>
                  </div>
                  <CardDescription>{record.treatment}</CardDescription>
                </CardHeader>
                {/* <CardContent>
                  <p className="text-sm">{record.description}</p>
                </CardContent> */}
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="appointments">
          <div className="space-y-4">
            {patient.appointments.length > 0 ? (
              patient.appointments.map((appointment) => (
                <Card key={appointment.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">
                        {appointment.reason}
                      </CardTitle>
                      <Badge className="bg-green-100 text-green-800">
                        {appointment.status}
                      </Badge>
                    </div>
                    <CardDescription>
                      {format(
                        appointment.startTime,
                        "MMMM d, yyyy 'at' h:mm a"
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-end">
                    <Link href={`/dashboard/appointments/${appointment.id}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-muted-foreground">No upcoming appointments.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </DetailView>
  );
}
