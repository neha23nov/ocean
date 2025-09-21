// src/pages/MarineGallery.jsx
import React, { useEffect } from "react";

// Reusable card for each species
const SpeciesCard = ({ image, title, desc }) => (
  <div className="group relative overflow-hidden rounded-lg snap-start flex-shrink-0 w-64 md:w-72">
    <img
      src={image}
      alt={title}
      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
    <div className="absolute bottom-0 left-0 p-4">
      <h3 className="font-bold text-white text-base">{title}</h3>
      <p className="text-sm text-slate-300">{desc}</p>
    </div>
  </div>
);

// Section (Marine Arthropods, Sharks, etc.)
const SpeciesSection = ({ title, count, species }) => (
  <section>
    <div className="group flex items-center gap-4 mb-6 px-4 animate-on-scroll cursor-pointer">
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white transition-colors group-hover:text-primary">
        {title}
      </h2>
      <span className="text-sm font-medium bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full transition-colors group-hover:bg-primary group-hover:text-white">
        {count}
      </span>
    </div>

    <div className="scroll-container rounded-xl p-4">
      <div className="flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto custom-scrollbar pb-2">
        {species.map((sp, idx) => (
          <SpeciesCard key={idx} {...sp} />
        ))}

        {/* View All card */}
        <a
          href="#"
          className="snap-end flex-shrink-0 w-64 md:w-72 flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-800/50 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
        >
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-white mb-4">
            <svg
              className="h-8 w-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </div>
          <span className="text-lg font-semibold text-slate-800 dark:text-slate-200">
            View All
          </span>
        </a>
      </div>
    </div>
  </section>
);

export default function MarineGallery() {
  // IntersectionObserver animation logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.5 }
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Dummy dataset for each section
  const marineArthropods = [
    {
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD9S3B6i7J7f6K0-XJ-g3A3j3Z9l5K6J2i6g0E9g0S5B2i3k4N8f8f9h9h0k1j1m2n3o4p5q6r7s8t9u0v1w2x",
      title: "Spiny Lobster",
      desc: "Nocturnal scavenger",
    },
    {
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m0n",
      title: "Horseshoe Crab",
      desc: "Living fossil",
    },
  ];

  const sharks = [
    {
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCyeBemHg2ZJo6OOCKKMbv-4E1QpndfRN0yc7x25Az4kKTdniJAfO9WO2wIz-Pex0LtX7uK8lk36bFJZ79PThTlL9FvAHOfglssv5h4Fu4BiAgzYQr53iEMhOR_-d8FNtziCP0quV4sVYkKKU1PbNEiHCkC-L4e1cCfKIw9jGb0wiHmLKx5gsGn4YbZK41tB5LOi-LVqjAeqFozmNmWjwwDmv1BwieByrF7Danx65V9GiSnUmwsggSWTR3kWJPbxXWof4bU0mE6GGKh",
      title: "Great White Shark",
      desc: "Apex predator",
    },
    {
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB1x2y3z4a5b6c7d8e9f0g1h2i3j4k5l6m7n8o9p0q1r2s3t4u5v6w7x8y9z0a1b2c3d4e5f6g7h8i9j0k",
      title: "Hammerhead Shark",
      desc: "Distinctive head shape",
    },
    {
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9",
      title: "Whale Shark",
      desc: "Largest known fish",
    },
  ];

  // Example — you can add Marine Mammals, Coral Reefs, etc.
  const marineMammals = [
    {
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCGVWFknepVbtVjih_ESUeCLUlTGX3VPHLhOQE6HmBX1EJdwjpg-lxv-wzxYPU3f7r7-sjLx6cNF7iSysusMWi9ZM5KYOqVTtowhpSzdAni0fKcPtYW09US0uJvQ4VB0B2tOBGo2DMbEq5dkHlqLb4UXApkw8ukKRfDpGpmY22XTnydS3g5TCTuk7rDZ84aIUwqtVMT4AYhb3cck2S3HRtpS4ryVC2Z29WW3VZlXYpNjjb_co1s1ENzaQLdZ_ujDAwL_KAUTqywhqtI",
      title: "Blue Whale",
      desc: "Largest animal on Earth",
    },
    {
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC1x2y3z4a5b6c7d8e9f0g1h2i3j4k5l6m7n8o9p0q1r2s3t4u5v6w7x8y9z0a1b2c3d4e5f6g7h8i9j0k",
      title: "Dolphin",
      desc: "Highly intelligent",
    },
  ];

  return (
    <main className="font-display bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-200 min-h-screen px-4 md:px-10 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2">
            Marine Biodiversity Gallery
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mb-6">
            Explore a curated collection of marine life, from vibrant coral reefs
            to the mysterious creatures of the deep sea.
          </p>
        </div>

        <div className="space-y-16">
          <SpeciesSection
            title="Marine Arthropods"
            count={marineArthropods.length}
            species={marineArthropods}
          />
          <SpeciesSection
            title="Sharks"
            count={sharks.length}
            species={sharks}
          />
          <SpeciesSection
            title="Marine Mammals"
            count={marineMammals.length}
            species={marineMammals}
          />
        </div>
      </div>
    </main>
  );
}