"use client"

import type React from "react"

import { SidebarProvider } from "./_components/sidebar-provider"
import { DashboardSidebar } from "./_components/dashboard-sidebar"
import { FloatingMenuButton } from "./_components/floating-menu-button"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col">
        <DashboardSidebar />
        <main className="flex-1 p-4 pt-8 lg:ml-64">{children}</main>
        <FloatingMenuButton />
      </div>
    </SidebarProvider>
  )
}

