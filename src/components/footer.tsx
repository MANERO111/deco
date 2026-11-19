"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Instagram,
  Facebook,
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#24211E] text-[#FAF8F5] border-t border-[#38332E]">
      {/* Value Badges Ribbon */}
      <div className="border-b border-[#38332E] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#C86D51] shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white uppercase tracking-wider">
                White Glove Delivery
              </h5>
              <p className="text-[11px] text-[#A89F95] mt-0.5">
                In-room placement & package removal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#C86D51] shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white uppercase tracking-wider">
                100-Day In-Home Trial
              </h5>
              <p className="text-[11px] text-[#A89F95] mt-0.5">
                Free returns if you don&apos;t love it
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#C86D51] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white uppercase tracking-wider">
                10-Year Frame Warranty
              </h5>
              <p className="text-[11px] text-[#A89F95] mt-0.5">
                Built to last generations of living
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#C86D51] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white uppercase tracking-wider">
                Custom Styling Concierge
              </h5>
              <p className="text-[11px] text-[#A89F95] mt-0.5">
                Complimentary interior design advice
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#FAF8F5] text-[#24211E] flex items-center justify-center font-serif text-lg font-bold">
                D
              </div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white">
                DECO FLOWER CASA
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#A89F95] max-w-sm leading-relaxed font-light">
              Elevating daily living through clean Scandinavian lines, natural European oak, tactile linens, and honest design integrity.
            </p>

            <div className="pt-2 space-y-2 text-xs text-[#A89F95]">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C86D51]" />
                Casa Flagship Atelier, 142 Design Blvd
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C86D51]" />
                +1 (800) DECO-CASA (Mon-Sat, 9am - 7pm)
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C86D51]" />
                concierge@decoflowercasa.com
              </p>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3 pt-3">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#C86D51] text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#C86D51] text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Catalog Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#E8DCC4] mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A89F95]">
              <li>
                <Link
                  href="/products?category=Home%20Decor%20%26%20Accessories"
                  className="hover:text-white transition-colors"
                >
                  Home Decor & Accessories
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Desks%20%26%20Desk%20Chairs"
                  className="hover:text-white transition-colors"
                >
                  Desks & Desk Chairs
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Rugs%20%26%20Home%20Textiles"
                  className="hover:text-white transition-colors"
                >
                  Rugs & Home Textiles
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Lighting"
                  className="hover:text-white transition-colors"
                >
                  Lighting & Pendants
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Sofas%20%26%20Armchairs"
                  className="hover:text-white transition-colors"
                >
                  Sofas & Armchairs
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Storage%20%26%20Organization"
                  className="hover:text-white transition-colors"
                >
                  Storage & Sideboards
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#E8DCC4] mb-4">
              Client Care
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A89F95]">
              <li>
                <Link href="/aboutUs" className="hover:text-white transition-colors">
                  About Deco Flower Casa
                </Link>
              </li>
              <li>
                <Link href="/aboutUs" className="hover:text-white transition-colors">
                  Design Consultation
                </Link>
              </li>
              <li>
                <Link href="/orders" className="hover:text-white transition-colors">
                  Order Tracking
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Shipping & Delivery Info
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  100-Day Returns Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Care & Maintenance Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Newsletter in Footer */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#E8DCC4] mb-4">
              Private Releases
            </h4>
            <p className="text-xs text-[#A89F95] leading-relaxed mb-3">
              Receive limited capsule invitations and seasonal wood swatch previews.
            </p>
            {subscribed ? (
              <p className="text-xs text-green-400 font-medium">
                Thank you for subscribing!
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-[#7A726A] focus:outline-none focus:border-[#C86D51]"
                />
                <button
                  type="submit"
                  className="w-full py-2 px-3 rounded-xl bg-[#C86D51] hover:bg-[#A9563C] text-white text-xs font-semibold tracking-wider uppercase transition-colors"
                >
                  Join Circle
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#38332E] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A726A]">
          <p>
            © {new Date().getFullYear()} Deco Flower Casa. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Sustainability Report
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}