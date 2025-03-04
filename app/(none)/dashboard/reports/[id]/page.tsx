"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { DetailView } from "@/components/detail-view";
import { DetailItem } from "@/components/detail-item";
import { Download } from "lucide-react";

// Mock data function
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getReport = (id: string) => {
  return {
    id: "REP001",
    name: "Monthly Financial Summary",
    type: "Financial",
    description:
      "A comprehensive overview of the clinic's financial performance for the month.",
    generatedDate: new Date(2023, 5, 30),
    generatedBy: "John Doe",
    parameters: {
      startDate: new Date(2023, 5, 1),
      endDate: new Date(2023, 5, 30),
    },
    summary: {
      totalRevenue: 50000,
      totalExpenses: 35000,
      netProfit: 15000,
    },
    charts: [
      { type: "Bar", title: "Revenue by Service" },
      { type: "Pie", title: "Expense Distribution" },
    ],
    tables: [
      { name: "Top 10 Services by Revenue" },
      { name: "Monthly Expense Breakdown" },
    ],
  };
};

export default function ReportDetailPage() {
  const params = { id: "testing" };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    const data = getReport(params.id);
    setReport(data);
    setLoading(false);
  }, [params.id]);

  const handleDownload = () => {
    // In a real app, this would trigger a download of the report
    console.log("Downloading report...");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!report) {
    return <div>Report not found</div>;
  }

  return (
    <DetailView
      title="Report Details"
      description={`Report #${report.id}`}
      backHref="/dashboard/reports"
    >
      <div className="grid gap-6">
        <div>
          <h3 className="text-lg font-medium">Report Information</h3>
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DetailItem label="Report ID" value={report.id} />
            <DetailItem label="Name" value={report.name} />
            <DetailItem label="Type" value={report.type} />
            <DetailItem
              label="Generated Date"
              value={format(report.generatedDate, "MMMM d, yyyy")}
            />
            <DetailItem label="Generated By" value={report.generatedBy} />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium">Description</h3>
          <div className="mt-3">
            <p className="text-sm">{report.description}</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium">Parameters</h3>
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DetailItem
              label="Start Date"
              value={format(report.parameters.startDate, "MMMM d, yyyy")}
            />
            <DetailItem
              label="End Date"
              value={format(report.parameters.endDate, "MMMM d, yyyy")}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium">Summary</h3>
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <DetailItem
              label="Total Revenue"
              value={`$${report.summary.totalRevenue.toLocaleString()}`}
            />
            <DetailItem
              label="Total Expenses"
              value={`$${report.summary.totalExpenses.toLocaleString()}`}
            />
            <DetailItem
              label="Net Profit"
              value={`$${report.summary.netProfit.toLocaleString()}`}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium">Charts</h3>
          <div className="mt-3">
            <ul className="list-inside list-disc">
              {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                report.charts.map((chart: any, index: number) => (
                  <li key={index} className="text-sm">
                    {chart.type} - {chart.title}
                  </li>
                ))
              }
            </ul>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium">Tables</h3>
          <div className="mt-3">
            <ul className="list-inside list-disc">
              {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                report.tables.map((table: any, index: number) => (
                  <li key={index} className="text-sm">
                    {table.name}
                  </li>
                ))
              }
            </ul>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        </div>
      </div>
    </DetailView>
  );
}
