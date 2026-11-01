"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NextImage from "next/image";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
    HeartHandshake,
    User,
    Mail,
    Lock,
    Eye,
    EyeOff,
    Image as ImageIcon,
} from "lucide-react";

export default function SignupPage() {
    const router = useRouter();

    const { data: session, isPending } = authClient.useSession();

    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [name, setName] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Redirect logged-in users to homepage
    useEffect(() => {
        if (!isPending && session?.user) {
            router.replace("/");
        }
    }, [session, isPending, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !name.trim() ||
            !photoURL.trim() ||
            !email.trim() ||
            !password
        ) {
            toast.error("Please fill in all fields!");
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email.trim())) {
            toast.error("Please enter a valid email address!");
            return;
        }

        // Password validation: uppercase, lowercase, minimum 6 characters
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

        if (!passwordRegex.test(password)) {
            toast.error(
                "Password must contain uppercase, lowercase and at least 6 characters!"
            );
            return;
        }

        // Photo URL validation
        try {
            const imageURL = new URL(photoURL.trim());

            if (
                imageURL.protocol !== "http:" &&
                imageURL.protocol !== "https:"
            ) {
                toast.error("Please enter a valid photo URL!");
                return;
            }
        } catch {
            toast.error("Please enter a valid photo URL!");
            return;
        }

        setIsSubmitting(true);

        try {
            const { data, error } = await authClient.signUp.email({
                name: name.trim(),
                email: email.trim(),
                password,
                image: photoURL.trim(),
            });

            if (error) {
                toast.error(error.message || "Account creation failed!");
                return;
            }

            if (data) {
                toast.success("Account created successfully!");
                router.push("/login");
            }
        } catch (error) {
            toast.error(
                error.message || "Something went wrong. Please try again!"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    // Don't show signup form while checking session
    if (isPending || session?.user) {
        return null;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950 p-4 transition-colors duration-300">
            <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

                {/* Left Side - Illustration */}
                <div className="hidden lg:flex items-center justify-center relative">
                    <div className="relative w-full max-w-md">

                        <div className="absolute -top-10 -left-10 w-72 h-72 bg-teal-100/60 dark:bg-teal-900/30 rounded-full blur-3xl" />

                        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-emerald-100/50 dark:bg-emerald-900/30 rounded-full blur-3xl" />

                        <div className="relative bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm rounded-3xl p-6 border border-teal-100/50 dark:border-slate-700 shadow-sm">

                            <NextImage
                                src="/images/login-illustration.png"
                                alt="Community helping illustration"
                                width={600}
                                height={600}
                                className="w-full h-auto object-contain rounded-2xl"
                                priority
                            />

                        </div>
                    </div>
                </div>

                {/* Right Side - Signup Form */}
                <div className="flex justify-center">

                    <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 p-8 sm:p-10 transition-colors duration-300">

                        {/* Logo */}
                        <div className="flex items-center justify-center gap-2 mb-6">

                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 text-white">
                                <HeartHandshake className="h-5 w-5" />
                            </div>

                            <span className="text-2xl font-bold tracking-tight text-teal-700 dark:text-teal-400">
                                SevaConnect
                            </span>

                        </div>

                        {/* Heading */}
                        <div className="text-center mb-8">

                            <h1 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">
                                Create Account
                            </h1>

                            <p className="mt-2 text-sm text-gray-500 dark:text-slate-300">
                                Join our community and start making a difference
                            </p>

                        </div>

                        {/* Signup Form */}
                        <form
                            onSubmit={handleSubmit}
                            noValidate
                            className="space-y-5"
                        >

                            {/* Name */}
                            <div className="space-y-2">

                                <Label
                                    htmlFor="name"
                                    className="text-sm font-medium text-slate-700 dark:text-slate-200"
                                >
                                    Full Name
                                </Label>

                                <div className="relative">

                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="Enter your full name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="pl-10 h-11 rounded-lg border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus-visible:ring-teal-500"
                                        required
                                    />

                                </div>
                            </div>

                            {/* Photo URL */}
                            <div className="space-y-2">

                                <Label
                                    htmlFor="photoURL"
                                    className="text-sm font-medium text-slate-700 dark:text-slate-200"
                                >
                                    Photo URL
                                </Label>

                                <div className="relative">

                                    <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                                    <Input
                                        id="photoURL"
                                        type="url"
                                        placeholder="Enter your photo URL"
                                        value={photoURL}
                                        onChange={(e) => setPhotoURL(e.target.value)}
                                        className="pl-10 h-11 rounded-lg border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus-visible:ring-teal-500"
                                        required
                                    />

                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-2">

                                <Label
                                    htmlFor="email"
                                    className="text-sm font-medium text-slate-700 dark:text-slate-200"
                                >
                                    Email
                                </Label>

                                <div className="relative">

                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10 h-11 rounded-lg border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus-visible:ring-teal-500"
                                        required
                                    />

                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-2">

                                <Label
                                    htmlFor="password"
                                    className="text-sm font-medium text-slate-700 dark:text-slate-200"
                                >
                                    Password
                                </Label>

                                <div className="relative">

                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10 pr-10 h-11 rounded-lg border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus-visible:ring-teal-500"
                                        required
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-slate-600 dark:hover:text-white transition-colors"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>

                                </div>
                            </div>

                            {/* Signup Button */}
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full h-11 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg shadow-sm"
                            >
                                <User className="mr-2 h-4 w-4" />
                                {isSubmitting ? "Creating Account..." : "Create Account"}
                            </Button>

                        </form>

                        {/* Divider */}
                        <div className="relative my-6">

                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-gray-200 dark:border-slate-700" />
                            </div>

                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white dark:bg-slate-900 px-3 text-gray-500 dark:text-slate-400">
                                    or
                                </span>
                            </div>

                        </div>

                        {/* Google Button - UI Only */}
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full h-11 rounded-lg border-gray-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-800 font-medium"
                        >

                            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>

                            Continue with Google

                        </Button>

                        {/* Login Link */}
                        <p className="mt-6 text-center text-sm text-gray-500 dark:text-slate-300">
                            Already have an account?{" "}

                            <Link
                                href="/login"
                                className="font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 hover:underline"
                            >
                                Login
                            </Link>

                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
}