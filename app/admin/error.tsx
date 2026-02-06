"use client"

import { useEffect } from "react"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Admin page error:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl tracking-tight mb-3">Something went wrong</h2>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          There was an error loading the admin panel. This might be due to browser restrictions in this environment.
        </p>
        <Button
          onClick={reset}
          className="px-8 h-11 rounded-lg shadow-elegant-lg hover:shadow-xl transition-all duration-300"
        >
          Try again
        </Button>
      </div>
    </div>
  )
}
