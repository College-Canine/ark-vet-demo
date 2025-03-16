import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const { user } = await validateRequest();
  if (user == null)
    return Response.json({ error: "Not authorized." }, { status: 401 });

  const clinic = await prisma.clinic.findUnique({
    where: {
      id: 1,
    },
  });

  if (clinic == null)
    return Response.json({ error: "Clinic not found?" }, { status: 404 });

  return Response.json({
    name: clinic.name,
    phone: clinic.phone || "",
    email: clinic.email || "",
    website: clinic.website || "",
    address: clinic.address || "",
  });
}

export async function POST(req: Request) {
  const { user } = await validateRequest();
  if (user == null)
    return Response.json({ error: "Not authorized." }, { status: 401 });

  const body = await req.json();
  const clinic = await prisma.clinic.update({
    where: { id: 1 },
    data: {
      name: body.name,
      phone: body.phone,
      email: body.email,
      website: body.website,
      address: body.address,
    },
  });

  return Response.json(clinic);
}
