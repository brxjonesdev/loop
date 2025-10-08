import React from "react";
import Navbar from "../../lib/auth/components/navbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={true} open={true}>
      <AppSidebar />
      <main className="w-full mx-auto p-4 space-y-10">{children}</main>
    </SidebarProvider>
  );
}
