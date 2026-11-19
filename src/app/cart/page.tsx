'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { getProductImageUrl } from '@/utils/imageHelper';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import LoginModal from '@/components/login';

interface CartItem {
  id: number;
  name: string;
  brand?: string;
  original_price: number;
  discounted_price?: number | null;
  price?: number;
  image_url?: string;
  quantity: number;
  stock_quantity?: number;
}

const CartPage: React.FC = () => {
  const { cartItems, cartCount, isLoading, updateQuantity, removeFromCart, clearCart, getCartTotal } = useCart();
  const { isAuthenticated } = useAuth();

  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const handleQuantityChange = async (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setUpdatingId(productId);
    await updateQuantity(productId, newQuantity);
    setUpdatingId(null);
  };

  const handleRemoveItem = async (productId: number) => {
    setUpdatingId(productId);
    await removeFromCart(productId);
    setUpdatingId(null);
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    } else {
      window.location.href = '/checkout';
    }
  };

  const subtotal = getCartTotal();
  const freeShippingThreshold = 150;
  const shippingFree = subtotal >= freeShippingThreshold || subtotal === 0;
  const shipping = shippingFree ? 0 : 25;
  const total = subtotal + shipping;
  const progressPct = Math.min((subtotal / freeShippingThreshold) * 100, 100);

  if (isLoading) {
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
              Continue Shopping
            </Link>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#2C2825]">
              Shopping Cart ({cartCount})
            </h1>
          </div>

          {cartItems.length > 0 && (
            <button
              type="button"
              onClick={() => setShowClearConfirm(true)}
              className="text-xs text-[#9B8777] hover:text-red-600 transition-colors self-start sm:self-auto"
            >
              Empty Cart
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-white rounded-3xl p-16 text-center border border-[#E8DFD8] shadow-sm max-w-xl mx-auto my-12">
            <div className="w-16 h-16 rounded-full bg-[#FAF8F5] text-[#9B8777] flex items-center justify-center mx-auto mb-5">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#2C2825]">
              Your cart is empty
            </h2>
            <p className="text-sm text-[#6B655F] mt-2 leading-relaxed">
              Discover timeless Scandinavian furniture, lighting, and home accessories to transform your living spaces.
            </p>
            <Link
              href="/products"
              className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#2C2825] hover:bg-[#C86D51] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md"
            >
              Explore Furniture Catalog
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          /* Active Cart Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Items Column (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              {/* Free delivery tier progress bar */}
              <div className="bg-white rounded-2xl p-5 border border-[#E8DFD8] shadow-sm">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-[#2C2825] flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#C86D51]" />
                    {shippingFree
                      ? 'Congratulations! You qualify for Free White-Glove Delivery.'
                      : `Add $${(freeShippingThreshold - subtotal).toFixed(2)} more for Free Delivery`}
                  </span>
                  <span className="font-bold text-[#C86D51]">
                    {Math.round(progressPct)}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[#FAF8F5] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#C86D51] transition-all duration-500 rounded-full"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="bg-white rounded-3xl border border-[#E8DFD8] shadow-sm divide-y divide-[#F4EFEB] overflow-hidden">
                {(cartItems as CartItem[]).map((item: CartItem) => {
                  const currentPrice = Number(item.discounted_price || item.price || item.original_price);
                  const isBusy = updatingId === item.id;

                  return (
                    <div
                      key={item.id}
                      className={`p-6 flex flex-col sm:flex-row items-center gap-5 transition-opacity ${
                        isBusy ? 'opacity-50' : 'opacity-100'
                      }`}
                    >
                      {/* Image */}
                      <div className="w-24 h-24 rounded-2xl bg-[#FAF8F5] overflow-hidden border border-[#E8DFD8] shrink-0">
                        <img
                          src={getProductImageUrl(item.image_url)}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0 text-center sm:text-left">
                        {item.brand && (
                          <span className="text-[10px] uppercase font-bold tracking-wider text-[#9B8777]">
                            {item.brand}
                          </span>
                        )}
                        <h3 className="font-serif text-base font-semibold text-[#2C2825] truncate">
                          {item.name}
                        </h3>
                        <p className="text-xs text-[#9B8777] mt-0.5">
                          Unit Price: ${currentPrice.toFixed(2)}
                        </p>
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-[#E8DFD8] rounded-full bg-[#FAF8F5]">
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1 || isBusy}
                            className="p-2 text-[#2C2825] hover:text-[#C86D51] disabled:opacity-30"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-xs font-semibold text-[#2C2825]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            disabled={isBusy}
                            className="p-2 text-[#2C2825] hover:text-[#C86D51]"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.id)}
                          disabled={isBusy}
                          className="p-2 text-[#9B8777] hover:text-red-600 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Subtotal */}
                      <div className="text-right sm:w-24">
                        <span className="text-base font-bold text-[#2C2825]">
                          ${(currentPrice * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Summary Column (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD8] shadow-sm space-y-6">
              <h2 className="font-serif text-xl font-bold text-[#2C2825] pb-4 border-b border-[#F4EFEB]">
                Order Summary
              </h2>

              <div className="space-y-3 text-xs text-[#6B655F]">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span className="text-sm font-semibold text-[#2C2825]">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Estimated Delivery</span>
                  <span className="text-sm font-semibold text-[#2C2825]">
                    {shipping === 0 ? (
                      <span className="text-green-600 font-bold uppercase text-xs">Free</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Sales Tax & Duties</span>
                  <span className="text-xs text-[#9B8777]">Calculated at checkout</span>
                </div>

                <div className="pt-4 border-t border-[#F4EFEB] flex items-center justify-between">
                  <span className="text-sm font-bold text-[#2C2825]">Estimated Total</span>
                  <span className="font-serif text-2xl font-bold text-[#C86D51]">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                type="button"
                onClick={handleCheckout}
                className="w-full py-4 px-6 rounded-full bg-[#2C2825] hover:bg-[#C86D51] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
              >
                <span>Proceed To Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Reassurances */}
              <div className="pt-4 border-t border-[#F4EFEB] space-y-2.5 text-xs text-[#6B655F]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C86D51]" />
                  <span>100-Day Risk-Free In-Home Trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-[#C86D51]" />
                  <span>Free Hassle-Free Returns</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C86D51]" />
                  <span>10-Year Craftsmanship Frame Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Clear Cart Confirmation Modal */}
        {showClearConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center border border-[#E8DFD8] shadow-2xl">
              <h3 className="font-serif text-xl font-bold text-[#2C2825]">
                Clear your shopping cart?
              </h3>
              <p className="text-xs text-[#6B655F] mt-2">
                This will remove all items currently placed in your cart.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 py-2.5 rounded-full border border-[#E8DFD8] text-xs font-semibold text-[#2C2825]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    await clearCart();
                    setShowClearConfirm(false);
                  }}
                  className="flex-1 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-semibold"
                >
                  Yes, Clear
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Login Modal */}
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={() => {
            setShowLoginModal(false);
            window.location.href = '/checkout';
          }}
        />
      </div>
    </div>
  );
};

export default CartPage;