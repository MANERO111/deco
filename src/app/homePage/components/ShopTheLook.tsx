"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Eye, ShoppingCart, Plus, Check, Star } from "lucide-react";
import { useProducts, Product } from "@/hooks/useProducts";
import { useCart } from "@/contexts/CartContext";
import ProductModal from "@/components/products/ProductModal";

interface Hotspot {
  id: number;
  productId: number;
  x: number; // percentage from left
  y: number; // percentage from top
  label: string;
}

const ROOM_HOTSPOTS: Hotspot[] = [
  {
    id: 1,
    productId: 501, // Haven Sofa
    x: 48,
    y: 62,
    label: "Haven Modular Linen Sofa",
  },
  {
    id: 2,
    productId: 401, // Kyoto Rattan Pendant
    x: 42,
    y: 20,
    label: "Kyoto Rattan Dome Pendant",
  },
  {
    id: 3,
    productId: 301, // Atlas Wool Rug
    x: 60,
    y: 84,
    label: "Atlas Hand-Knotted Wool Rug",
  },
  {
    id: 4,
    productId: 101, // Aura Vase
    x: 26,
    y: 55,
    label: "Aura Sculptural Ceramic Vase",
  },
];

export default function ShopTheLook() {
  const { products } = useProducts();
  const { addToCart } = useCart();
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(ROOM_HOTSPOTS[0]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const matchedProduct = products.find((p) => p.id === activeHotspot?.productId);

  const handleAddCurrent = async () => {
    if (!matchedProduct) return;
    const res = await addToCart(matchedProduct, 1);
    if (res.success) {
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C86D51]">
            Curated Living Concept
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#2C2825] mt-2">
            Shop The Scandinavian Sanctuary
          </h2>
          <p className="text-sm sm:text-base text-[#6B655F] mt-3">
            Click on the interactive markers below to discover how each piece works together to create a calm, cohesive sanctuary.
          </p>
        </div>

        {/* Main Grid: Interactive Canvas + Live Product Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Canvas with Hotspots (8 cols) */}
          <div className="lg:col-span-8 relative rounded-3xl overflow-hidden shadow-xl border border-[#E8DFD8] aspect-[16/10] bg-[#2C2825]">
            <img
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85"
              alt="Scandinavian Living Room"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/10" />

            {/* Hotspot Markers */}
            {ROOM_HOTSPOTS.map((hotspot) => {
              const isActive = activeHotspot?.id === hotspot.id;
              return (
                <div
                  key={hotspot.id}
                  style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
                >
                  <button
                    onClick={() => setActiveHotspot(hotspot)}
                    aria-label={hotspot.label}
                    className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? "bg-[#C86D51] text-white scale-110 shadow-lg ring-4 ring-white/60"
                        : "bg-white/90 text-[#2C2825] hover:bg-white hover:scale-105 shadow-md"
                    }`}
                  >
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C86D51] opacity-30" />
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                  </button>

                  {/* Tooltip on hover */}
                  <div className="hidden group-hover:block absolute left-1/2 -translate-x-1/2 bottom-full mb-2 whitespace-nowrap bg-[#2C2825]/90 backdrop-blur-md text-white text-[11px] font-medium py-1 px-3 rounded-lg pointer-events-none shadow-md">
                    {hotspot.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Product Card (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD8] shadow-lg flex flex-col justify-between">
            {matchedProduct ? (
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#C86D51] bg-[#F4EFEB] px-2.5 py-1 rounded-full">
                  Featured In Scene
                </span>

                <div className="mt-4 relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#FAF8F5]">
                  <img
                    src={matchedProduct.image_url}
                    alt={matchedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="mt-5">
                  <div className="flex items-center gap-1 text-amber-500 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                    <span className="text-xs text-[#9B8777] ml-1 font-medium">
                      5.0 (24 reviews)
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#2C2825]">
                    {matchedProduct.name}
                  </h3>
                  <p className="text-xs text-[#6B655F] mt-2 leading-relaxed">
                    {matchedProduct.description}
                  </p>

                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-[#2C2825]">
                      ${matchedProduct.discounted_price || matchedProduct.price || matchedProduct.original_price}
                    </span>
                    {matchedProduct.discounted_price && (
                      <span className="text-sm text-[#9B8777] line-through">
                        ${matchedProduct.original_price}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex items-center gap-3">
                  <button
                    onClick={handleAddCurrent}
                    disabled={isAdded}
                    className={`flex-1 py-3 px-4 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-sm ${
                      isAdded
                        ? "bg-green-600 text-white"
                        : "bg-[#2C2825] hover:bg-[#C86D51] text-white"
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setSelectedProduct(matchedProduct);
                      setIsModalOpen(true);
                    }}
                    className="p-3 rounded-full border border-[#E8DFD8] text-[#2C2825] hover:bg-[#F4EFEB] transition-colors"
                    aria-label="Quick View"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-[#9B8777]">
                <p>Click any + tag on the room scene to view product details.</p>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-[#F4EFEB] flex items-center justify-between text-xs text-[#6B655F]">
              <span>Ready for fast delivery</span>
              <Link
                href="/products"
                className="font-medium text-[#C86D51] hover:underline flex items-center gap-1"
              >
                Browse all rooms <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedProduct && (
        <ProductModal
          isOpen={isModalOpen}
          product={selectedProduct}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </section>
  );
}
