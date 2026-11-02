"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import EventCard from "@/components/shared/EventCard";

export default function JoinedEventsPage() {
  const { data: session, isPending } = authClient.useSession();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isPending) return;

    if (!session?.user) return;

    const fetchJoinedEvents = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/joined-events/${encodeURIComponent(
            session.user.email
          )}`,
          { cache: "no-store" }
        );

        const data = await response.json();

        if (response.ok) {
          const sortedEvents = [...data].sort(
            (a, b) => new Date(a.eventDate) - new Date(b.eventDate)
          );

          setEvents(sortedEvents);
        }
      } catch (error) {
        console.error("Failed to fetch joined events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJoinedEvents();
  }, [session, isPending]);

  if (isPending || loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-500">Loading joined events...</p>
      </div>
    );
  }

  if (!session?.user) return null;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Joined Events
          </h1>

          <p className="mt-2 text-gray-600 dark:text-gray-400">
            All the events you have joined.
          </p>
        </div>

        {events.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center dark:border-gray-700 dark:bg-gray-900">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              No Joined Events Yet!
            </h2>

            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Explore upcoming events and join the ones you like.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}