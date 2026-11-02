import Link from "next/link";
import Image from "next/image";
export default function EventCard({ event }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-gray-900">
      <Image
        src={event.image}
        alt={event.title}
        width={600}
        height={400}
        className="h-52 w-full object-cover"
      />

      <div className="p-5">
        <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-700 dark:bg-teal-900 dark:text-teal-300">
          {event.category}
        </span>

        <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
          {event.title}
        </h3>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          📍 {event.location}
        </p>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          📅{" "}
          {new Date(event.eventDate).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
          {event.description}
        </p>

        <Link
          href={`/events/${event._id}`}
          className="mt-5 inline-block rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
        >
          View Event
        </Link>
      </div>
    </div>
  );
}
