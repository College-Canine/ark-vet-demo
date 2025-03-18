"use client";

import type React from "react";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Calendar,
  Users,
  Package,
  FileText,
  DollarSign,
  ChevronRight,
} from "lucide-react";
import {
  AppointmentStatus,
  InventoryItem,
  InvoiceStatus,
  Patient,
  PetBreed,
  Prisma,
} from "@prisma/client";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState("all");

  const [results, setResults] = useState<{
    patients: Patient[];
    appointments: Prisma.AppointmentGetPayload<{
      include: { patient: true; owner: true };
    }>[];
    inventory: InventoryItem[];
    records: Prisma.MedicalRecordGetPayload<{
      include: { patient: true; createdBy: true };
    }>[];
    invoices: Prisma.InvoiceGetPayload<{
      include: { patient: true; items: true };
    }>[];
    breeds: PetBreed[];
  } | null>(null);

  useEffect(() => {
    (async () => {
      const req = await fetch(`/api/search`);
      const json = await req.json();

      setResults(json);
    })();
  }, []);

  const filteredResults = useMemo(() => {
    if (!searchQuery)
      return {
        patients: [],
        appointments: [],
        inventory: [],
        records: [],
        invoices: [],
        breeds: [],
      };

    const lowerQuery = searchQuery.toLowerCase();

    return {
      patients:
        results?.patients.filter(
          (patient) =>
            patient.name.toLowerCase().includes(lowerQuery) ||
            patient.breedSlug.toLowerCase().includes(lowerQuery) ||
            patient.ownerId.toLowerCase().includes(lowerQuery)
        ) || [],
      appointments:
        results?.appointments.filter(
          (appointment) =>
            appointment.patient.name.toLowerCase().includes(lowerQuery) ||
            `${appointment.owner.firstName} ${appointment.owner.lastName}`
              .toLowerCase()
              .includes(lowerQuery) ||
            appointment.reason?.toLowerCase().includes(lowerQuery)
        ) || [],
      inventory:
        results?.inventory.filter(
          (item) =>
            item.name.toLowerCase().includes(lowerQuery) ||
            item.category.toLowerCase().includes(lowerQuery)
        ) || [],
      records:
        results?.records.filter(
          (record) =>
            // record.patientName.toLowerCase().includes(lowerQuery) ||
            record.type.toLowerCase().includes(lowerQuery)
          // ||
          // record.provider.toLowerCase().includes(lowerQuery)
        ) || [],
      invoices:
        results?.invoices.filter(
          (invoice) =>
            invoice.patient.name.toLowerCase().includes(lowerQuery) ||
            invoice.items.reduce(
              (a, b) => a || b.description.toLowerCase().includes(lowerQuery),
              false
            )
        ) || [],
      breeds:
        results?.breeds.filter(
          (breed: PetBreed) =>
            breed.name.toLowerCase().includes(lowerQuery) ||
            breed.parentSlug?.toLowerCase().includes(lowerQuery)
        ) || [],
    };
  }, [searchQuery, results]);
  const totalResults = Object.values(filteredResults).reduce(
    (sum, arr) => sum + arr.length,
    0
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you might want to update the URL here
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Search</h1>
        <p className="text-muted-foreground">
          Search across patients, appointments, inventory, and more.
        </p>
      </div>

      <form onSubmit={handleSearch} className="flex w-full max-w-3xl gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for patients, appointments, inventory..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
        </div>
        <Button type="submit">Search</Button>
      </form>

      {searchQuery && (
        <p className="text-sm text-muted-foreground">
          Found {totalResults} results for &quot;{searchQuery}&quot;
        </p>
      )}

      {searchQuery && (
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Results</TabsTrigger>
            <TabsTrigger value="patients">
              Patients ({filteredResults?.patients.length || 0})
            </TabsTrigger>
            <TabsTrigger value="appointments">
              Appointments ({filteredResults?.appointments.length || 0})
            </TabsTrigger>
            <TabsTrigger value="inventory">
              Inventory ({filteredResults?.inventory.length || 0})
            </TabsTrigger>
            <TabsTrigger value="records">
              Medical Records ({filteredResults?.records.length || 0})
            </TabsTrigger>
            <TabsTrigger value="invoices">
              Invoices ({filteredResults?.invoices.length || 0})
            </TabsTrigger>
            <TabsTrigger value="breeds">
              Breeds ({filteredResults?.breeds.length || 0})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-8">
            {/* Patients Section */}
            {(filteredResults?.patients.length || 0) > 0 && (
              <SearchSection
                title="Patients"
                icon={<Users className="h-5 w-5" />}
                viewAllLink="/dashboard/patients"
                viewAllText="View all patients"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  {filteredResults?.patients.slice(0, 4).map((patient) => (
                    <PatientCard key={patient.id} patient={patient} />
                  ))}
                </div>
              </SearchSection>
            )}

            {/* Appointments Section */}
            {(filteredResults?.appointments.length || 0) > 0 && (
              <SearchSection
                title="Appointments"
                icon={<Calendar className="h-5 w-5" />}
                viewAllLink="/dashboard/appointments"
                viewAllText="View all appointments"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  {filteredResults?.appointments
                    .slice(0, 4)
                    .map((appointment) => (
                      <AppointmentCard
                        key={appointment.id}
                        appointment={appointment}
                      />
                    ))}
                </div>
              </SearchSection>
            )}

            {/* Inventory Section */}
            {(filteredResults?.inventory.length || 0) > 0 && (
              <SearchSection
                title="Inventory"
                icon={<Package className="h-5 w-5" />}
                viewAllLink="/dashboard/inventory"
                viewAllText="View all inventory"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  {filteredResults?.inventory.slice(0, 4).map((item) => (
                    <InventoryCard key={item.id} item={item} />
                  ))}
                </div>
              </SearchSection>
            )}

            {/* Medical Records Section */}
            {(filteredResults?.records.length || 0) > 0 && (
              <SearchSection
                title="Medical Records"
                icon={<FileText className="h-5 w-5" />}
                viewAllLink="/dashboard/records"
                viewAllText="View all records"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  {filteredResults?.records.slice(0, 4).map((record) => (
                    <RecordCard key={record.id} record={record} />
                  ))}
                </div>
              </SearchSection>
            )}

            {/* Invoices Section */}
            {(filteredResults?.invoices.length || 0) > 0 && (
              <SearchSection
                title="Invoices"
                icon={<DollarSign className="h-5 w-5" />}
                viewAllLink="/dashboard/billing"
                viewAllText="View all invoices"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  {filteredResults?.invoices.slice(0, 4).map((invoice) => (
                    <InvoiceCard key={invoice.id} invoice={invoice} />
                  ))}
                </div>
              </SearchSection>
            )}

            {/* Breeds Section */}
            {(filteredResults?.breeds.length || 0) > 0 && (
              <SearchSection
                title="Breeds"
                icon={<Users className="h-5 w-5" />}
                viewAllText="View all breeds"
              >
                <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                  {filteredResults?.breeds.slice(0, 8).map((breed) => (
                    <BreedCard key={breed.slug} breed={breed} />
                  ))}
                </div>
              </SearchSection>
            )}

            {totalResults === 0 && (
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-lg font-medium">No results found</p>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search or filter to find what you&apos;re
                  looking for.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="patients">
            {(filteredResults?.patients.length || 0) > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredResults?.patients.map((patient) => (
                  <PatientCard key={patient.id} patient={patient} />
                ))}
              </div>
            ) : (
              <EmptyState type="patients" />
            )}
          </TabsContent>

          <TabsContent value="appointments">
            {(filteredResults?.appointments.length || 0) > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredResults?.appointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                  />
                ))}
              </div>
            ) : (
              <EmptyState type="appointments" />
            )}
          </TabsContent>

          <TabsContent value="inventory">
            {(filteredResults?.inventory.length || 0) > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredResults?.inventory.map((item) => (
                  <InventoryCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <EmptyState type="inventory" />
            )}
          </TabsContent>

          <TabsContent value="records">
            {(filteredResults?.records.length || 0) > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredResults?.records.map((record) => (
                  <RecordCard key={record.id} record={record} />
                ))}
              </div>
            ) : (
              <EmptyState type="records" />
            )}
          </TabsContent>

          <TabsContent value="invoices">
            {(filteredResults?.invoices.length || 0) > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredResults?.invoices.map((invoice) => (
                  <InvoiceCard key={invoice.id} invoice={invoice} />
                ))}
              </div>
            ) : (
              <EmptyState type="invoices" />
            )}
          </TabsContent>

          <TabsContent value="breeds">
            {(filteredResults?.breeds.length || 0) > 0 ? (
              <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                {filteredResults?.breeds.map((breed) => (
                  <BreedCard key={breed.slug} breed={breed} />
                ))}
              </div>
            ) : (
              <EmptyState type="breeds" />
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

// Section component for organizing search results
function SearchSection({
  title,
  icon,
  children,
  viewAllLink,
  viewAllText,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  viewAllLink?: string;
  viewAllText: string;
}) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        {viewAllLink && (
          <Link
            href={viewAllLink}
            className="flex items-center text-sm text-primary hover:underline"
          >
            {viewAllText}
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

// Empty state component
function EmptyState({ type }: { type: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <p className="text-lg font-medium">No {type} found</p>
      <p className="text-sm text-muted-foreground">
        Try adjusting your search or filter to find what you&apos;re looking
        for.
      </p>
    </div>
  );
}

// Card components for different result types
function PatientCard({ patient }: { patient: Patient }) {
  return (
    <Link href={`/dashboard/patients/${patient.id}`}>
      <Card className="h-full transition-colors hover:bg-muted/50">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={`/placeholder.svg?height=40&width=40&text=${patient.name.charAt(
                  0
                )}`}
              />
              <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{patient.name}</h3>
              <p className="text-sm text-muted-foreground">
                {patient.breedSlug}
              </p>
              <p className="text-xs text-muted-foreground">
                {/* Owner: {patient.ownerName} */}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function AppointmentCard({
  appointment,
}: {
  appointment: Prisma.AppointmentGetPayload<{
    include: { patient: true; owner: true };
  }>;
}) {
  return (
    <Link href={`/dashboard/appointments/${appointment.id}`}>
      <Card className="h-full transition-colors hover:bg-muted/50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">{appointment.patient.name}</h3>
            <Badge
              className={
                appointment.status === AppointmentStatus.COMPLETED
                  ? "bg-green-100 text-green-800"
                  : appointment.status === AppointmentStatus.SCHEDULED
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }
            >
              {appointment.status}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {format(appointment.startTime, "MMM d, yyyy h:mm a")}
          </p>
          <p className="text-sm">{appointment.reason}</p>
          <p className="text-xs text-muted-foreground">
            Owner: {appointment.owner.firstName} {appointment.owner.lastName}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

function InventoryCard({ item }: { item: InventoryItem }) {
  return (
    <Link href={`/dashboard/inventory/${item.id}`}>
      <Card className="h-full transition-colors hover:bg-muted/50">
        <CardContent className="p-4">
          <h3 className="font-medium">{item.name}</h3>
          <p className="text-sm text-muted-foreground">{item.category}</p>
          <p className="text-sm">
            Quantity: {item.quantity} {item.unit}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

function RecordCard({
  record,
}: {
  record: Prisma.MedicalRecordGetPayload<{
    include: { patient: true; createdBy: true };
  }>;
}) {
  return (
    <Link href={`/dashboard/records/${record.id}`}>
      <Card className="h-full transition-colors hover:bg-muted/50">
        <CardContent className="p-4">
          <h3 className="font-medium">{record.patient.name}</h3>
          <p className="text-sm text-muted-foreground">
            {format(record.createdAt, "MMM d, yyyy")}
          </p>
          <p className="text-sm">{record.type}</p>
          <p className="text-xs text-muted-foreground">
            Created by: {record.createdBy.firstname} {record.createdBy.lastname}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

function InvoiceCard({
  invoice,
}: {
  invoice: Prisma.InvoiceGetPayload<{
    include: { patient: true; items: true };
  }>;
}) {
  return (
    <Link href={`/dashboard/billing/${invoice.id}`}>
      <Card className="h-full transition-colors hover:bg-muted/50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">{invoice.patient.name}</h3>
            <Badge
              className={
                invoice.status === InvoiceStatus.PAID
                  ? "bg-green-100 text-green-800"
                  : invoice.status === InvoiceStatus.PENDING
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }
            >
              {invoice.status}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {format(invoice.createdAt, "MMM d, yyyy")}
          </p>
          <p className="text-sm">
            $
            {(
              invoice.items.reduce(
                (a, b) => a + (b.quantity + b.unitPrice),
                0
              ) / 100
            ).toFixed(2)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

function BreedCard({ breed }: { breed: PetBreed }) {
  return (
    <Card className="h-full transition-colors hover:bg-muted/50">
      <CardContent className="p-4">
        <h3 className="font-medium">{breed.name}</h3>
        <p className="text-sm text-muted-foreground">{breed.parentSlug}</p>
        {/* <p className="text-xs text-muted-foreground">{breed.count} patients</p> */}
      </CardContent>
    </Card>
  );
}
