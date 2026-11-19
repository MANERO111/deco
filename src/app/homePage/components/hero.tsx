"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Compass, ShieldCheck } from "lucide-react";

interface Slide {
  id: number;
  tag: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  image: string;
  accentBadge?: string;
}

const HERO_SLIDES: Slide[] = [
  {
    id: 1,
    tag: "Spring Atelier Collection 2026",
    title: "Timeless Comfort, Organic Warmth.",
    subtitle: "Curated modern furniture & home decor shaped by Scandinavian simplicity and artisan craftsmanship.",
    ctaText: "Shop New Arrivals",
    ctaLink: "/products?category=Sofas%20%26%20Armchairs",
    secondaryCtaText: "Explore Lookbook",
    secondaryCtaLink: "/products?category=Home%20Decor%20%26%20Accessories",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1920&q=85",
    accentBadge: "New Season Launch",
  },
  {
    id: 2,
    tag: "Work In Harmony",
    title: "Ergonomic Studios Built for Focus.",
    subtitle: "Solid oak standing desks, supportive bouclé chairs, and architectural desktop organizers that inspire.",
    ctaText: "Design Your Workspace",
    ctaLink: "/products?category=Desks%20%26%20Desk%20Chairs",
    secondaryCtaText: "View Office Chairs",
    secondaryCtaLink: "/products?category=Desks%20%26%20Desk%20Chairs&subcategory=Ergonomic%20%26%20Task%20Chairs",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1920&q=85",
    accentBadge: "Ergonomic Certified",
  },
  {
    id: 3,
    tag: "Warm Ambient Lighting",
    title: "Sculptural Illuminations for Peaceful Nights.",
    subtitle: "From pleated paper lanterns to brushed brass pendants and cordless alabaster table lamps.",
    ctaText: "Discover Lighting",
    ctaLink: "/products?category=Lighting",
    secondaryCtaText: "Table Lamps",
    secondaryCtaLink: "/products?category=Lighting&subcategory=Table%20%26%20Desk%20Lamps",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1920&q=85",
    accentBadge: "Ambient Highlights",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative w-full overflow-hidden bg-[#2C2825]">
      {/* Background Images with Crossfade */}
      <div className="relative h-[560px] sm:h-[620px] lg:h-[720px] w-full">
        {HERO_SLIDES.map((item, idx) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
            style={{
              transitionProperty: "opacity, transform",
              transitionDuration: "1200ms",
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover object-center filter brightness-[0.82]"
            />
            {/* Elegant Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1A1816]/90 via-[#1A1816]/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1816]/80 via-transparent to-black/20" />
          </div>
        ))}

        {/* Content Container */}
        <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <div className="max-w-2xl space-y-5 text-white">
            {/* Tag badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[#FAF8F5] text-xs font-medium tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[#E8DCC4]" />
              <span>{slide.tag}</span>
              {slide.accentBadge && (
                <>
                  <span className="w-1 h-1 rounded-full bg-[#E8DCC4]" />
                  <span className="text-[#E8DCC4]">{slide.accentBadge}</span>
                </>
              )}
            </div>

            {/* Title */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-semibold leading-[1.12] tracking-tight text-[#FAF8F5]">
              {slide.title}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-[#E8DFD8] leading-relaxed max-w-xl font-light">
              {slide.subtitle}
            </p>

            {/* Call to Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                href={slide.ctaLink}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#C86D51] hover:bg-[#A9563C] text-white text-sm font-semibold tracking-wide shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              >
                {slide.ctaText}
                <ArrowRight className="w-4 h-4" />
              </Link>

              {slide.secondaryCtaText && slide.secondaryCtaLink && (
                <Link
                  href={slide.secondaryCtaLink}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-[#FAF8F5] text-sm font-medium tracking-wide border border-white/20 transition-all duration-300"
                >
                  {slide.secondaryCtaText}
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Carousel controls & pagination */}
        <div className="absolute z-20 bottom-8 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Indicators */}
          <div className="flex items-center gap-2.5">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  idx === currentSlide
                    ? "w-8 bg-[#C86D51]"
                    : "w-2 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>

          {/* Navigation arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1))
              }
              aria-label="Previous slide"
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-md border border-white/20 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() =>
                setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
              }
              aria-label="Next slide"
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-md border border-white/20 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Trust & Craftsmanship banner beneath hero */}
      <div className="bg-[#FAF8F5] border-b border-[#E8DFD8] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#E8DFD8] text-[#2C2825] flex items-center justify-center font-serif text-sm font-semibold">
              01
            </div>
            <div>
              <p className="text-xs font-semibold text-[#2C2825]">Sustainably Sourced</p>
              <p className="text-[11px] text-[#9B8777]">FSC-certified timber & organic cotton</p>
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#E8DFD8] text-[#2C2825] flex items-center justify-center font-serif text-sm font-semibold">
              02
            </div>
            <div>
              <p className="text-xs font-semibold text-[#2C2825]">Flat-pack & Modular</p>
              <p className="text-[11px] text-[#9B8777]">Effortless assembly in minutes</p>
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#E8DFD8] text-[#2C2825] flex items-center justify-center font-serif text-sm font-semibold">
              03
            </div>
            <div>
              <p className="text-xs font-semibold text-[#2C2825]">100-Day In-Home Trial</p>
              <p className="text-[11px] text-[#9B8777]">Love it in your home or return free</p>
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#E8DFD8] text-[#2C2825] flex items-center justify-center font-serif text-sm font-semibold">
              04
            </div>
            <div>
              <p className="text-xs font-semibold text-[#2C2825]">Carbon Neutral Shipping</p>
              <p className="text-[11px] text-[#9B8777]">Eco-conscious protective boxing</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}