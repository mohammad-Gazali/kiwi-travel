"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { FileText, CheckCircle, AlertCircle } from "lucide-react"

export type FileWithProgress = {
  file: File
  progress: number
  error?: string
  complete?: boolean
}

interface UploadProgressDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  files: FileWithProgress[]
  isUploading: boolean
  overallProgress: number
}

export function UploadProgressDialog({
  open,
  setOpen,
  files,
  isUploading,
  overallProgress,
}: UploadProgressDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        // Prevent manual closing of dialog during upload
        if (isUploading) return
        setOpen(value)
      }}
    >
      <DialogContent
        className="sm:max-w-md"
        onInteractOutside={(e) => {
          // Prevent closing by clicking outside during upload
          if (isUploading) {
            e.preventDefault()
          }
        }}
      >
        <DialogHeader>
          <DialogTitle>Uploading Files</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm text-muted-foreground">{Math.round(overallProgress)}%</span>
          </div>
          <Progress value={overallProgress} className="h-2" />

          <div className="mt-4 space-y-3 max-h-[300px] overflow-y-auto">
            {files.map((file, index) => (
              <div key={index} className="flex items-center gap-3 p-2 border rounded-md">
                <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0" />

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.file.name}</p>
                  <div className="flex items-center justify-between mt-1">
                    <Progress value={file.progress} className="h-1.5 flex-1" />
                    <span className="text-xs text-muted-foreground ml-2">{Math.round(file.progress)}%</span>
                  </div>
                </div>

                {file.complete ? (
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                ) : file.error ? (
                  <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            {isUploading ? "Please don't close this dialog until upload completes" : "Upload complete"}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
