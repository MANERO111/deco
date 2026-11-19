'use client';
import React from 'react';
import { X, SlidersHorizontal, RotateCcw } from 'lucide-react';

interface ProductFilterProps {
  minPrice: number;
  maxPrice: number;
  sortBy: string;
  searchQuery: string;
  onMinPriceChange: (value: number) => void;
  onMaxPriceChange: (value: number) => void;
  onSortChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onClearFilters: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  minPrice,
  maxPrice,
  sortBy,
  searchQuery,
  onMinPriceChange,
  onMaxPriceChange,
  onSortChange,
  onSearchChange,
  onClearFilters,
  isOpen = true,
  onClose
}) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && onClose && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Filter Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 lg:top-28 left-0 h-screen lg:h-auto
        w-80 lg:w-full bg-white border border-[#E8DFD8] shadow-sm
        overflow-y-auto z-50 lg:z-0 p-6 rounded-3xl
        transition-transform duration-300 lg:transition-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Mobile Header */}
        <div className="flex items-center justify-between mb-6 lg:hidden pb-4 border-b border-[#F4EFEB]">
          <h2 className="font-serif text-lg font-bold text-[#2C2825] flex items-center gap-2">
            <SlidersHorizontal size={18} className="text-[#C86D51]" />
            Filters & Sorting
          </h2>
          {onClose && (
            <button 
              onClick={onClose}
              className="p-1.5 hover:bg-[#F4EFEB] rounded-full text-[#2C2825] transition-colors"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <div className="space-y-6">
          {/* Search query input */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2825] mb-2">
              Keyword Filter
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Oak desk, linen sofa..."
              className="w-full bg-[#FAF8F5] border border-[#E8DFD8] focus:border-[#C86D51] rounded-xl px-3.5 py-2.5 text-xs text-[#2C2825] placeholder-[#9B8777] outline-none transition-colors"
            />
          </div>

          {/* Price Range */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#2C2825]">
                Price Range
              </label>
              <span className="text-xs font-medium text-[#C86D51]">
                ${minPrice} - ${maxPrice}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <span className="text-[10px] text-[#9B8777] uppercase">Min ($)</span>
                <input
                  type="number"
                  min="0"
                  max={maxPrice}
                  value={minPrice}
                  onChange={(e) => onMinPriceChange(Number(e.target.value))}
                  className="w-full bg-[#FAF8F5] border border-[#E8DFD8] rounded-xl px-3 py-2 text-xs text-[#2C2825] outline-none"
                />
              </div>
              <div>
                <span className="text-[10px] text-[#9B8777] uppercase">Max ($)</span>
                <input
                  type="number"
                  min={minPrice}
                  max="10000"
                  value={maxPrice}
                  onChange={(e) => onMaxPriceChange(Number(e.target.value))}
                  className="w-full bg-[#FAF8F5] border border-[#E8DFD8] rounded-xl px-3 py-2 text-xs text-[#2C2825] outline-none"
                />
              </div>
            </div>

            <input
              type="range"
              min="0"
              max="5000"
              step="50"
              value={maxPrice}
              onChange={(e) => onMaxPriceChange(Number(e.target.value))}
              className="w-full accent-[#C86D51] cursor-pointer"
            />
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2825] mb-2">
              Sort Catalog
            </label>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full bg-[#FAF8F5] border border-[#E8DFD8] focus:border-[#C86D51] rounded-xl px-3.5 py-2.5 text-xs text-[#2C2825] outline-none transition-colors"
            >
              <option value="">Featured / Recommended</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="name_asc">Name: A to Z</option>
              <option value="name_desc">Name: Z to A</option>
            </select>
          </div>

          {/* Reset Filters button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={onClearFilters}
              className="w-full py-2.5 px-4 rounded-xl border border-[#E8DFD8] hover:bg-[#FAF8F5] text-xs font-semibold text-[#6B655F] hover:text-[#2C2825] transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset All Filters
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default ProductFilter;
