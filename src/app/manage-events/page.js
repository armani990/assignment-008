
"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/get-token-client";
import toast from "react-hot-toast";
import ManageEventCard from "@/components/shared/ManageEventCard";

export default function ManageEvents() {
  const { data: session, isPending } = authClient.useSession();

  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isPending && session) {
      const fetchMyEvents = async () => {
        try {
          const token = await getTokenFromClient();

          if (!token) {
            toast.error("Unauthorized! Please login again.");
            return;
          }

          const response = await fetch(
            `http://localhost:8000/events/my-events/${encodeURIComponent(
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

          if (!response.ok) {
            toast.error("Could not load your events!");
            return;
          }

          setEvents(data);
        } catch (error) {
          toast.error("Something went wrong!");
        } finally {
          setIsLoading(false);
        }
      };

      fetchMyEvents();
    }
  }, [isPending, session]);

  if (isPending || !session || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen px-5 py-16 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="mb-3 font-semibold uppercase tracking-widest text-teal-600">
            Your Activities
          </p>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            Manage Your Events
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-400">
            Manage the community events you have created.
          </p>
        </div>

        {events.length > 0 ? (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <ManageEventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              No Events Found
            </h2>

            <p className="mt-2 text-gray-500 dark:text-gray-400">
              You&apos;re managing your events.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
