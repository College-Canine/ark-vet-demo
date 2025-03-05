import type { ReactNode } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { validateRequest } from "@/lib/auth";

interface LayoutProps {
  children: ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  const { user } = await validateRequest();

  return (
    <div className="flex min-h-screen flex-col">
      <Header isAuthenticated={user != null} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
