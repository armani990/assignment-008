
"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/get-token-client";
import EventCard from "@/components/shared/EventCard";
import ScrollReveal from "@/components/shared/ScrollReveal";

export default function JoinedEventsPage() {
  const { data: session, isPending } = authClient.useSession();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isPending) return;

    if (!session?.user) return;

    const fetchJoinedEvents = async () => {
      try {
        const token = await getTokenFromClient();

        if (!token) {
          console.error("Unauthorized! Please login again.");
          return;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/joined-events/${encodeURIComponent(
            session.user.email
          )}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
          }
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

  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-500">Loading joined events...</p>
      </div>
    );
  }

  if (!session?.user) return null;

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-500">Loading joined events...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl">

        {/* Page Heading */}
        <ScrollReveal className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Joined Events
          </h1>

          <p className="mt-2 text-gray-600 dark:text-gray-400">
            All the events you have joined.
          </p>
        </ScrollReveal>

        {events.length === 0 ? (
          <ScrollReveal>
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center dark:border-gray-700 dark:bg-gray-900">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                No Joined Events Yet!
              </h2>

              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Explore upcoming events and join the ones you like.
              </p>
            </div>
          </ScrollReveal>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event, index) => (
              <ScrollReveal
                key={event._id}
                delay={index * 0.12}
                className="h-full"
              >
                <EventCard event={event} />
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
