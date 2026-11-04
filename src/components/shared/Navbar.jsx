
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

import {
  Menu,
  Moon,
  Sun,
  LogOut,
  CalendarPlus,
  ListChecks,
  UserCheck,
  HeartHandshake,
  Info,
  UserRound,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  // Get logged-in user from Better Auth session
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const isActive = (path) => pathname === path;

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const handleLogout = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "Logout failed!");
        return;
      }

      toast.success("Logged out successfully!");
      router.push("/login");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    }
  };

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

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-600 text-white group-hover:bg-teal-700 transition-colors">
            <HeartHandshake className="h-5 w-5" />
          </div>

          <span className="text-xl font-bold tracking-tight text-teal-700 dark:text-teal-400">
            SevaConnect
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/upcoming-events"
            className={`text-sm font-medium transition-colors hover:text-teal-600 ${
              isActive("/upcoming-events")
                ? "text-teal-600"
                : "text-muted-foreground"
            }`}
          >
            Upcoming Events
          </Link>

          {/* About Us */}
          <Link
            href="/about"
            className={`text-sm font-medium transition-colors hover:text-teal-600 ${
              isActive("/about")
                ? "text-teal-600"
                : "text-muted-foreground"
            }`}
          >
            About Us
          </Link>
        </nav>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center gap-3">

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            <Sun className="hidden h-5 w-5 dark:block" />
            <Moon className="block h-5 w-5 dark:hidden" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {isPending ? null : user ? (
            <>
              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="ghost"
                      className="relative h-10 w-10 rounded-full p-0 hover:bg-teal-50 dark:hover:bg-teal-950"
                    />
                  }
                >
                  <Avatar
                    title={user.name || "User"}
                    className="h-9 w-9 border-2 border-teal-200 dark:border-teal-800"
                  >
                    <AvatarImage
                      src={user.image || ""}
                      alt={user.name || "User"}
                    />

                    <AvatarFallback className="bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user.name || "User"}
                        </p>

                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />

                  {/* Profile */}
                  <DropdownMenuItem
                    render={
                      <Link href="/profile" className="cursor-pointer" />
                    }
                  >
                    <UserRound className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    render={
                      <Link href="/create-event" className="cursor-pointer" />
                    }
                  >
                    <CalendarPlus className="mr-2 h-4 w-4" />
                    Create Event
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    render={
                      <Link href="/manage-events" className="cursor-pointer" />
                    }
                  >
                    <ListChecks className="mr-2 h-4 w-4" />
                    Manage Events
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    render={
                      <Link href="/joined-events" className="cursor-pointer" />
                    }
                  >
                    <UserCheck className="mr-2 h-4 w-4" />
                    Joined Events
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Logout Button */}
              <Button
                variant="destructive"
                onClick={handleLogout}
                className="rounded-lg"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <Button
              render={<Link href="/login" />}
              nativeButton={false}
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              Login
            </Button>
          )}
        </div>

        {/* Mobile Right Side */}
        <div className="flex md:hidden items-center gap-2">

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            <Sun className="hidden h-5 w-5 dark:block" />
            <Moon className="block h-5 w-5 dark:hidden" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon" />}>
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>

            <SheetContent side="right" className="w-75 sm:w-87.5">
              <div className="mt-6 flex flex-col gap-6">

                {user && (
                  <div className="flex items-center gap-3 px-2">
                    <Avatar className="h-12 w-12 border-2 border-teal-200">
                      <AvatarImage
                        src={user.image || ""}
                        alt={user.name || "User"}
                      />

                      <AvatarFallback className="bg-teal-100 text-teal-700">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                )}

                <Separator />

                <div className="flex flex-col gap-1">

                  {/* Upcoming Events */}
                  <SheetClose
                    nativeButton={false}
                    render={
                      <Link
                        href="/upcoming-events"
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-teal-50 dark:hover:bg-teal-950 ${
                          isActive("/upcoming-events")
                            ? "bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300"
                            : ""
                        }`}
                      />
                    }
                  >
                    Upcoming Events
                  </SheetClose>

                  {/* About Us */}
                  <SheetClose
                    nativeButton={false}
                    render={
                      <Link
                        href="/about"
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-teal-50 dark:hover:bg-teal-950 ${
                          isActive("/about")
                            ? "bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300"
                            : ""
                        }`}
                      />
                    }
                  >
                    <Info className="h-4 w-4" />
                    About Us
                  </SheetClose>

                  {user && (
                    <>
                      {/* Profile */}
                      <SheetClose
                        nativeButton={false}
                        render={
                          <Link
                            href="/profile"
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-teal-50 dark:hover:bg-teal-950 ${
                              isActive("/profile")
                                ? "bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300"
                                : ""
                            }`}
                          />
                        }
                      >
                        <UserRound className="h-4 w-4" />
                        Profile
                      </SheetClose>

                      <SheetClose
                        nativeButton={false}
                        render={
                          <Link
                            href="/create-event"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-teal-50 dark:hover:bg-teal-950"
                          />
                        }
                      >
                        <CalendarPlus className="h-4 w-4" />
                        Create Event
                      </SheetClose>

                      <SheetClose
                        nativeButton={false}
                        render={
                          <Link
                            href="/manage-events"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-teal-50 dark:hover:bg-teal-950"
                          />
                        }
                      >
                        <ListChecks className="h-4 w-4" />
                        Manage Events
                      </SheetClose>

                      <SheetClose
                        nativeButton={false}
                        render={
                          <Link
                            href="/joined-events"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-teal-50 dark:hover:bg-teal-950"
                          />
                        }
                      >
                        <UserCheck className="h-4 w-4" />
                        Joined Events
                      </SheetClose>
                    </>
                  )}
                </div>

                <Separator />

                {isPending ? null : user ? (
                  <Button
                    variant="destructive"
                    onClick={handleLogout}
                    className="w-full justify-start"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                ) : (
                  <SheetClose
                    nativeButton={false}
                    render={
                      <Link
                        href="/login"
                        className="flex w-full items-center justify-center rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
                      />
                    }
                  >
                    Login
                  </SheetClose>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
