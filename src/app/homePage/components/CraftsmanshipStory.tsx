"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, TreePine, Award, ShieldCheck, HeartHandshake } from "lucide-react";

export default function CraftsmanshipStory() {
  return (
    <section className="py-16 sm:py-24 bg-[#2C2825] text-[#FAF8F5] overflow-hidden relative">
      {/* Decorative subtle background circle */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#C86D51]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#758A75]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Narrative (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[#E8DCC4] text-xs font-medium tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              The Deco Flower Casa Philosophy
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-[#FAF8F5]">
              Form Meets Natural Serenity in Every Curve.
            </h2>

            <p className="text-sm sm:text-base text-[#D8CCC2] leading-relaxed font-light">
              Founded on the Nordic belief that your home is the sanctuary of your soul, Deco Flower Casa brings together honest materials: European oak, Belgian flax linen, hand-shaped clay, and recycled metals.
            </p>

            {/* Feature Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#E8DCC4]">
                  <TreePine className="w-5 h-5 text-[#C86D51]" />
                  <h4 className="font-semibold text-sm">FSC Certified Oak</h4>
                </div>
                <p className="text-xs text-[#9B8777] leading-relaxed">
                  Every grain is sustainably grown, air-seasoned, and hand-finished with non-toxic natural plant oils.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#E8DCC4]">
                  <Award className="w-5 h-5 text-[#C86D51]" />
                  <h4 className="font-semibold text-sm">Artisan Heritage</h4>
                </div>
                <p className="text-xs text-[#9B8777] leading-relaxed">
                  Crafted by multi-generational woodworkers and ceramic masters who treat each joint with precision.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#E8DCC4]">
                  <ShieldCheck className="w-5 h-5 text-[#C86D51]" />
                  <h4 className="font-semibold text-sm">Built to Last Generations</h4>
                </div>
                <p className="text-xs text-[#9B8777] leading-relaxed">
                  Rigorous durability testing ensures all frames withstand family life for decades to come.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#E8DCC4]">
                  <HeartHandshake className="w-5 h-5 text-[#C86D51]" />
                  <h4 className="font-semibold text-sm">Transparent Pricing</h4>
                </div>
                <p className="text-xs text-[#9B8777] leading-relaxed">
                  Direct from workshop to your doorstep with no middlemen markups or compromises.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/aboutUs"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FAF8F5] text-[#2C2825] hover:bg-[#C86D51] hover:text-white transition-all duration-300 text-xs font-semibold uppercase tracking-wider shadow-lg"
              >
                Read Our Story
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Visual Composition (6 cols) */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80"
                  alt="Artisan wood carving"
                  className="w-full h-full object-cover filter brightness-95"
                />
              </div>
              <div className="bg-[#1E1C1A] rounded-3xl p-6 border border-white/10 text-center">
                <span className="font-serif text-3xl font-bold text-[#C86D51]">
                  100%
                </span>
                <p className="text-xs text-[#D8CCC2] mt-1 font-medium">
                  Plastic-Free Recyclable Packaging
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="bg-[#1E1C1A] rounded-3xl p-6 border border-white/10 text-center">
                <span className="font-serif text-3xl font-bold text-[#E8DCC4]">
                  10 Yrs
                </span>
                <p className="text-xs text-[#D8CCC2] mt-1 font-medium">
                  Structural Craftsmanship Guarantee
                </p>
              </div>
              <div className="rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1594913785162-e678a0c23ee9?auto=format&fit=crop&w=800&q=80"
                  alt="Ceramic pottery and tactile stone"
                  className="w-full h-full object-cover filter brightness-95"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
