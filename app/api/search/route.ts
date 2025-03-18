import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const { user } = await validateRequest();
  if (!user)
    return Response.json({ error: "Not authenticated." }, { status: 400 });

  const [patients, appointments, inventory, records, invoices, breeds] =
    await Promise.all([
      prisma.patient.findMany({
        where: {
          clinicId: user.clinicId,
        },
      }),
      prisma.appointment.findMany({
        where: {
          clinicId: user.clinicId,
        },
        include: {
          owner: true,
          patient: true,
        },
      }),
      prisma.inventoryItem.findMany({
        where: {
          clinicId: user.clinicId,
        },
      }),
      prisma.medicalRecord.findMany({
        where: {
          clinicId: user.clinicId,
        },
        include: {
          patient: true,
          createdBy: true,
        },
      }),
      prisma.invoice.findMany({
        where: {
          clinicId: user.clinicId,
        },
        include: {
          patient: true,
          createdBy: true,
          items: true,
        },
      }),
      prisma.petBreed.findMany({
        where: {},
      }),
    ]);

  return Response.json({
    patients,
    appointments,
    inventory,
    records,
    invoices,
    breeds,
  });
}
