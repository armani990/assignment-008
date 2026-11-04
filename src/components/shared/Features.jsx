
import Link from "next/link";
import ScrollReveal from "@/components/shared/ScrollReveal";
import {
  CalendarDays,
  UsersRound,
  HeartHandshake,
  ArrowUpRight,
} from "lucide-react";

const features = [
  {
    number: "01",
    icon: CalendarDays,
    title: "Discover Events",
    description:
      "Find meaningful community events around you. Explore cleanup drives, tree plantations, donation campaigns and more.",
    link: "/upcoming-events",
    linkText: "Explore Events",
  },
  {
    number: "02",
    icon: UsersRound,
    title: "Volunteer Together",
    description:
      "Connect with people who care about the same causes. Join hands with your community and make every effort count.",
    link: "/upcoming-events",
    linkText: "Join a Community",
  },
  {
    number: "03",
    icon: HeartHandshake,
    title: "Create an Impact",
    description:
      "Turn your ideas into meaningful action. Create your own events and inspire others to contribute to a better community.",
    link: "/create-event",
    linkText: "Create an Event",
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">

        {/* Section Heading */}
        <ScrollReveal className="max-w-2xl mx-auto text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-sm font-semibold mb-5">
            <HeartHandshake className="h-4 w-4" />
            What We Offer
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-5">
            Small Actions,
            <span className="text-teal-600 dark:text-teal-400">
              {" "}Big Community Impact
            </span>
          </h2>

          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            Making a difference starts with taking action. Discover how
            SevaConnect helps you connect, participate and create positive
            change in your community.
          </p>
        </ScrollReveal>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <ScrollReveal
                key={feature.number}
                delay={index * 0.15}
                className="h-full"
              >
                <div
                  className="group relative flex h-full flex-col p-8 rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-2 hover:border-teal-500/50 hover:shadow-xl hover:shadow-teal-500/5"
                >
                  {/* Card Number */}
                  <span className="absolute top-8 right-8 text-sm font-bold text-muted-foreground/40">
                    {feature.number}
                  </span>

                  {/* Icon */}
                  <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 mb-7 transition-colors duration-300 group-hover:bg-teal-600 group-hover:text-white">
                    <Icon className="h-7 w-7" />
                  </div>

                  {/* Card Content */}
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed mb-8">
                    {feature.description}
                  </p>

                  {/* Card Link */}
                  <Link
                    href={feature.link}
                    className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-teal-600 dark:text-teal-400 hover:gap-3 transition-all duration-300"
                  >
                    {feature.linkText}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
