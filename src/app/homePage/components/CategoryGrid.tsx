"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CategoryTile {
  name: string;
  tagline: string;
  count: string;
  image: string;
  link: string;
  span?: string;
}

const CATEGORIES: CategoryTile[] = [
  {
    name: "Home Decor & Accessories",
    tagline: "Vases, Sculptural Mirrors & Stoneware",
    count: "48+ Pieces",
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
    link: "/products?category=Home%20Decor%20%26%20Accessories",
    span: "col-span-1 md:col-span-2 lg:col-span-2 row-span-2",
  },
  {
    name: "Sofas & Armchairs",
    tagline: "Belgian Linen & Cozy Bouclé",
    count: "32+ Models",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
    link: "/products?category=Sofas%20%26%20Armchairs",
    span: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
  },
  {
    name: "Desks & Desk Chairs",
    tagline: "Oak Standing Desks & Task Seating",
    count: "26+ Designs",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80",
    link: "/products?category=Desks%20%26%20Desk%20Chairs",
    span: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
  },
  {
    name: "Lighting",
    tagline: "Pendants, Fluted Glass & Alabaster",
    count: "38+ Fixtures",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
    link: "/products?category=Lighting",
    span: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
  },
  {
    name: "Rugs & Home Textiles",
    tagline: "Hand-Knotted Wool & French Flax",
    count: "54+ Textiles",
    image: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=80",
    link: "/products?category=Rugs%20%26%20Home%20Textiles",
    span: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
  },
  {
    name: "Storage & Organization",
    tagline: "Cane Webbing Sideboards & Modular Shelves",
    count: "29+ Solutions",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80",
    link: "/products?category=Storage%20%26%20Organization",
    span: "col-span-1 md:col-span-2 lg:col-span-2 row-span-1",
  },
];

export default function CategoryGrid() {
  return (
    <section className="py-16 sm:py-24 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C86D51]">
              Explore By Room & Category
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#2C2825] mt-2">
              Designed For Intentional Living
            </h2>
            <p className="text-sm sm:text-base text-[#6B655F] mt-2 max-w-xl">
              From organic living room centerpieces to ergonomic home office studios, discover furniture curated for calm simplicity.
            </p>
          </div>
          <Link
            href="/products"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-[#2C2825] hover:text-[#C86D51] transition-colors group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[240px]">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              href={cat.link}
              className={`group relative overflow-hidden rounded-3xl bg-[#FAF8F5] border border-[#E8DFD8] shadow-sm hover:shadow-xl transition-all duration-500 ${
                cat.span || ""
              }`}
            >
              {/* Image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/5 group-hover:from-black/85 transition-colors" />

              {/* Text content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#FAF8F5]/80 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                    {cat.count}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-[#F4EFEB] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#E8DFD8] mt-1 font-light line-clamp-1">
                    {cat.tagline}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
