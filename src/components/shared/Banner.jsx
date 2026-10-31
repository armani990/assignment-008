
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  HeartHandshake,
  ArrowRight,
  Calendar,
  Target,
} from "lucide-react";

const bannerImages = [
  "/images/pexels-capturedbynadim-39038089.jpg",
  "/images/pexels-capturedbynadim-39038091.jpg",
  "/images/pexels-jbigallery-39215343.jpg",
  "/images/roman-synkevych-5wJ2GiYSifA-unsplash.jpg",
];

const slides = [
  bannerImages[bannerImages.length - 1],
  ...bannerImages,
  bannerImages[0],
];

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleTransitionEnd = () => {
    if (currentIndex === slides.length - 1) {
      setTransitionEnabled(false);
      setCurrentIndex(1);
    }
  };

  useEffect(() => {
    if (!transitionEnabled) {
      const timeout = setTimeout(() => {
        setTransitionEnabled(true);
      }, 50);

      return () => clearTimeout(timeout);
    }
  }, [transitionEnabled]);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">

      {/* Background Image Slider */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="flex h-full"
          onTransitionEnd={handleTransitionEnd}
          style={{
            width: `${slides.length * 100}%`,
            height: "100%",
            transform: `translateX(-${currentIndex * (100 / slides.length)}%)`,
            transition: transitionEnabled
              ? "transform 750ms cubic-bezier(0.22, 1, 0.36, 1)"
              : "none",
          }}
        >
          {slides.map((image, index) => (
            <div
              key={index}
              className="h-full"
              style={{
                width: `${100 / slides.length}%`,
                flexShrink: 0,
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
          ))}
        </div>
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-teal-950/85 via-teal-900/70 to-teal-800/75" />

      {/* Pattern Overlay */}
      <div className="absolute inset-0 z-10 bg-[url('/images/pattern.png')] opacity-5" />

      {/* Banner Content */}
      <div className="relative z-20 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white/90 text-sm font-medium mb-8 animate-fade-in-up">
            <HeartHandshake className="h-4 w-4 text-teal-300" />
            <span>
              Community Care Platform • Connect & Make a Difference
            </span>
          </div>

          {/* Main Heading */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 animate-fade-in-up"
            style={{ animationDelay: "100ms" }}
          >
            Build Stronger
            <br />
            <span className="text-teal-300">
              Communities Together
            </span>
          </h1>

          {/* Description */}
          <p
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            Join thousands of volunteers creating meaningful impact. Discover
            events, connect with causes you care about, and be the change your
            community needs.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
            style={{ animationDelay: "300ms" }}
          >
            <Button
              render={<Link href="/upcoming-events" />}
              nativeButton={false}
              size="lg"
              className="w-full sm:w-auto gap-2 bg-teal-600 hover:bg-teal-500 text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-teal-500/30"
            >
              <Calendar className="h-5 w-5" />
              Explore Events
              <ArrowRight className="h-5 w-5" />
            </Button>

            <Button
              render={<Link href="/create-event" />}
              nativeButton={false}
              size="lg"
              variant="outline"
              className="w-full sm:w-auto gap-2 border-white/50 bg-white/10 text-white hover:bg-white hover:text-teal-900 px-8 py-4 text-lg font-semibold rounded-xl transition-all"
            >
              <Target className="h-5 w-5" />
              Create an Event
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}
