import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const { user } = await validateRequest();
  if (!user)
    return Response.json({ error: "Not authenticated." }, { status: 400 });

  const appointments = await prisma.appointment.findMany({
    where: {
      assignedUserId: user.id,
    },
    include: {
      patient: true,
      owner: true,
    },
  });

  return Response.json(appointments);
}

export async function POST(req: Request) {
  const { user } = await validateRequest();
  if (!user)
    return Response.json({ error: "Not authenticated." }, { status: 400 });

  const data = await req.json();

  const appointmentDate = new Date(data.dateTime);
  if (appointmentDate < new Date()) {
    return Response.json(
      { error: "Appointment date cannot be in the past" },
      { status: 400 }
    );
  }

  console.log(data.patientId);

  const patient = await prisma.patient.findUnique({
    where: {
      id: data.patientId,
    },
  });

  if (patient == null)
    return Response.json({ error: "Patient not found." }, { status: 400 });

  const appointment = await prisma.appointment.create({
    data: {
      clinicId: user.clinicId,
      startTime: new Date(data.date),
      endTime: new Date(
        new Date(data.date).getTime() + parseInt(data.duration) * 60 * 1000
      ),
      notes: data.notes,
      patientId: data.patientId,
      ownerId: patient.ownerId,
      reason: data.reason,
      status: "SCHEDULED",
      assignedUserId: user.id,
    },
    include: {
      patient: true,
    },
  });

  return Response.json(appointment);
}
