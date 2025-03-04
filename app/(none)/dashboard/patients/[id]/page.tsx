"use client";

import { Button } from "@/components/ui/button";

import Link from "next/link";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
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

// Mock data function
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getPatient = (id: string) => {
  return {
    id: "P001",
    name: "Max",
    type: "Dog",
    breed: "Golden Retriever",
    dateOfBirth: new Date(2018, 5, 12),
    age: 5,
    gender: "Male",
    color: "Golden",
    weight: 32.5,
    microchipNumber: "985121054367893",
    status: "Active",
    ownerName: "John Smith",
    ownerPhone: "(555) 123-4567",
    ownerEmail: "john.smith@example.com",
    ownerAddress: "123 Main St, Anytown, CA 12345",
    registrationDate: new Date(2018, 6, 15),
    medicalHistory: [
      {
        date: new Date(2022, 11, 15),
        type: "Vaccination",
        description: "Annual vaccinations - DHPP, Rabies, Bordetella",
        provider: "Dr. Johnson",
      },
      {
        date: new Date(2022, 5, 10),
        type: "Examination",
        description: "Annual wellness exam - all normal",
        provider: "Dr. Wilson",
      },
      {
        date: new Date(2021, 11, 20),
        type: "Vaccination",
        description: "Annual vaccinations - DHPP, Rabies",
        provider: "Dr. Johnson",
      },
    ],
    upcomingAppointments: [
      {
        id: "A001",
        date: new Date(2023, 6, 15, 10, 0),
        reason: "Annual checkup",
        status: "Confirmed",
      },
    ],
  };
};

export default function PatientDetailPage() {
  const params = { id: "testing" };
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [patient, setPatient] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    const data = getPatient(params.id);
    setPatient(data);
    setLoading(false);
  }, [params.id]);

  const handleDelete = () => {
    // In a real app, this would be an API call
    router.push("/dashboard/patients");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!patient) {
    return <div>Patient not found</div>;
  }

  return (
    <DetailView
      title="Patient Details"
      description={`Patient #${patient.id}`}
      backHref="/dashboard/patients"
      editHref={`/dashboard/patients/${patient.id}/edit`}
      onDelete={handleDelete}
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
              <DetailItem label="Type" value={patient.type} />
              <DetailItem label="Breed" value={patient.breed} />
              <DetailItem
                label="Date of Birth"
                value={format(patient.dateOfBirth, "MMMM d, yyyy")}
              />
              <DetailItem label="Age" value={`${patient.age} years`} />
              <DetailItem label="Gender" value={patient.gender} />
              <DetailItem label="Color" value={patient.color} />
              <DetailItem label="Weight" value={`${patient.weight} kg`} />
              <DetailItem
                label="Microchip Number"
                value={patient.microchipNumber}
              />
              <DetailItem
                label="Status"
                value={
                  <Badge
                    className={
                      patient.status === "Active"
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
                value={format(patient.registrationDate, "MMMM d, yyyy")}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium">Owner Information</h3>
            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <DetailItem label="Name" value={patient.ownerName} />
              <DetailItem label="Phone" value={patient.ownerPhone} />
              <DetailItem label="Email" value={patient.ownerEmail} />
              <DetailItem label="Address" value={patient.ownerAddress} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="medical-history">
          <div className="space-y-4">
            {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              patient.medicalHistory.map((record: any, index: number) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{record.type}</CardTitle>
                      <Badge variant="outline">
                        {format(record.date, "MMM d, yyyy")}
                      </Badge>
                    </div>
                    <CardDescription>{record.provider}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{record.description}</p>
                  </CardContent>
                </Card>
              ))
            }
          </div>
        </TabsContent>

        <TabsContent value="appointments">
          <div className="space-y-4">
            {patient.upcomingAppointments.length > 0 ? (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              patient.upcomingAppointments.map((appointment: any) => (
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
                      {format(appointment.date, "MMMM d, yyyy 'at' h:mm a")}
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
