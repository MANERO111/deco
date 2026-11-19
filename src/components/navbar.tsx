"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  ArrowRight,
  Sparkles,
  Truck,
  ShieldCheck,
} from "lucide-react";
import { navigationItems } from "@/constants/navigationData";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useProducts, Product } from "@/hooks/useProducts";
import LoginModal from "./login";
import ProductModal from "./products/ProductModal";

const Navbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // Search state
  const { products } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const searchWrapperRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);

  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();

  // Wishlist count listener
  useEffect(() => {
    const updateWishlistCount = () => {
      try {
        const saved = localStorage.getItem("wishlist");
        if (saved) {
          const items = JSON.parse(saved);
          setWishlistCount(Array.isArray(items) ? items.length : 0);
        } else {
          setWishlistCount(0);
        }
      } catch {
        setWishlistCount(0);
      }
    };
    updateWishlistCount();
    window.addEventListener("storage", updateWishlistCount);
    window.addEventListener("wishlistUpdated", updateWishlistCount);
    return () => {
      window.removeEventListener("storage", updateWishlistCount);
      window.removeEventListener("wishlistUpdated", updateWishlistCount);
    };
  }, []);

  // Click outside handlers
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(e.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }
      if (
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(e.target as Node)
      ) {
        setIsSearchFocused(false);
      }
      if (
        megaMenuRef.current &&
        !megaMenuRef.current.contains(e.target as Node)
      ) {
        setActiveCategory(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll listener for sticky header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filtered search results
  const searchResults =
    searchQuery.trim().length > 1
      ? products
          .filter((p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (p.brand && p.brand.toLowerCase().includes(searchQuery.toLowerCase()))
          )
          .slice(0, 5)
      : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchFocused(false);
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = async () => {
    setIsProfileDropdownOpen(false);
    await logout();
  };

  const currentCategoryData = navigationItems.find(
    (item) => item.name === activeCategory
  );

  return (
    <>
      <header className="sticky top-0 z-40 w-full transition-all duration-300">
        {/* Top Announcement Bar */}
        <div className="bg-[#2C2825] text-[#FAF8F5] px-4 py-2 text-xs tracking-wider">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="hidden sm:flex items-center gap-6 text-[11px] text-[#C8CCC5]">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#C86D51]" />
                Free delivery on orders over $150
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C86D51]" />
                10-Year Craftsmanship Warranty
              </span>
            </div>
            <div className="mx-auto sm:mx-0 flex items-center gap-2">
              <span className="font-light">Design consultation & custom sizing:</span>
              <a
                href="tel:+18003326227"
                className="font-medium text-[#FAF8F5] underline underline-offset-2 hover:text-[#C86D51] transition-colors"
              >
                +1 (800) DECO-CASA
              </a>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div
          className={`w-full bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#E8DFD8] transition-all duration-300 ${
            isScrolled ? "shadow-sm py-2" : "py-3"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              {/* Mobile menu trigger */}
              <button
                type="button"
                aria-label="Toggle menu"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-[#2C2825] hover:text-[#C86D51] rounded-lg transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              {/* Brand Logo */}
              <Link href="/" className="flex items-center gap-2.5 group">
                  <img src="/img/logo.png" className="w-20 h-20" alt="Deco Flower Casa logo" />
              </Link>

              {/* Search Bar - Desktop */}
              <div
                ref={searchWrapperRef}
                className="hidden md:flex flex-1 max-w-md mx-6 relative"
              >
                <form onSubmit={handleSearchSubmit} className="w-full relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    placeholder="Search furniture, sofas, lighting, rugs..."
                    className="w-full bg-[#F4EFEB] hover:bg-[#EFE7E0] focus:bg-[#FFFFFF] text-[#2C2825] placeholder-[#9B8777] text-sm rounded-full pl-10 pr-10 py-2.5 border border-transparent focus:border-[#C86D51] outline-none transition-all shadow-inner"
                  />
                  <Search className="w-4 h-4 text-[#9B8777] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#9B8777] hover:text-[#2C2825]"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </form>

                {/* Search Dropdown Results */}
                {isSearchFocused && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-[#E8DFD8] p-3 z-50">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#9B8777] px-3 py-1">
                      Matching Products
                    </p>
                    <div className="divide-y divide-[#F4EFEB]">
                      {searchResults.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => {
                            setSelectedProduct(product);
                            setIsProductModalOpen(true);
                            setIsSearchFocused(false);
                          }}
                          className="flex items-center gap-3 p-2.5 hover:bg-[#FAF8F5] rounded-xl cursor-pointer transition-colors"
                        >
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-cover bg-[#F4EFEB]"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-[#2C2825] truncate">
                              {product.name}
                            </p>
                            <p className="text-[11px] text-[#9B8777]">
                              {product.brand}
                            </p>
                          </div>
                          <span className="text-xs font-medium text-[#C86D51]">
                            ${product.discounted_price || product.price || product.original_price}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-2 mt-1 border-t border-[#F4EFEB] text-center">
                      <button
                        onClick={handleSearchSubmit}
                        className="text-xs font-medium text-[#2C2825] hover:text-[#C86D51] inline-flex items-center gap-1"
                      >
                        See all results for &quot;{searchQuery}&quot;
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Icons */}
              <div className="flex items-center gap-2 sm:gap-4">
                {/* Wishlist Link */}
                <Link
                  href="/wishlist"
                  className="relative p-2.5 text-[#2C2825] hover:text-[#C86D51] hover:bg-[#F4EFEB] rounded-full transition-colors"
                  aria-label="Wishlist"
                >
                  <Heart className="w-5 h-5 stroke-[1.8]" />
                  {wishlistCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-[#C86D51] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                {/* Cart Link */}
                <Link
                  href="/cart"
                  className="relative p-2.5 text-[#2C2825] hover:text-[#C86D51] hover:bg-[#F4EFEB] rounded-full transition-colors"
                  aria-label="Shopping Cart"
                >
                  <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
                  {cartCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-[#2C2825] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>

                {/* User / Profile Dropdown */}
                <div ref={profileDropdownRef} className="relative">
                  {isAuthenticated ? (
                    <div>
                      <button
                        type="button"
                        onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                        className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 text-sm text-[#2C2825] hover:bg-[#F4EFEB] rounded-full transition-colors"
                      >
                        <div className="w-7 h-7 rounded-full bg-[#E8DFD8] text-[#2C2825] flex items-center justify-center font-medium text-xs">
                          {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                        </div>
                        <span className="hidden sm:inline font-medium text-xs">
                          {user?.name?.split(" ")[0] || "Account"}
                        </span>
                        <ChevronDown className="w-3.5 h-3.5 text-[#9B8777]" />
                      </button>

                      {isProfileDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-[#E8DFD8] py-2 z-50">
                          <div className="px-4 py-2 border-b border-[#F4EFEB]">
                            <p className="text-xs font-semibold text-[#2C2825]">
                              {user?.name}
                            </p>
                            <p className="text-[11px] text-[#9B8777] truncate">
                              {user?.email}
                            </p>
                          </div>

                          {user?.role === "admin" && (
                            <Link
                              href="/admin"
                              onClick={() => setIsProfileDropdownOpen(false)}
                              className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-[#2C2825] hover:bg-[#FAF8F5] transition-colors"
                            >
                              <LayoutDashboard className="w-4 h-4 text-[#C86D51]" />
                              Admin Dashboard
                            </Link>
                          )}

                          <Link
                            href="/profile"
                            onClick={() => setIsProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-[#2C2825] hover:bg-[#FAF8F5] transition-colors"
                          >
                            <User className="w-4 h-4 text-[#9B8777]" />
                            Profile Settings
                          </Link>

                          <Link
                            href="/orders"
                            onClick={() => setIsProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-[#2C2825] hover:bg-[#FAF8F5] transition-colors"
                          >
                            <ShoppingBag className="w-4 h-4 text-[#9B8777]" />
                            My Orders
                          </Link>

                          <div className="border-t border-[#F4EFEB] mt-1 pt-1">
                            <button
                              onClick={handleLogout}
                              className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <LogOut className="w-4 h-4" />
                              Sign Out
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsLoginModalOpen(true)}
                      className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#2C2825] bg-[#F4EFEB] hover:bg-[#E8DFD8] rounded-full transition-colors"
                    >
                      <User className="w-4 h-4" />
                      <span className="hidden sm:inline">Sign In</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Desktop Navigation Category Bar */}
            <nav className="hidden lg:flex items-center justify-between pt-3 pb-1 border-t border-[#F0ECE8] mt-3">
              <div className="flex items-center gap-1 xl:gap-2">
                {navigationItems.map((item) => (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => setActiveCategory(item.name)}
                  >
                    <Link
                      href={`/products?category=${encodeURIComponent(item.name)}`}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium tracking-wide transition-all ${
                        activeCategory === item.name
                          ? "bg-[#2C2825] text-white"
                          : "text-[#2C2825] hover:bg-[#F4EFEB] hover:text-[#C86D51]"
                      }`}
                    >
                      {item.name}
                      {item.badge && (
                        <span className="text-[9px] uppercase px-1.5 py-0.2 bg-[#C86D51] text-white rounded-full font-semibold">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </div>
                ))}
              </div>

              {/* Inspiration / Outlet Link */}
              <div className="flex items-center gap-3">
                <Link
                  href="/products?promotions=true"
                  className="inline-flex items-center gap-1 text-[13px] font-medium text-[#C86D51] hover:text-[#A9563C] transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Special Offers
                </Link>
              </div>
            </nav>
          </div>
        </div>

        {/* Mega Menu Dropdown */}
        {activeCategory && currentCategoryData && (
          <div
            ref={megaMenuRef}
            onMouseLeave={() => setActiveCategory(null)}
            className="hidden lg:block absolute left-0 right-0 top-full bg-white border-b border-[#E8DFD8] shadow-2xl py-8 z-30 transition-all duration-300"
          >
            <div className="max-w-7xl mx-auto px-8 grid grid-cols-4 gap-8">
              {currentCategoryData.subcategories?.map((sub) => (
                <div key={sub.name} className="space-y-3">
                  <Link
                    href={`/products?category=${encodeURIComponent(
                      currentCategoryData.name
                    )}&subcategory=${encodeURIComponent(sub.name)}`}
                    onClick={() => setActiveCategory(null)}
                    className="block text-sm font-semibold text-[#2C2825] hover:text-[#C86D51] transition-colors border-b border-[#F4EFEB] pb-1.5"
                  >
                    {sub.name}
                  </Link>
                  {sub.subcategories && (
                    <ul className="space-y-2">
                      {sub.subcategories.map((leaf) => (
                        <li key={leaf.name}>
                          <Link
                            href={`/products?category=${encodeURIComponent(
                              currentCategoryData.name
                            )}&subcategory=${encodeURIComponent(
                              sub.name
                            )}&subsubcategory=${encodeURIComponent(leaf.name)}`}
                            onClick={() => setActiveCategory(null)}
                            className="text-xs text-[#6B655F] hover:text-[#2C2825] hover:translate-x-1 inline-block transition-transform duration-200"
                          >
                            {leaf.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              {/* Promotional highlight card */}
              <div className="bg-[#FAF8F5] rounded-2xl p-5 border border-[#E8DFD8] flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#C86D51]">
                    Curated Collection
                  </span>
                  <h4 className="font-serif text-lg font-bold text-[#2C2825] mt-1">
                    {currentCategoryData.name}
                  </h4>
                  <p className="text-xs text-[#6B655F] mt-2 leading-relaxed">
                    Thoughtfully designed pieces crafted from sustainable oak, linen, and artisan ceramics.
                  </p>
                </div>
                <Link
                  href={`/products?category=${encodeURIComponent(currentCategoryData.name)}`}
                  onClick={() => setActiveCategory(null)}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#2C2825] hover:text-[#C86D51]"
                >
                  Explore Collection
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex">
            <div className="w-[85%] max-w-sm bg-[#FDFBF7] h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#E8DFD8]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#2C2825] text-[#FDFBF7] flex items-center justify-center font-serif text-base font-bold">
                      D
                    </div>
                    <span className="font-serif text-lg font-bold text-[#2C2825]">
                      DECO FLOWER CASA
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-1.5 rounded-lg text-[#2C2825] hover:bg-[#F4EFEB]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Search */}
                <form onSubmit={handleSearchSubmit} className="mt-4 relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search catalog..."
                    className="w-full bg-[#F4EFEB] text-[#2C2825] text-xs rounded-full pl-9 pr-4 py-2.5 outline-none"
                  />
                  <Search className="w-4 h-4 text-[#9B8777] absolute left-3 top-1/2 -translate-y-1/2" />
                </form>

                {/* Mobile Categories Accordion */}
                <div className="mt-6 space-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#9B8777]">
                    Categories
                  </p>
                  {navigationItems.map((item) => (
                    <div key={item.name} className="border-b border-[#F4EFEB] pb-2">
                      <Link
                        href={`/products?category=${encodeURIComponent(item.name)}`}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center justify-between text-sm font-medium text-[#2C2825] py-2"
                      >
                        <span>{item.name}</span>
                        {item.badge && (
                          <span className="text-[9px] uppercase px-2 py-0.5 bg-[#C86D51] text-white rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </div>
                  ))}
                  <div className="pt-2">
                    <Link
                      href="/products?promotions=true"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-sm font-semibold text-[#C86D51] py-2"
                    >
                      Special Offers & Deals
                    </Link>
                  </div>
                </div>
              </div>

              {/* Mobile Drawer Footer */}
              <div className="pt-6 border-t border-[#E8DFD8] text-xs text-[#9B8777]">
                <p>Deco Flower Casa Atelier</p>
                <p className="mt-1">Modern Scandinavian Home Living</p>
              </div>
            </div>
            <div className="flex-1" onClick={() => setIsMenuOpen(false)} />
          </div>
        )}
      </header>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

      {/* Product Quick View Modal */}
      {selectedProduct && (
        <ProductModal
          isOpen={isProductModalOpen}
          product={selectedProduct}
          onClose={() => {
            setIsProductModalOpen(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </>
  );
};

export default Navbar;