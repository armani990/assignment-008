
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/get-token-client";
import toast from "react-hot-toast";

export default function CreateEvent() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    image: "",
    location: "",
    eventDate: "",
  });

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const minDate = `${tomorrow.getFullYear()}-${String(
    tomorrow.getMonth() + 1
  ).padStart(2, "0")}-${String(tomorrow.getDate()).padStart(2, "0")}`;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const token = await getTokenFromClient();

      if (!token) {
        toast.error("Unauthorized! Please login again.");
        return;
      }

     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message);
        return;
      }

      toast.success("Event created successfully!");

      router.push("/upcoming-events");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isPending || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen px-5 py-16 md:px-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <p className="mb-3 font-semibold uppercase tracking-widest text-teal-600">
            Make A Difference
          </p>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            Create An Event
          </h1>

          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Create a community event and invite others to make a positive
            difference.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900 md:p-8"
        >
          {/* Event Title */}
          <div>
            <label className="mb-2 block font-medium text-gray-700 dark:text-gray-200">
              Event Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter event title"
              required
              className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 outline-none focus:border-teal-600 dark:border-gray-700"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block font-medium text-gray-700 dark:text-gray-200">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your event"
              rows={5}
              required
              className="w-full resize-none rounded-lg border border-gray-300 bg-transparent px-4 py-3 outline-none focus:border-teal-600 dark:border-gray-700"
            />
          </div>

          {/* Event Type */}
          <div>
            <label className="mb-2 block font-medium text-gray-700 dark:text-gray-200">
              Event Type
            </label>


            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-teal-600 dark:border-gray-700 dark:bg-gray-900"
            >
              <option value="">Select event type</option>
              <option value="Community Service">Community Service</option>
              <option value="Food Donation">Food Donation</option>
              <option value="Environment">Environment</option>
              <option value="Social Welfare">Social Welfare</option>
              <option value="Education">Education</option>
              <option value="Charity">Charity</option>
              <option value="Health & Wellness">Health & Wellness</option>
              <option value="Other">Other</option>
            </select>

          </div>

          {/* Thumbnail Image URL */}
          <div>
            <label className="mb-2 block font-medium text-gray-700 dark:text-gray-200">
              Thumbnail Image URL
            </label>

            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              required
              className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 outline-none focus:border-teal-600 dark:border-gray-700"
            />
          </div>

          {/* Location */}
          <div>
            <label className="mb-2 block font-medium text-gray-700 dark:text-gray-200">
              Location
            </label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter event location"
              required
              className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 outline-none focus:border-teal-600 dark:border-gray-700"
            />
          </div>

          {/* Event Date */}
          <div>
            <label className="mb-2 block font-medium text-gray-700 dark:text-gray-200">
              Event Date
            </label>

            <input
              type="date"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              min={minDate}
              required
              className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 outline-none focus:border-teal-600 dark:border-gray-700"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-teal-600 px-6 py-3 font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Creating Event..." : "Create Event"}
          </button>
        </form>
      </div>
    </main>
  );
}
