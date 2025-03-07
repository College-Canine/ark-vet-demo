import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const { user } = await validateRequest();
  if (!user)
    return Response.json({ error: "Not authenticated." }, { status: 400 });

  const inventoryItems = await prisma.inventoryItem.findMany({
    where: {
      clinicId: user.clinicId,
    },
    include: {},
  });

  return Response.json(inventoryItems);
}

export async function POST(req: Request) {
  const { user } = await validateRequest();
  if (!user)
    return Response.json({ error: "Not authenticated." }, { status: 400 });

  const data = await req.json();

  const inventoryItem = await prisma.inventoryItem.create({
    data: {
      clinicId: user.clinicId,
      supplierSlug: data.supplierId,
      name: data.name,
      description: data.description,
      quantity: parseInt(data.quantity),
      reorderLevel: parseInt(data.reorderPoint),
      category: data.category,
      unit: data.unit,
    },
  });

  return Response.json(inventoryItem);
}
