"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Smile } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-navy-950 px-4">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-6 h-20 w-20 rounded-full bg-gold-100 dark:bg-gold-900/30 flex items-center justify-center">
          <Smile className="h-10 w-10 text-gold-600 dark:text-gold-400"/>
        </div>
        <h1 className="text-2xl font-bold text-navy-900 dark:text-white mb-2">Something Went Wrong</h1>
        <p className="text-navy-600 dark:text-navy-300 mb-8">We apologize for the inconvenience. Please try again or contact us directly.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset} className="bg-gold-500 hover:bg-gold-600 text-white">Try Again</Button>
          <Button variant="outline" onClick={() => (window.location.href = "/")}>Go Home</Button>
        </div>
        <p className="mt-8 text-sm text-navy-400">
          Still having issues? Call us at{" "}
          <a href="tel:+15551234567" className="text-gold-600 dark:text-gold-400 font-medium">(555) 123-4567</a>
        </p>
      </div>
    </div>
  );
}
