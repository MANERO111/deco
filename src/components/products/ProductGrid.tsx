'use client';
import React, { useState } from 'react';
import { Heart, ShoppingCart, Eye, Star, Check } from 'lucide-react';
import { Product } from '@/hooks/useProducts';
import { useCart } from '@/contexts/CartContext';
import { getProductImageUrl } from '@/utils/imageHelper';
import { useWishlist } from '@/hooks/useWishlist';
import ProductModal from '@/components/products/ProductModal';

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const [addingToCart, setAddingToCart] = useState<{ [key: number]: boolean }>({});
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = async (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (addingToCart[product.id] || product.stock_quantity === 0) return;
    setAddingToCart(prev => ({ ...prev, [product.id]: true }));
    try {
      await addToCart(product, 1);
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => setAddingToCart(prev => ({ ...prev, [product.id]: false })), 1500);
    }
  };

  const handleWishlistClick = (e: React.MouseEvent, productId: number) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(productId);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {products.map((product) => {
          const hasDiscount =
            product.discounted_price &&
            Number(product.discounted_price) > 0 &&
            Number(product.discounted_price) < Number(product.original_price);
          const inWish = isInWishlist(product.id);
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
              {/* Product Image Box */}
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
                  {isOutOfStock && (
                    <span className="bg-stone-800 text-stone-200 text-[10px] font-medium px-2 py-0.5 rounded-full">
                      Out of stock
                    </span>
                  )}
                </div>

                {/* Wishlist Button */}
                <button
                  type="button"
                  onClick={(e) => handleWishlistClick(e, product.id)}
                  aria-label="Save to Wishlist"
                  className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm z-10 ${
                    inWish
                      ? 'bg-[#C86D51] text-white'
                      : 'bg-white/90 text-[#2C2825] hover:bg-white hover:text-[#C86D51]'
                  }`}
                >
                  <Heart className="w-4 h-4" fill={inWish ? 'currentColor' : 'none'} />
                </button>

                {/* Quick View Button on Hover */}
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

              {/* Product Info */}
              <div className="p-3 pt-4 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                    <span className="text-[11px] text-[#9B8777] ml-1 font-medium">5.0</span>
                  </div>

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
    </>
  );
};

export default ProductGrid;