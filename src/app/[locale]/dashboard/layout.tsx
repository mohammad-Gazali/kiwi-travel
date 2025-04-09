import { SidebarProvider } from "./_components/sidebar-provider";
import { DashboardSidebar } from "./_components/dashboard-sidebar";
import { FloatingMenuButton } from "./_components/floating-menu-button";
import type { Metadata } from "next";
import LoadingContainer from "./_components/loading-container";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: {
    index: false,
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col">
        <DashboardSidebar />
        <LoadingContainer>
          <main className="flex-1 p-4 pt-8 lg:ml-64">
            {children}
          </main>
        </LoadingContainer>
        <FloatingMenuButton />
      </div>
    </SidebarProvider>
  );
}
