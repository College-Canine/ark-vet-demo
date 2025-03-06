"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Calendar,
  Search,
  Bell,
  LogOut,
  Home,
  Users,
  FileText,
  Settings,
  PieChart,
  DollarSign,
  Package,
  Menu,
  X,
  UserIcon,
} from "lucide-react";
import { User } from "lucia";
import Image from "next/image";

export default function DashboardLayout({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logging out...");
    // After logout, redirect to the home page
    router.push("/");
  };

  return (
    <div className=" flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-white px-4 md:px-6">
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-gray-100"
          >
            {isSidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle sidebar</span>
          </button>
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt="Acme Vet Logo"
              width="512"
              height="512"
              className="h-6 w-min"
            />
          </Link>
        </div>
        <div className="hidden md:flex md:items-center md:gap-2">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt="Acme Vet Logo"
              width="512"
              height="512"
              className="h-6 w-min"
            />
          </Link>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <form className="hidden md:block">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-64 rounded-lg bg-gray-50 pl-8 md:w-80"
              />
            </div>
          </form>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.profilePicture} alt="Avatar" />
                  <AvatarFallback>
                    {user.firstname[0].toUpperCase()}
                    {user.lastname[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/preferences">
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Preferences</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="absolute bottom-0 top-16 left-0 right-0 flex flex-1">
        {/* Sidebar */}
        <aside
          className={`absolute inset-y-0 left-0 z-20 top-0 bottom-0 w-64 transform border-r bg-white transition-transform duration-200 ease-in-out md:static md:translate-x-0 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col">
            <div className="flex-1 overflow-auto py-4">
              <nav className="grid gap-1 px-2">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/appointments"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-gray-100"
                >
                  <Calendar className="h-5 w-5" />
                  Appointments
                </Link>
                <Link
                  href="/dashboard/patients"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-gray-100"
                >
                  <Users className="h-5 w-5" />
                  Patients
                </Link>
                <Link
                  href="/dashboard/records"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-gray-100"
                >
                  <FileText className="h-5 w-5" />
                  Medical Records
                </Link>
                <Link
                  href="/dashboard/billing"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-gray-100"
                >
                  <DollarSign className="h-5 w-5" />
                  Billing
                </Link>
                <Link
                  href="/dashboard/inventory"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-gray-100"
                >
                  <Package className="h-5 w-5" />
                  Inventory
                </Link>
                <Link
                  href="/dashboard/reports"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-gray-100"
                >
                  <PieChart className="h-5 w-5" />
                  Reports
                </Link>
              </nav>
            </div>
            <div className="border-t p-4">
              <nav className="grid gap-1">
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-gray-100"
                >
                  <Settings className="h-5 w-5" />
                  Settings
                </Link>
              </nav>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto bg-gray-50 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
