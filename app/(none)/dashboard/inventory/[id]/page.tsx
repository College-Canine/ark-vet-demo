import { Badge } from "@/components/ui/badge";
import { DetailView } from "@/components/detail-view";
import { DetailItem } from "@/components/detail-item";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Barcode from "@/components/barcode";
import BarcodeClient from "@/components/barcode";
import { DataTable } from "@/components/data-table";
import { instantiateTranslation } from "@/lib/translation";
import InventoryPageClient from "./client";

export default async function InventoryItemDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const item = await prisma.inventoryItem.findUnique({
    where: {
      id: id,
    },
    include: {
      supplier: true,
    },
  });

  if (item == null) return notFound();

  return (
    <>
      <DetailView
        title="Inventory Item Details"
        description={`Item #${item.id}`}
        backHref="/dashboard/inventory"
        editHref={`/dashboard/inventory/${item.id}/edit`}
        rightSide={
          <BarcodeClient
            className="h-4"
            value={`itm-${item.clinicId}-${item.id}-acme`}
          />
        }
        // onDelete={handleDelete}
      >
        <div className="grid gap-6">
          <div>
            <h3 className="text-lg font-medium">Item Information</h3>
            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <DetailItem label="Item ID" value={item.id} />
              <DetailItem label="Name" value={item.name} />
              <DetailItem label="Category" value={item.category} />
              <DetailItem
                label="Quantity"
                value={`${item.quantity} ${item.unit}`}
              />
              <DetailItem
                label="Reorder Point"
                value={item.reorderLevel || ""}
              />
              <DetailItem
                label="Status"
                value={
                  <Badge
                    className={
                      item.quantity <= 0
                        ? "bg-red-100 text-red-800"
                        : item.quantity <= (item.reorderLevel || 25)
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }
                  >
                    {item.quantity <= 0
                      ? "Out of Stock"
                      : item.quantity <= (item.reorderLevel || 25)
                      ? "Low Stock"
                      : "In Stock"}
                  </Badge>
                }
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium">Description</h3>
            <div className="mt-3">
              <p className="text-sm">{item.description}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium">Supplier Information</h3>
            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <DetailItem
                label="Supplier"
                value={
                  <div className="flex flex-col gap-2">
                    <img
                      className="w-min h-16"
                      src={`https://logo.clearbit.com/${item.supplier.website}`}
                      alt="Supplier Logo"
                    />
                    <span className="font-bold">{item.supplier.name}</span>
                  </div>
                }
              />
              <DetailItem
                label="Supplier Description"
                value={item.supplier.description}
              />
              <DetailItem
                label="Supplier Website"
                value={item.supplier.website}
              />
              <DetailItem label="Supplier Email" value={item.supplier.email} />
              <DetailItem label="Supplier Phone" value={item.supplier.phone} />
            </div>
          </div>
        </div>
      </DetailView>
      <div className="mx-auto max-w-3xl mt-12">
        <InventoryPageClient item={item} />
      </div>
    </>
  );
}
