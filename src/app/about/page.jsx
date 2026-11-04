
import Link from "next/link";
import ScrollReveal from "@/components/shared/ScrollReveal";
import {
  ArrowRight,
  HeartHandshake,
  Leaf,
  HandHeart,
  Users,
  CalendarCheck,
  Sprout,
  Recycle,
  BookOpen,
  Target,
  Eye,
  Heart,
} from "lucide-react";

const activities = [
  {
    icon: Recycle,
    title: "Community Cleanup",
    description:
      "Encourage people to work together to create cleaner and healthier neighborhoods.",
  },
  {
    icon: Sprout,
    title: "Tree Plantation",
    description:
      "Promote environmental awareness and help build a greener future through plantation activities.",
  },
  {
    icon: HandHeart,
    title: "Donation & Charity",
    description:
      "Connect people who want to support those in need through meaningful donation activities.",
  },
  {
    icon: BookOpen,
    title: "Education Support",
    description:
      "Encourage community involvement in educational programs and learning opportunities.",
  },
];

const steps = [
  {
    number: "01",
    icon: CalendarCheck,
    title: "Discover Events",
    description:
      "Explore upcoming community events and find activities that match your interests.",
  },
  {
    number: "02",
    icon: Users,
    title: "Join the Community",
    description:
      "Choose an event and join other people who want to make a positive difference.",
  },
  {
    number: "03",
    icon: Heart,
    title: "Make an Impact",
    description:
      "Take part in community activities and contribute to a better environment for everyone.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-white">

      {/* Hero Section */}
      <section className="relative overflow-hidden px-5 py-24 text-white md:py-32">

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/about.png')",
          }}
        />

        {/* Teal Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-950/60 via-teal-900/45 to-teal-800/50" />

        {/* Decorative Elements */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-teal-500/10 blur-3xl" />

        <ScrollReveal className="relative mx-auto max-w-5xl text-center">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-teal-100 backdrop-blur">
            <HeartHandshake size={18} />
            About SevaConnect
          </div>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            Bringing People Together,
            <span className="mt-2 block text-teal-300">
              Creating Better Communities
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-teal-50/80 md:text-lg">
            SevaConnect is a community event platform that brings people
            together through volunteering, kindness, and meaningful social
            activities. Discover events, connect with others, and be a part
            of positive change.
          </p>

          <Link
            href="/upcoming-events"
            className="mt-9 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 font-semibold text-teal-900 shadow-lg transition hover:-translate-y-1 hover:bg-teal-50"
          >
            Explore Events
            <ArrowRight size={19} />
          </Link>
        </ScrollReveal>
      </section>

      {/* Introduction Section */}
      <section className="px-5 py-20 md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">

          <ScrollReveal>
            <div>
              <p className="mb-3 font-semibold uppercase tracking-widest text-teal-600 dark:text-teal-400">
                Who We Are
              </p>

              <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
                A Platform for People Who Care
              </h2>

              <p className="mt-6 leading-8 text-gray-600 dark:text-gray-400">
                We believe that meaningful change begins when people come
                together. SevaConnect provides a simple way to discover,
                organize, and participate in community service events.
              </p>

              <p className="mt-4 leading-8 text-gray-600 dark:text-gray-400">
                Whether it is cleaning a neighborhood, planting trees,
                donating essential items, or supporting education, every
                contribution can help create a positive impact.
              </p>

              <Link
                href="/upcoming-events"
                className="mt-7 inline-flex items-center gap-2 font-semibold text-teal-700 transition hover:gap-3 dark:text-teal-400"
              >
                Discover Our Events
                <ArrowRight size={18} />
              </Link>
            </div>
          </ScrollReveal>

          {/* Highlight Card */}
          <ScrollReveal delay={0.15} className="h-full">
            <div className="relative">
              <div className="rounded-3xl bg-gradient-to-br from-teal-700 to-teal-950 p-8 text-white shadow-xl sm:p-12">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15">
                  <HeartHandshake size={36} />
                </div>

                <h3 className="mt-8 text-2xl font-bold sm:text-3xl">
                  Together, We Can Make a Difference
                </h3>

                <p className="mt-5 leading-8 text-teal-50/80">
                  A small act of kindness can inspire others. By connecting
                  individuals through community activities, we can turn good
                  intentions into meaningful actions.
                </p>

                <div className="mt-9 flex items-center gap-3 border-t border-white/20 pt-6">
                  <Users size={22} className="text-teal-300" />
                  <span className="font-medium text-teal-50">
                    Every Person. Every Action. Every Community.
                  </span>
                </div>
              </div>

              <div className="absolute -bottom-5 -right-5 -z-10 h-32 w-32 rounded-full bg-teal-200/50 blur-2xl dark:bg-teal-700/20" />
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-gray-50 px-5 py-20 dark:bg-gray-900/60 md:py-24">
        <div className="mx-auto max-w-7xl">

          <ScrollReveal className="mb-12 text-center">
            <p className="mb-3 font-semibold uppercase tracking-widest text-teal-600 dark:text-teal-400">
              Our Purpose
            </p>

            <h2 className="text-3xl font-bold sm:text-4xl">
              Our Mission & Vision
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600 dark:text-gray-400">
              The ideas that guide us towards building stronger and more
              connected communities.
            </p>
          </ScrollReveal>

          <div className="grid gap-7 md:grid-cols-2">

            {/* Mission */}
            <ScrollReveal delay={0.1} className="h-full">
              <div className="h-full rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-950 sm:p-10">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-400">
                  <Target size={29} />
                </div>

                <h3 className="mt-6 text-2xl font-bold">
                  Our Mission
                </h3>

                <p className="mt-4 leading-8 text-gray-600 dark:text-gray-400">
                  To make community involvement easier by connecting people
                  with meaningful social events and encouraging everyone to
                  contribute through volunteering and collective action.
                </p>
              </div>
            </ScrollReveal>

            {/* Vision */}
            <ScrollReveal delay={0.25} className="h-full">
              <div className="h-full rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-950 sm:p-10">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-400">
                  <Eye size={29} />
                </div>

                <h3 className="mt-6 text-2xl font-bold">
                  Our Vision
                </h3>

                <p className="mt-4 leading-8 text-gray-600 dark:text-gray-400">
                  To build a connected community where people support one
                  another, take initiative, and work together towards a
                  kinder, cleaner, and better future.
                </p>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="px-5 py-20 md:py-24">
        <div className="mx-auto max-w-7xl">

          <ScrollReveal className="mb-12 text-center">
            <p className="mb-3 font-semibold uppercase tracking-widest text-teal-600 dark:text-teal-400">
              Our Activities
            </p>

            <h2 className="text-3xl font-bold sm:text-4xl">
              What We Do
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600 dark:text-gray-400">
              Explore different ways people can come together and contribute
              to their communities.
            </p>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {activities.map((activity, index) => {
              const Icon = activity.icon;

              return (
                <ScrollReveal
                  key={activity.title}
                  delay={index * 0.12}
                  className="h-full"
                >
                  <div className="group h-full rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-teal-300 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 dark:hover:border-teal-800">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-teal-100 text-teal-700 transition group-hover:bg-teal-700 group-hover:text-white dark:bg-teal-900/50 dark:text-teal-400 dark:group-hover:bg-teal-600">
                      <Icon size={28} />
                    </div>

                    <h3 className="mt-6 text-xl font-bold">
                      {activity.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">
                      {activity.description}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 px-5 py-20 dark:bg-gray-900/60 md:py-24">
        <div className="mx-auto max-w-7xl">

          <ScrollReveal className="mb-14 text-center">
            <p className="mb-3 font-semibold uppercase tracking-widest text-teal-600 dark:text-teal-400">
              Getting Started
            </p>

            <h2 className="text-3xl font-bold sm:text-4xl">
              How SevaConnect Works
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600 dark:text-gray-400">
              Becoming a part of a positive change is simple. Just follow
              these three steps.
            </p>
          </ScrollReveal>

          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <ScrollReveal
                  key={step.number}
                  delay={index * 0.15}
                  className="h-full"
                >
                  <div className="relative text-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-teal-700 text-white shadow-lg shadow-teal-700/20">
                      <Icon size={34} />
                    </div>

                    <p className="mt-6 font-bold tracking-widest text-teal-600 dark:text-teal-400">
                      STEP {step.number}
                    </p>

                    <h3 className="mt-2 text-xl font-bold">
                      {step.title}
                    </h3>

                    <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-gray-600 dark:text-gray-400">
                      {step.description}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="px-5 py-20 md:py-24">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-teal-800 to-teal-950 px-6 py-14 text-center text-white shadow-xl sm:px-12 sm:py-16">

          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-teal-400/10 blur-2xl" />

          <ScrollReveal className="relative">
            <HeartHandshake size={43} className="mx-auto text-teal-300" />

            <h2 className="mt-6 text-3xl font-bold sm:text-4xl">
              Be Part of Something Meaningful
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-teal-50/80">
              Discover community events, connect with volunteers, and
              contribute to positive change. Your journey towards making
              a difference can start today.
            </p>

            <Link
              href="/upcoming-events"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 font-semibold text-teal-900 transition hover:-translate-y-1 hover:bg-teal-50"
            >
              Explore Upcoming Events
              <ArrowRight size={19} />
            </Link>
          </ScrollReveal>

        </div>
      </section>

    </main>
  );
}
