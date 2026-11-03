"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/get-token-client";

export default function JoinEventButton({ eventId }) {
  const { data: session, isPending } = authClient.useSession();

  const [isJoined, setIsJoined] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!session?.user?.email) return;

    const checkJoinedEvent = async () => {
      try {
        const token = await getTokenFromClient();

        if (!token) return;

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/joined-events/${encodeURIComponent(
            session.user.email,
          )}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
          },
        );

        if (!response.ok) return;

        const events = await response.json();

        setIsJoined(events.some((event) => event._id === eventId));
      } catch (error) {
        console.error("Failed to check joined events:", error);
      }
    };

    checkJoinedEvent();
  }, [session, eventId]);

  const handleJoin = async () => {
    if (!session?.user) {
      toast.error("Please login to join this event!");
      router.push("/login");
      return;
    }

    setIsJoining(true);

    try {
      const token = await getTokenFromClient();

      if (!token) {
        toast.error("Unauthorized! Please login again.");
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/events/${eventId}/join`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message);
        return;
      }

      setIsJoined(true);
      toast.success("Successfully joined the event!");
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleJoin}
      disabled={isPending || isJoining || isJoined}
      className="w-full rounded-xl bg-teal-600 px-6 py-3.5 font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-gray-400 sm:w-auto"
    >
      {isPending
        ? "Loading..."
        : isJoining
          ? "Joining..."
          : isJoined
            ? "Already Joined"
            : "Join Event"}
    </button>
  );
}
