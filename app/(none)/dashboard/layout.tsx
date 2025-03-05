import { validateRequest } from "@/lib/auth";
import DashboardLayoutClient from "./layout-client";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();
  if (user == null) return redirect("/login");

  return <DashboardLayoutClient user={user}>{children}</DashboardLayoutClient>;
}
