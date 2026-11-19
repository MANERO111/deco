'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal, ArrowRight, Sparkles, PackageOpen } from 'lucide-react';
import { useProducts, Product } from '@/hooks/useProducts';
import ProductFilter from '@/components/products/ProductFilter';
import ProductGrid from '@/components/products/ProductGrid';
import Link from 'next/link';

const ProductsPageContent = () => {
  const searchParams = useSearchParams();
  const { products, categories, loading } = useProducts();

  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [sortBy, setSortBy] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState<number>(24);

  const categoryParam = searchParams.get('category') || '';
  const subcategoryParam = searchParams.get('subcategory') || '';
  const searchQueryParam = searchParams.get('search') || '';
  const promotionsParam = searchParams.get('promotions') === 'true';

  useEffect(() => {
    if (searchQueryParam) {
      setSearchQuery(searchQueryParam);
    }
  }, [searchQueryParam]);

  const filteredProducts = React.useMemo(() => {
    let result = products.filter(p => p.active === true || (p as Product & { status?: string }).status === 'active' || p.active === undefined);

    // Filter by Category name match
    if (categoryParam) {
      const cat = categories.find(c => c.name.toLowerCase() === categoryParam.toLowerCase());
      if (cat) {
        result = result.filter(p => p.category_id === cat.id);
      }
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q)) ||
          (p.brand && p.brand.toLowerCase().includes(q))
      );
    }

    // Filter by promotions
    if (promotionsParam) {
      result = result.filter(
        p => p.discounted_price && Number(p.discounted_price) > 0 && Number(p.discounted_price) < Number(p.original_price)
      );
    }

    // Filter by price range
    result = result.filter(p => {
      const price = Number(p.discounted_price || p.price || p.original_price);
      return price >= minPrice && price <= maxPrice;
    });

    // Sort
    if (sortBy === 'price_asc') {
      result.sort((a, b) => Number(a.discounted_price || a.price || a.original_price) - Number(b.discounted_price || b.price || b.original_price));
    } else if (sortBy === 'price_desc') {
      result.sort((a, b) => Number(b.discounted_price || b.price || b.original_price) - Number(a.discounted_price || a.price || a.original_price));
    } else if (sortBy === 'name_asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name_desc') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  }, [products, categories, categoryParam, searchQuery, promotionsParam, minPrice, maxPrice, sortBy]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const handleClearFilters = () => {
    setMinPrice(0);
    setMaxPrice(10000);
    setSortBy('');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-10 pb-8 border-b border-[#E8DFD8]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#C86D51] mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                Deco Flower Casa Catalog
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2C2825]">
                {categoryParam || (promotionsParam ? 'Special Offers' : 'All Collections')}
              </h1>
              {subcategoryParam && (
                <p className="text-sm font-medium text-[#9B8777] mt-1">
                  Collection: {subcategoryParam}
                </p>
              )}
            </div>

            {/* Mobile Filter Trigger & Counter */}
            <div className="flex items-center justify-between md:justify-end gap-4">
              <span className="text-xs text-[#6B655F]">
                Showing <strong className="text-[#2C2825]">{displayedProducts.length}</strong> of{' '}
                <strong className="text-[#2C2825]">{filteredProducts.length}</strong> items
              </span>

              <button
                type="button"
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2C2825] text-white text-xs font-semibold uppercase tracking-wider"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Filters
              </button>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <ProductFilter
              minPrice={minPrice}
              maxPrice={maxPrice}
              sortBy={sortBy}
              searchQuery={searchQuery}
              onMinPriceChange={setMinPrice}
              onMaxPriceChange={setMaxPrice}
              onSortChange={setSortBy}
              onSearchChange={setSearchQuery}
              onClearFilters={handleClearFilters}
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
            />
          </div>

          {/* Product Grid Area */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-3xl p-4 border border-[#E8DFD8] animate-pulse">
                    <div className="aspect-[4/4.5] bg-[#F4EFEB] rounded-2xl mb-4" />
                    <div className="h-4 bg-[#F4EFEB] rounded w-3/4 mb-2" />
                    <div className="h-3 bg-[#F4EFEB] rounded w-1/2 mb-4" />
                    <div className="h-6 bg-[#F4EFEB] rounded w-1/3" />
                  </div>
                ))}
              </div>
            ) : displayedProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#E8DFD8] shadow-sm">
                <div className="w-14 h-14 rounded-full bg-[#FAF8F5] text-[#9B8777] flex items-center justify-center mx-auto mb-4">
                  <PackageOpen className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#2C2825]">
                  No products found
                </h3>
                <p className="text-xs sm:text-sm text-[#6B655F] mt-2 max-w-md mx-auto">
                  We couldn&apos;t find any items matching your current filters. Try resetting the filters or searching for different keywords.
                </p>
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#2C2825] hover:bg-[#C86D51] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div>
                <ProductGrid products={displayedProducts} />

                {/* Load More Button */}
                {hasMore && (
                  <div className="mt-12 text-center">
                    <button
                      type="button"
                      onClick={() => setVisibleCount((prev) => prev + 24)}
                      className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#2C2825] hover:bg-[#C86D51] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md"
                    >
                      Load More Products
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#C86D51] border-t-transparent animate-spin" />
        </div>
      }
    >
      <ProductsPageContent />
    </Suspense>
  );
}