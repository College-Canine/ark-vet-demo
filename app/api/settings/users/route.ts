import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const { user } = await validateRequest();
  if (user == null)
    return Response.json({ error: "Not authorized." }, { status: 401 });

  const clinic = await prisma.clinic.findUnique({
    where: {
      id: user.clinicId,
    },
    include: {
      users: true,
    },
  });

  if (clinic == null)
    return Response.json({ error: "Clinic not found?" }, { status: 404 });

  return Response.json(clinic);
}

// export async function POST(req: Request) {
//   const { user } = await validateRequest();
//   if (user == null)
//     return Response.json({ error: "Not authorized." }, { status: 401 });

//   const body = await req.json();
//   const clinic = await prisma.clinic.update({
//     where: { id: user.clinicId },
//     data: {
//       name: body.name,
//       phone: body.phone,
//       email: body.email,
//       website: body.website,
//       address: body.address,
//     },
//   });

//   return Response.json(clinic);
// }
