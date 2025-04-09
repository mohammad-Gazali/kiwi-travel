import { useRouter } from "next/navigation";
import { useToast } from "./use-toast"

export const useCommonMutationResponse = (backUrl?: string, invalidate?: () => void) => {
  const { toast } = useToast();
  const router = useRouter();

  return {
    onSuccess: ({ message }: { message: string }) => {
      toast({
        title: "Success",
        description: message,
      })

      if (invalidate) {
        invalidate()
      }
      
      if (backUrl) {
        router.push(backUrl)
      }
    },
    onError: ({ message }: { message: string }) => {
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      })
    }
  }
}