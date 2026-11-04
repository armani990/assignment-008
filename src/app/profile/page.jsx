
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  UserRound,
  Mail,
  Camera,
  Pencil,
  Save,
  X,
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();

  const {
    data: session,
    isPending,
    refetch,
  } = authClient.useSession();

  const user = session?.user;

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  // Get user initials
  const getInitials = (name) => {
    return name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : "U";
  };

  // Start editing profile
  const handleEdit = () => {
    setName(user.name || "");
    setImage(user.image || "");
    setIsEditing(true);
  };

  // Cancel editing
  const handleCancel = () => {
    setName(user.name || "");
    setImage(user.image || "");
    setIsEditing(false);
  };

  // Update profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter your name!");
      return;
    }

    if (!image.trim()) {
      toast.error("Please enter your profile image URL!");
      return;
    }

    setIsSaving(true);

    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
        image: image.trim(),
      });

      if (error) {
        toast.error(error.message || "Profile update failed!");
        return;
      }

      await refetch();

      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsSaving(false);
    }
  };

  // Loading State
  if (isPending) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  // Redirect if user is not logged in
  if (!user) {
    router.replace("/login");
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-50 px-5 py-16 dark:bg-gray-950 md:px-10">
      <div className="mx-auto max-w-4xl">

        {/* Page Heading */}
        <div className="mb-10 text-center">
          <p className="mb-3 font-semibold uppercase tracking-widest text-teal-600">
            Your Account
          </p>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            My Profile
          </h1>

          <p className="mt-4 text-gray-600 dark:text-gray-400">
            View and manage your personal information.
          </p>
        </div>

        {/* Profile Card */}
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">

          {/* Profile Header */}
          <div className="bg-gradient-to-br from-teal-700 to-teal-950 px-6 py-10 text-center text-white">

            <Avatar className="mx-auto h-24 w-24 border-4 border-white/30 shadow-lg">
              <AvatarImage
                src={isEditing ? image : user.image || ""}
                alt={user.name || "User"}
              />

              <AvatarFallback className="bg-teal-100 text-2xl font-bold text-teal-800">
                {getInitials(isEditing ? name : user.name)}
              </AvatarFallback>
            </Avatar>

            <h2 className="mt-5 text-2xl font-bold">
              {isEditing ? name || "Your Name" : user.name}
            </h2>

            <p className="mt-2 text-sm text-teal-100">
              {user.email}
            </p>
          </div>

          {/* Profile Information */}
          <div className="p-6 md:p-10">

            {!isEditing ? (
              <>
                <div className="mb-8 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Personal Information
                  </h3>

                  <button
                    type="button"
                    onClick={handleEdit}
                    className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700"
                  >
                    <Pencil size={16} />
                    Edit Profile
                  </button>
                </div>

                <div className="space-y-5">

                  {/* Name */}
                  <div className="flex items-start gap-4 rounded-xl bg-gray-50 p-5 dark:bg-gray-800">
                    <UserRound className="mt-1 text-teal-600 dark:text-teal-400" />

                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Full Name
                      </p>

                      <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                        {user.name}
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4 rounded-xl bg-gray-50 p-5 dark:bg-gray-800">
                    <Mail className="mt-1 text-teal-600 dark:text-teal-400" />

                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Email Address
                      </p>

                      <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  {/* Profile Image */}
                  <div className="flex items-start gap-4 rounded-xl bg-gray-50 p-5 dark:bg-gray-800">
                    <Camera className="mt-1 text-teal-600 dark:text-teal-400" />

                    <div className="min-w-0">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Profile Picture
                      </p>

                      <p className="mt-1 break-all text-sm font-medium text-gray-900 dark:text-white">
                        {user.image || "No profile picture available"}
                      </p>
                    </div>
                  </div>

                </div>
              </>
            ) : (
              <>
                {/* Edit Profile Form */}
                <h3 className="mb-8 text-xl font-bold text-gray-900 dark:text-white">
                  Edit Personal Information
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block font-medium text-gray-700 dark:text-gray-200"
                    >
                      Full Name
                    </label>

                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      required
                      className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 outline-none focus:border-teal-600 dark:border-gray-700"
                    />
                  </div>

                  {/* Email - Read Only */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block font-medium text-gray-700 dark:text-gray-200"
                    >
                      Email Address
                    </label>

                    <input
                      id="email"
                      type="email"
                      value={user.email}
                      readOnly
                      className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-500 outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                    />

                    <p className="mt-2 text-xs text-gray-500">
                      Email address cannot be changed here.
                    </p>
                  </div>

                  {/* Profile Image URL */}
                  <div>
                    <label
                      htmlFor="image"
                      className="mb-2 block font-medium text-gray-700 dark:text-gray-200"
                    >
                      Profile Picture URL
                    </label>

                    <input
                      id="image"
                      type="url"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="https://example.com/profile.jpg"
                      required
                      className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 outline-none focus:border-teal-600 dark:border-gray-700"
                    />

                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      Enter a valid image URL to update your profile picture.
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col gap-3 pt-2 sm:flex-row">

                    <button
                      type="submit"
                      disabled={isSaving}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-teal-600 px-6 py-3 font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Save size={18} />
                      {isSaving ? "Saving..." : "Save Changes"}
                    </button>

                    <button
                      type="button"
                      onClick={handleCancel}
                      disabled={isSaving}
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100 disabled:opacity-60 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                      <X size={18} />
                      Cancel
                    </button>

                  </div>
                </form>
              </>
            )}

          </div>
        </div>
      </div>
    </main>
  );
}
