
import Link from "next/link";
import { HeartHandshake, Mail, ArrowUpRight, MapPin, Phone } from "lucide-react";

import { FaFacebookF, FaInstagram } from "react-icons/fa";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Upcoming Events", href: "/upcoming-events" },
  { name: "About Us", href: "/about" },
];

const supportLinks = [
  { name: "Contact Us", href: "mailto:hello@sevaconnect.com" },
  { name: "Community Guidelines", href: "#" },
  { name: "Privacy Policy", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto max-w-7xl px-5 pt-16 pb-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-700 text-white">
                <HeartHandshake size={23} />
              </span>

              <span className="text-2xl font-bold text-foreground">
                Seva<span className="text-teal-600">Connect</span>
              </span>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">
              Bringing people together through kindness, volunteering, and
              meaningful community events. Together, we can create a positive
              impact on the world around us.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="transition-all duration-300 hover:scale-110 hover:text-teal-500"
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="transition-all duration-300 hover:scale-110 hover:text-teal-500"
              >
                <FaInstagram size={20} />
              </a>

              <a
                href="mailto:hello@sevaconnect.com"
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:border-teal-600 hover:bg-teal-700 hover:text-white"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-base font-semibold text-foreground">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition hover:text-teal-600"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Support */}
          <div>
            <h3 className="mb-5 text-base font-semibold text-foreground">
              Community Support
            </h3>

            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground transition hover:text-teal-600"
                  >
                    {link.name}
                    <ArrowUpRight size={13} />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail size={16} className="text-teal-600" />
                <a
                  href="mailto:hello@sevaconnect.com"
                  className="transition hover:text-teal-600"
                >
                  hello@sevaconnect.com
                </a>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin size={16} className="text-teal-600" />
                <span>Building Better Communities</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-7 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SevaConnect. All rights reserved.
          </p>

          <p className="text-sm text-muted-foreground">
            Made with <span className="text-red-500">♥</span> for a better
            community.
          </p>
        </div>
      </div>
    </footer>
  );
}
