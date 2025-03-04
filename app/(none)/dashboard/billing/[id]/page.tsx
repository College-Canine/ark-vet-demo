"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { DetailView } from "@/components/detail-view";
import { DetailItem } from "@/components/detail-item";

// Mock data function
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getInvoice = (id: string) => {
  return {
    id: "INV001",
    date: new Date(2023, 5, 15),
    dueDate: new Date(2023, 5, 30),
    patientName: "Max",
    patientId: "P001",
    patientType: "Golden Retriever",
    ownerName: "John Smith",
    ownerEmail: "john.smith@example.com",
    ownerPhone: "(555) 123-4567",
    amount: 150.0,
    status: "Paid",
    items: [
      {
        description: "Annual checkup",
        quantity: 1,
        unitPrice: 100.0,
        total: 100.0,
      },
      {
        description: "Vaccinations",
        quantity: 1,
        unitPrice: 50.0,
        total: 50.0,
      },
    ],
    notes: "Thank you for your business!",
    paymentMethod: "Credit Card",
    paymentDate: new Date(2023, 5, 15),
  };
};

export default function InvoiceDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [invoice, setInvoice] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    const data = getInvoice(params.id);
    setInvoice(data);
    setLoading(false);
  }, [params.id]);

  const handleDelete = () => {
    // In a real app, this would be an API call
    router.push("/dashboard/billing");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!invoice) {
    return <div>Invoice not found</div>;
  }

  return (
    <DetailView
      title="Invoice Details"
      description={`Invoice #${invoice.id}`}
      backHref="/dashboard/billing"
      editHref={`/dashboard/billing/${invoice.id}/edit`}
      onDelete={handleDelete}
    >
      <div className="grid gap-6">
        <div>
          <h3 className="text-lg font-medium">Invoice Information</h3>
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DetailItem label="Invoice ID" value={invoice.id} />
            <DetailItem
              label="Date"
              value={format(invoice.date, "MMMM d, yyyy")}
            />
            <DetailItem
              label="Due Date"
              value={format(invoice.dueDate, "MMMM d, yyyy")}
            />
            <DetailItem
              label="Amount"
              value={`$${invoice.amount.toFixed(2)}`}
            />
            <DetailItem
              label="Status"
              value={
                <Badge
                  className={
                    invoice.status === "Paid"
                      ? "bg-green-100 text-green-800"
                      : invoice.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : invoice.status === "Overdue"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800"
                  }
                >
                  {invoice.status}
                </Badge>
              }
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium">Patient Information</h3>
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DetailItem label="Patient Name" value={invoice.patientName} />
            <DetailItem label="Patient ID" value={invoice.patientId} />
            <DetailItem label="Patient Type" value={invoice.patientType} />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium">Owner Information</h3>
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DetailItem label="Owner Name" value={invoice.ownerName} />
            <DetailItem label="Email" value={invoice.ownerEmail} />
            <DetailItem label="Phone" value={invoice.ownerPhone} />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium">Invoice Items</h3>
          <div className="mt-3">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Unit Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  invoice.items.map((item: any, index: number) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {item.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        ${item.unitPrice.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        ${item.total.toFixed(2)}
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium">Payment Information</h3>
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DetailItem label="Payment Method" value={invoice.paymentMethod} />
            <DetailItem
              label="Payment Date"
              value={format(invoice.paymentDate, "MMMM d, yyyy")}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium">Notes</h3>
          <div className="mt-3">
            <p className="text-sm">{invoice.notes}</p>
          </div>
        </div>
      </div>
    </DetailView>
  );
}
