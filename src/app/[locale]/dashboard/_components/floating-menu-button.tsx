"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSidebar } from "./sidebar-provider"

export function FloatingMenuButton() {
  const { toggle } = useSidebar()

  return (
    <Button
      id="sidebar-toggle"
      variant="default"
      className="fixed bottom-4 size-14 left-4 z-40 rounded-full shadow-lg lg:hidden"
      onClick={toggle}
    >
      <Menu className="!size-7" />
      <span className="sr-only">Toggle sidebar</span>
    </Button>
  )
}
