'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
  Heart,
  ShoppingCart,
  Trash2,
  ArrowLeft,
  ArrowRight,
  Eye,
  Sparkles,
  Check,
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/hooks/useWishlist';
import { useProducts, Product } from '@/hooks/useProducts';
import { getProductImageUrl } from '@/utils/imageHelper';
import ProductModal from '@/components/products/ProductModal';

const WishlistPage = () => {
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();
  const { products, loading } = useProducts();

  const [addingToCart, setAddingToCart] = useState<{ [key: number]: boolean }>({});
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const wishlistItems = products.filter((p) => wishlist.includes(p.id));

  const handleAddToCart = async (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (addingToCart[product.id] || product.stock_quantity === 0) return;
    setAddingToCart((prev) => ({ ...prev, [product.id]: true }));
    try {
      await addToCart(product, 1);
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => {
        setAddingToCart((prev) => ({ ...prev, [product.id]: false }));
      }, 1500);
    }
  };

  const handleRemove = (productId: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(productId);
  };

  const handleClearAll = () => {
    wishlist.forEach((id) => toggleWishlist(id));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] py-20 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#C86D51] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 pb-6 border-b border-[#E8DFD8] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-xs text-[#9B8777] hover:text-[#C86D51] mb-2 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Continue Browsing
            </Link>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#C86D51] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              Curated Favorites
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#2C2825]">
              My Wishlist ({wishlistItems.length})
            </h1>
          </div>

          {wishlistItems.length > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className="text-xs text-[#9B8777] hover:text-red-600 transition-colors self-start sm:self-auto"
            >
              Clear All Saved Items
            </button>
          )}
        </div>

        {wishlistItems.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-3xl p-16 text-center border border-[#E8DFD8] shadow-sm max-w-xl mx-auto my-12">
            <div className="w-16 h-16 rounded-full bg-[#FAF8F5] text-[#9B8777] flex items-center justify-center mx-auto mb-5">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#2C2825]">
              Your wishlist is currently empty
            </h2>
            <p className="text-sm text-[#6B655F] mt-2 leading-relaxed">
              Explore our Scandinavian furniture, lighting, and home accessories to bookmark pieces you love for your home.
            </p>
            <Link
              href="/products"
              className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#2C2825] hover:bg-[#C86D51] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md"
            >
              Explore Collections
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          /* Wishlist Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistItems.map((product) => {
              const hasDiscount =
                product.discounted_price &&
                Number(product.discounted_price) > 0 &&
                Number(product.discounted_price) < Number(product.original_price);
              const isAdded = addingToCart[product.id];
              const isOutOfStock = product.stock_quantity === 0;

              return (
                <div
                  key={product.id}
                  onClick={() => {
                    setSelectedProduct(product);
                    setIsModalOpen(true);
                  }}
                  className="group bg-white rounded-3xl p-3 border border-[#E8DFD8] hover:border-[#C86D51]/40 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/4.5] w-full rounded-2xl overflow-hidden bg-[#F4EFEB]">
                    <img
                      src={getProductImageUrl(product.image_url)}
                      alt={product.name}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                      {hasDiscount && (
                        <span className="bg-[#C86D51] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                          Save ${Math.round(Number(product.original_price) - Number(product.discounted_price))}
                        </span>
                      )}
                      {product.brand && (
                        <span className="bg-[#2C2825]/80 backdrop-blur-md text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                          {product.brand}
                        </span>
                      )}
                    </div>

                    {/* Remove from wishlist button */}
                    <button
                      type="button"
                      onClick={(e) => handleRemove(product.id, e)}
                      aria-label="Remove from Wishlist"
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-red-500 hover:bg-white flex items-center justify-center transition-colors shadow-sm z-10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    {/* Quick view on hover */}
                    <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
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
                      <h3 className="font-serif text-base font-semibold text-[#2C2825] group-hover:text-[#C86D51] transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-xs text-[#6B655F] mt-1 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Price and Cart Action */}
                    <div className="mt-4 pt-3 border-t border-[#F4EFEB] flex items-center justify-between">
                      <div>
                        {hasDiscount ? (
                          <div className="flex items-baseline gap-2">
                            <span className="text-base font-bold text-[#C86D51]">
                              ${Number(product.discounted_price).toFixed(2)}
                            </span>
                            <span className="text-xs text-[#9B8777] line-through">
                              ${Number(product.original_price).toFixed(2)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-base font-bold text-[#2C2825]">
                            ${Number(product.price || product.original_price).toFixed(2)}
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={(e) => handleAddToCart(product, e)}
                        disabled={isAdded || isOutOfStock}
                        aria-label="Add to cart"
                        className={`p-2.5 rounded-full transition-all duration-300 shadow-sm ${
                          isAdded
                            ? 'bg-green-600 text-white'
                            : isOutOfStock
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-[#2C2825] hover:bg-[#C86D51] text-white'
                        }`}
                      >
                        {isAdded ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Quick View Modal */}
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
      </div>
    </div>
  );
};

export default WishlistPage;