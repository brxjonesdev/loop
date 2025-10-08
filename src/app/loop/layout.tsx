import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/sidebar";
import MobileSidebar from "./_components/mobile-sb";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={true} open={true}>
      <AppSidebar />
      <div className="flex-1 w-full">
      <MobileSidebar/>
      {children}
      </div>
    </SidebarProvider>
  );
}
