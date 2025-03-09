"use client"

import { Button } from "@/components/ui/button"
import { Menu, Settings } from "lucide-react"
import { useSidebar } from "./sidebar-provider"

export function DashboardHeader() {
  const { toggle } = useSidebar()

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
      <Button id="sidebar-toggle" variant="ghost" size="icon" className="lg:hidden" onClick={toggle}>
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle sidebar</span>
      </Button>

      <div className="flex items-center gap-2">
        <Settings className="h-8 w-8 text-primary" />
        <h1 className="font-medium text-2xl">
          Dashboard
        </h1>
      </div>
    </header>
  )
}

