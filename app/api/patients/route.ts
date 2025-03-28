import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const { user } = await validateRequest();
  if (!user)
    return Response.json({ error: "Not authenticated." }, { status: 400 });

  const patients = await prisma.patient.findMany({
    where: {
      clinicId: user.clinicId,
    },
    include: {
      owner: true,
    },
  });

  return Response.json(patients);
}

export async function POST(req: Request) {
  const { user } = await validateRequest();
  if (!user)
    return Response.json({ error: "Not authenticated." }, { status: 400 });

  try {
    const data = await req.json();

    console.log(data);

    const patient = await prisma.patient.create({
      data: {
        name: data.name,
        clinic: {
          connect: {
            id: user.clinicId,
          },
        },
        breed: {
          connect: {
            slug: data.breed,
          },
        },
        // ownerId: data.ownerId,
        gender: data.gender,
        owner: {
          connect: {
            id: data.ownerId,
          },
        },
        dateOfBirth: isNaN(Date.parse(data.dateOfBirth))
          ? undefined
          : new Date(data.dateOfBirth),
      },
    });

    return Response.json(patient);
  } catch (error) {
    console.log(error?.toString());
    return Response.json(
      { error: "Internal Server Error, please try again later." },
      { status: 500 }
    );
  }
}
