
import Image from "next/image";
import ScrollReveal from "@/components/shared/ScrollReveal";

const galleryImages = [
  {
    src: "/images/gallery/community-cleanup.jpg",
    title: "Community Cleanup",
    category: "Environment",
  },
  {
    src: "/images/gallery/food-donation.jpg",
    title: "Food Donation",
    category: "Helping People",
  },
  {
    src: "/images/gallery/tree-planting.jpg",
    title: "Tree Plantation",
    category: "Environment",
  },
  {
    src: "/images/gallery/volunteer-work.jpg",
    title: "Volunteer Together",
    category: "Volunteering",
  },
  {
    src: "/images/gallery/education.jpg",
    title: "Education Support",
    category: "Education",
  },
  {
    src: "/images/gallery/community-event.jpg",
    title: "Community Event",
    category: "Community",
  },
];

export default function Gallery() {
  return (
    <section className="bg-background py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5">

        {/* Section Heading */}
        <ScrollReveal className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-teal-600">
            Our Community Moments
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Moments That Make a Difference
          </h2>

          <p className="mt-4 text-muted-foreground">
            Every small act of kindness creates a lasting impact.
            Explore the moments that bring our community together.
          </p>
        </ScrollReveal>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((image, index) => (
            <ScrollReveal
              key={image.title}
              delay={index * 0.12}
              initialScale={0.96}
              className="h-full"
            >
              <div className="group relative h-72 overflow-hidden rounded-2xl bg-muted shadow-sm">

                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                <div className="absolute bottom-0 left-0 p-6">
                  <p className="mb-2 text-xs font-medium uppercase tracking-wider text-teal-300">
                    {image.category}
                  </p>

                  <h3 className="text-xl font-semibold text-white">
                    {image.title}
                  </h3>
                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
