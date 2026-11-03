
import EventCard from "@/components/shared/EventCard";

export default async function UpcomingEvents() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`, {
    cache: "no-store",
  });

  const events = await response.json();

  return (
    <main className="min-h-screen px-5 py-16 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Page Heading */}
        <div className="mb-12 text-center">
          <p className="mb-3 font-semibold uppercase tracking-widest text-teal-600">
            Make A Difference
          </p>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            Upcoming Events
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-400">
            Explore upcoming community events and join us to make a positive
            difference in the community.
          </p>
        </div>

        {/* Events Grid */}
        {events.length > 0 ? (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              No Upcoming Events
            </h2>

            <p className="mt-2 text-gray-500 dark:text-gray-400">
              There are no upcoming events at the moment. Please check back
              later.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
