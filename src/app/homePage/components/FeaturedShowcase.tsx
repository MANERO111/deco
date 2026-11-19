"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Heart, Eye, ArrowRight, Star, Sparkles, Check } from "lucide-react";
import { useProducts, Product } from "@/hooks/useProducts";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/hooks/useWishlist";
import ProductModal from "@/components/products/ProductModal";

interface ProductSectionProps {
  title: string;
  subtitle: string;
  tag: string;
  categoryFilter?: number | string;
  viewAllLink: string;
  badgeType?: "featured" | "discount" | "bestseller";
}

export default function FeaturedShowcase({
  title,
  subtitle,
  tag,
  categoryFilter,
  viewAllLink,
}: ProductSectionProps) {
  const { products } = useProducts();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addedIds, setAddedIds] = useState<{ [key: number]: boolean }>({});

  // Filter products by category if provided, or show first batch
  const displayProducts = React.useMemo(() => {
    let list = products;
    if (typeof categoryFilter === "number") {
      list = products.filter((p) => p.category_id === categoryFilter);
    }
    return list.slice(0, 4);
  }, [products, categoryFilter]);

  const handleAddToCart = async (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const res = await addToCart(product, 1);
      if (res.success) {
        setAddedIds((prev) => ({ ...prev, [product.id]: true }));
        setTimeout(() => {
          setAddedIds((prev) => ({ ...prev, [product.id]: false }));
        }, 2000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleWishlist = (e: React.MouseEvent, productId: number) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(productId);
  };

  return (
    <section className="py-14 sm:py-20 bg-[#FAF8F5] border-y border-[#E8DFD8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#C86D51]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{tag}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#2C2825] mt-1.5">
              {title}
            </h2>
            <p className="text-xs sm:text-sm text-[#6B655F] mt-1.5 max-w-lg">
              {subtitle}
            </p>
          </div>

          <Link
            href={viewAllLink}
            className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#2C2825] hover:text-[#C86D51] transition-colors group"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((product) => {
            const hasDiscount =
              product.discounted_price &&
              Number(product.discounted_price) > 0 &&
              Number(product.discounted_price) < Number(product.original_price);
            const inWish = isInWishlist(product.id);
            const isAdded = addedIds[product.id];

            return (
              <div
                key={product.id}
                onClick={() => {
                  setSelectedProduct(product);
                  setIsModalOpen(true);
                }}
                className="group bg-white rounded-3xl p-3 border border-[#E8DFD8] hover:border-[#C86D51]/40 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/4.5] w-full rounded-2xl overflow-hidden bg-[#F4EFEB]">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {hasDiscount && (
                      <span className="bg-[#C86D51] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                        Save $
                        {Math.round(
                          Number(product.original_price) -
                            Number(product.discounted_price)
                        )}
                      </span>
                    )}
                    {product.brand && (
                      <span className="bg-[#2C2825]/80 backdrop-blur-md text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                        {product.brand}
                      </span>
                    )}
                  </div>

                  {/* Top Right Wishlist Button */}
                  <button
                    onClick={(e) => handleToggleWishlist(e, product.id)}
                    aria-label="Wishlist"
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm ${
                      inWish
                        ? "bg-[#C86D51] text-white"
                        : "bg-white/90 text-[#2C2825] hover:bg-white hover:text-[#C86D51]"
                    }`}
                  >
                    <Heart
                      className="w-4 h-4"
                      fill={inWish ? "currentColor" : "none"}
                    />
                  </button>

                  {/* Quick View Hover Overlay Button */}
                  <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(product);
                        setIsModalOpen(true);
                      }}
                      className="w-full py-2.5 bg-white/95 backdrop-blur-md hover:bg-white text-[#2C2825] rounded-xl text-xs font-semibold tracking-wide shadow-md flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Quick View
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="p-3 pt-4 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-amber-500 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 fill-current"
                        />
                      ))}
                      <span className="text-[11px] text-[#9B8777] ml-1 font-medium">
                        4.9
                      </span>
                    </div>

                    <h3 className="font-serif text-base font-semibold text-[#2C2825] group-hover:text-[#C86D51] transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#6B655F] mt-1 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Price & Add to Cart */}
                  <div className="mt-4 pt-3 border-t border-[#F4EFEB] flex items-center justify-between">
                    <div>
                      {hasDiscount ? (
                        <div className="flex items-baseline gap-2">
                          <span className="text-base font-bold text-[#C86D51]">
                            ${product.discounted_price}
                          </span>
                          <span className="text-xs text-[#9B8777] line-through">
                            ${product.original_price}
                          </span>
                        </div>
                      ) : (
                        <span className="text-base font-bold text-[#2C2825]">
                          ${product.price || product.original_price}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      disabled={isAdded}
                      aria-label="Add to cart"
                      className={`p-2.5 rounded-full transition-all duration-300 shadow-sm ${
                        isAdded
                          ? "bg-green-600 text-white"
                          : "bg-[#2C2825] hover:bg-[#C86D51] text-white"
                      }`}
                    >
                      {isAdded ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <ShoppingCart className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
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
