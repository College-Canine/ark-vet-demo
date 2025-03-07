import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const { user } = await validateRequest();
  if (!user)
    return Response.json({ error: "Not authenticated." }, { status: 400 });

  const records = await prisma.petBreed.findMany({
    where: {},
    include: {},
  });

  return Response.json(records);
}
