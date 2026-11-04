
import Link from "next/link";
import { Home, ArrowLeft, SearchX, HeartHandshake } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[75vh] items-center justify-center px-5 py-16">
      <div className="mx-auto max-w-xl text-center">

        {/* Icon */}
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-400">
          <SearchX size={42} />
        </div>

        {/* Error Code */}
        <h1 className="text-8xl font-extrabold tracking-tight text-teal-600 dark:text-teal-500 sm:text-9xl">
          404
        </h1>

        {/* Message */}
        <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          Oops! Page Not Found
        </h2>

        <p className="mx-auto mt-4 max-w-md leading-7 text-gray-600 dark:text-gray-400">
          The page you are looking for might have been removed,
          had its name changed, or is temporarily unavailable.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white transition hover:bg-teal-700"
          >
            <Home size={19} />
            Back to Home
          </Link>

          <Link
            href="/upcoming-events"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:border-teal-600 hover:text-teal-600 dark:border-gray-700 dark:text-gray-300 dark:hover:border-teal-500 dark:hover:text-teal-400"
          >
            Explore Events
            <ArrowLeft size={18} className="rotate-180" />
          </Link>
        </div>

        {/* Brand */}
        <div className="mt-12 flex items-center justify-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
          <HeartHandshake size={18} className="text-teal-600" />
          SevaConnect
        </div>

      </div>
    </main>
  );
}
