"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function ManageEventCard({ event }) {
  const [currentEvent, setCurrentEvent] = useState(event);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: event.title,
    description: event.description,
    category: event.category,
    image: event.image,
    location: event.location,
    eventDate: new Date(event.eventDate).toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Open edit dialog with current event data
  const handleEdit = () => {
    setFormData({
      title: currentEvent.title,
      description: currentEvent.description,
      category: currentEvent.category,
      image: currentEvent.image,
      location: currentEvent.location,
      eventDate: new Date(currentEvent.eventDate).toISOString().split("T")[0],
    });

    setIsEditOpen(true);
  };

  // Update event
  const handleUpdate = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `http://localhost:8000/events/${currentEvent._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            creatorEmail: currentEvent.creatorEmail,
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message);
        return;
      }

      setCurrentEvent({
        ...currentEvent,
        ...formData,
        eventDate: new Date(formData.eventDate).toISOString(),
      });

      setIsEditOpen(false);

      toast.success("Event updated successfully!");
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete event
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/events/${currentEvent._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            creatorEmail: currentEvent.creatorEmail,
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message);
        return;
      }

      setCurrentEvent(null);
      setIsDeleteOpen(false);

      toast.success("Event deleted successfully!");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  if (!currentEvent) {
    return null;
  }

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-gray-900">
        <Image
          src={currentEvent.image}
          alt={currentEvent.title}
          width={600}
          height={400}
          className="h-52 w-full object-cover"
        />

        <div className="p-5">
          <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-700 dark:bg-teal-900 dark:text-teal-300">
            {currentEvent.category}
          </span>

          <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
            {currentEvent.title}
          </h3>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            📍 {currentEvent.location}
          </p>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            📅{" "}
            {new Date(currentEvent.eventDate).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>

          <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
            {currentEvent.description}
          </p>

          {/* Action Buttons */}
          <div className="mt-5 flex items-center justify-between gap-2">
            <Link
              href={`/events/${currentEvent._id}`}
              className="rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
            >
              View Event
            </Link>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleEdit}
                className="rounded-lg bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() => setIsDeleteOpen(true)}
                className="rounded-lg bg-red-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Event Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>

            <DialogDescription>
              Update your event information below.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Event Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 outline-none focus:border-teal-600 dark:border-gray-700"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                required
                className="w-full resize-none rounded-lg border border-gray-300 bg-transparent px-4 py-3 outline-none focus:border-teal-600 dark:border-gray-700"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
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
                <option value="Community Cleanup">Community Cleanup</option>
                <option value="Food Donation">Food Donation</option>
                <option value="Tree Plantation">Tree Plantation</option>
                <option value="Education">Education</option>
                <option value="Health">Health</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Thumbnail Image URL
              </label>

              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 outline-none focus:border-teal-600 dark:border-gray-700"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Location</label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 outline-none focus:border-teal-600 dark:border-gray-700"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Event Date
              </label>

              <input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                required
                className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 outline-none focus:border-teal-600 dark:border-gray-700"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-teal-600 px-6 py-3 font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Updating..." : "Update Event"}
            </button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Alert Dialog */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this event?
            </AlertDialogTitle>

            <AlertDialogDescription>
              This action cannot be undone. This event will be permanently
              deleted from your events list.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
