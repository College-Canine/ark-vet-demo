import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const { user } = await validateRequest();
  if (!user)
    return Response.json({ error: "Not authenticated." }, { status: 400 });

  const records = await prisma.medicalRecord.findMany({
    where: {
      clinicId: user.clinicId,
    },
    include: {
      patient: true,
    },
  });

  return Response.json(records);
}

export async function POST(req: Request) {
  const { user } = await validateRequest();
  if (!user)
    return Response.json({ error: "Not authenticated." }, { status: 400 });

  try {
    const data = await req.json();

    const record = await prisma.medicalRecord.create({
      data: {
        clinicId: user.clinicId,
        patientId: data.patientId,
        createdById: user.id,
        type: data.type,
        status: data.status,
        recordAt: new Date(data.date),
        notes: data.notes,
      },
    });

    return Response.json(record);
  } catch (error) {
    console.log(error?.toString());
    return Response.json(
      { error: "Internal server error, please try later." },
      { status: 500 }
    );
  }
}
