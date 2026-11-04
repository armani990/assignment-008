
import { Mail, Send } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";

export default function Newsletter() {
  return (
    <section className="bg-background px-5 py-20 md:py-24">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-teal-700 px-6 py-14 text-center md:px-12 md:py-20">

        <ScrollReveal className="mx-auto max-w-2xl">

          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-white">
            <Mail size={32} />
          </div>

          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-teal-200">
            Stay Connected
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Make a Difference, Stay Updated
          </h2>

          <p className="mt-5 leading-relaxed text-teal-100">
            Get the latest community events, volunteering opportunities,
            and inspiring stories delivered straight to your inbox.
          </p>

          {/* Newsletter Form - UI Only */}
          <div className="mx-auto mt-9 flex max-w-xl flex-col gap-3 rounded-2xl bg-white p-2 sm:flex-row sm:rounded-full">

            <input
              type="email"
              placeholder="Enter your email address"
              className="min-w-0 flex-1 rounded-full px-5 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400"
            />

            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-full bg-teal-700 px-7 py-3 font-semibold text-white transition-colors hover:bg-teal-800"
            >
              Subscribe
              <Send size={16} />
            </button>

          </div>

          <p className="mt-5 text-xs text-teal-200">
            Stay inspired. Stay involved. Be the change.
          </p>

        </ScrollReveal>

      </div>
    </section>
  );
}
