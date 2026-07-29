import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-navy-950 px-4">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-6 h-24 w-24 rounded-full bg-gold-100 dark:bg-gold-900/30 flex items-center justify-center">
          <span className="text-5xl font-bold text-gold-600 dark:text-gold-400">{':)'}</span>
        </div>
        <h1 className="text-6xl font-bold text-navy-900 dark:text-white mb-4">404</h1>
        <p className="text-xl text-navy-600 dark:text-navy-300 mb-2">Page Not Found</p>
        <p className="text-navy-500 dark:text-navy-400 mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 hover:bg-gold-600 text-white font-medium rounded-lg transition-colors">
          <ArrowLeft className="h-5 w-5" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}