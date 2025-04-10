"use client";

import { useIsFetching, useIsMutating, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";


const LoadingContainer = ({ children }: { children: React.ReactNode }) => {
  const isLoading = useIsFetching() + useIsMutating() > 0;

  return (
    <div>
      {isLoading && (
        <div className="fixed grid place-items-center top-0 right-0 bottom-0 left-0 lg:left-64 z-50 backdrop-blur-sm bg-black/60">
          <Loader2 className="text-white animate-spin size-24" />
        </div>
      )}
      {children}
    </div>
  )
}

export default LoadingContainer