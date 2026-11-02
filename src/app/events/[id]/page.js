
import { notFound } from "next/navigation";
import Link from "next/link";
import JoinEventButton from "@/components/shared/JoinEventButton";

export default async function EventDetailsPage({ params }) {
  const { id } = await params;

  const response = await fetch(`http://localhost:8000/events/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    notFound();
  }

  const event = await response.json();

  const eventDate = new Date(event.eventDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 dark:bg-gray-950">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/upcoming-events"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-teal-600 transition hover:text-teal-700"
        >
          ← Back to Upcoming Events
        </Link>

        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <img
            src={event.image}
            alt={event.title}
            className="h-64 w-full object-cover sm:h-96"
          />

          <div className="p-6 sm:p-10">
            <span className="rounded-full bg-teal-100 px-4 py-2 text-sm font-semibold text-teal-700 dark:bg-teal-900/50 dark:text-teal-300">
              {event.category}
            </span>

            <h1 className="mt-6 text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
              {event.title}
            </h1>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Event Location
                </p>
                <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                  📍 {event.location}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Event Date
                </p>
                <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                  📅 {eventDate}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                About This Event
              </h2>

              <p className="mt-3 whitespace-pre-line text-base leading-8 text-gray-600 dark:text-gray-300">
                {event.description}
              </p>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-8 dark:border-gray-700">
              <JoinEventButton eventId={event._id.toString()} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
