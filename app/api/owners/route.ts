import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const { user } = await validateRequest();
  if (!user)
    return Response.json({ error: "Not authenticated." }, { status: 400 });

  const owners = await prisma.owner.findMany({
    where: {
      clinicId: user.clinicId,
    },
  });

  return Response.json(owners);
}

export async function POST(req: Request) {
  const { user } = await validateRequest();
  if (!user)
    return Response.json({ error: "Not authenticated." }, { status: 400 });

  const data = await req.json();

  const owner = await prisma.owner.create({
    data: {
      clinicId: user.clinicId,
      email: data.email,
      firstName: data.firstname,
      lastName: data.lastname,
      phone: data.phone,
    },
  });

  return Response.json(owner);
}
