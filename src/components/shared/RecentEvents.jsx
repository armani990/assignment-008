
import EventCard from "./EventCard";

export default async function RecentEvents() {
  const response = await fetch("http://localhost:8000/events/recent", {
    cache: "no-store",
  });

  const events = await response.json();

  return (
    <section className="px-5 py-16 md:px-10 lg:px-16">

      <div className="mx-auto max-w-7xl">

        <div className="mb-10 text-center">
          <p className="mb-3 font-semibold uppercase tracking-widest text-teal-600">
            Make A Difference
          </p>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            Recent Upcoming Events
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-400">
            Discover upcoming community events and become a part of something meaningful.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">

          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}

        </div>

      </div>

    </section>
  );
}
