"use client";
import React from "react";
import HeroSection from "./components/hero";
import CategoryGrid from "./components/CategoryGrid";
import FeaturedShowcase from "./components/FeaturedShowcase";
import ShopTheLook from "./components/ShopTheLook";
import CraftsmanshipStory from "./components/CraftsmanshipStory";
import FAQ from "./components/faq";
import Newsletter from "./components/Newsletter";

export default function Home() {
  return (
    <div className="bg-[#FDFBF7] min-h-screen">
      {/* 1. Hero Lifestyle Slider with value propositions */}
      <HeroSection />

      {/* 2. Visual Rooms & Categories Grid (6 core categories) */}
      <CategoryGrid />

      {/* 3. New Arrivals & Best Sellers (Sofas, Armchairs & Decor) */}
      <FeaturedShowcase
        tag="Atelier Spotlight"
        title="Iconic Seating & Living Room Centerpieces"
        subtitle="Designed for deep relaxation and everyday modern elegance."
        categoryFilter={5}
        viewAllLink="/products?category=Sofas%20%26%20Armchairs"
      />

      {/* 4. Interactive 'Shop The Look' Room Scene with Hotspots */}
      <ShopTheLook />

      {/* 5. Ergonomic Studio & Workspaces */}
      <FeaturedShowcase
        tag="Focus & Flow"
        title="Modern Desks & Studio Workspaces"
        subtitle="Solid oak standing desks and task seating tailored for creative minds."
        categoryFilter={2}
        viewAllLink="/products?category=Desks%20%26%20Desk%20Chairs"
      />

      {/* 6. Sustainable Craftsmanship Philosophy */}
      <CraftsmanshipStory />

      {/* 7. Lighting, Rugs & Tactile Accents */}
      <FeaturedShowcase
        tag="Ambient Living"
        title="Sculptural Lighting & Hand-Knotted Textiles"
        subtitle="Layer your interior with warm radiant light and plush New Zealand wool."
        categoryFilter={4}
        viewAllLink="/products?category=Lighting"
      />

      {/* 8. Frequently Asked Questions (Delivery, Warranty, Materials) */}
      <FAQ />

      {/* 9. VIP Casa Club Newsletter */}
      <Newsletter />
    </div>
  );
}
