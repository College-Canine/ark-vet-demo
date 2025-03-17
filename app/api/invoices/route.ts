import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { InvoiceStatus } from "@prisma/client";

export async function GET() {
  const { user } = await validateRequest();
  if (!user)
    return Response.json({ error: "Not authenticated." }, { status: 400 });

  const invoices = await prisma.invoice.findMany({
    where: {
      clinicId: user.clinicId,
    },
    include: {
      patient: true,
      owner: true,
      items: true,
    },
  });

  return Response.json(invoices);
}

export async function POST(req: Request) {
  const { user } = await validateRequest();
  if (!user)
    return Response.json({ error: "Not authenticated." }, { status: 400 });

  try {
    const data = await req.json();

    const patient = await prisma.patient.findUnique({
      where: {
        id: data.patientId,
      },
    });

    if (patient == null)
      return Response.json({ error: "Patient not found." }, { status: 404 });

    const invoice = await prisma.invoice.create({
      data: {
        clinicId: user.clinicId,
        patientId: data.patientId,
        ownerId: patient.ownerId,
        notes: data.notes,
        userId: user.id,
        items: {
          create: data.items.map(
            (item: {
              description: string;
              unitPrice: string;
              quantity: string;
            }) => ({
              description: item.description,
              unitPrice: parseInt(item.unitPrice),
              quantity: parseFloat(item.quantity) * 100,
            })
          ),
        },
        status: InvoiceStatus.PENDING,
        // createdById: user.id,
        // type: data.type,
        // status: data.status,
        // invoiceAt: new Date(data.date),
        // notes: data.notes,
      },
    });

    return Response.json(invoice);
  } catch (error) {
    console.log(error?.toString());
    return Response.json(
      { error: "Internal server error, please try later." },
      { status: 500 }
    );
  }
}
