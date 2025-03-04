"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { DetailView } from "@/components/detail-view";
import { DetailItem } from "@/components/detail-item";

// Mock data function
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getInventoryItem = (id: string) => {
  return {
    id: "INV001",
    name: "Vaccine A",
    category: "Vaccines",
    description: "A vital vaccine for preventing common pet diseases.",
    quantity: 100,
    unit: "doses",
    reorderPoint: 20,
    status: "In Stock",
    supplier: "PetMed Supplies",
    supplierContact: "contact@petmedsupplies.com",
    lastRestockDate: new Date(2023, 5, 1),
    expirationDate: new Date(2024, 5, 1),
    location: "Storage Room A, Shelf 2",
    notes: "Handle with care. Keep refrigerated.",
  };
};

export default function InventoryItemDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    const data = getInventoryItem(params.id);
    setItem(data);
    setLoading(false);
  }, [params.id]);

  const handleDelete = () => {
    // In a real app, this would be an API call
    router.push("/dashboard/inventory");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!item) {
    return <div>Inventory item not found</div>;
  }

  return (
    <DetailView
      title="Inventory Item Details"
      description={`Item #${item.id}`}
      backHref="/dashboard/inventory"
      editHref={`/dashboard/inventory/${item.id}/edit`}
      onDelete={handleDelete}
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
            <DetailItem label="Reorder Point" value={item.reorderPoint} />
            <DetailItem
              label="Status"
              value={
                <Badge
                  className={
                    item.status === "In Stock"
                      ? "bg-green-100 text-green-800"
                      : item.status === "Low Stock"
                      ? "bg-yellow-100 text-yellow-800"
                      : item.status === "Out of Stock"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800"
                  }
                >
                  {item.status}
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
            <DetailItem label="Supplier" value={item.supplier} />
            <DetailItem label="Supplier Contact" value={item.supplierContact} />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium">Dates</h3>
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DetailItem
              label="Last Restock Date"
              value={format(item.lastRestockDate, "MMMM d, yyyy")}
            />
            <DetailItem
              label="Expiration Date"
              value={format(item.expirationDate, "MMMM d, yyyy")}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium">Location</h3>
          <div className="mt-3">
            <p className="text-sm">{item.location}</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium">Notes</h3>
          <div className="mt-3">
            <p className="text-sm">{item.notes}</p>
          </div>
        </div>
      </div>
    </DetailView>
  );
}
