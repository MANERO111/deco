"use client";
import React, { useState } from "react";
import { Plus, Minus, HelpCircle, MessageSquare } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ_LIST: FAQItem[] = [
  {
    category: "Delivery & Assembly",
    question: "How does white-glove furniture delivery work?",
    answer: "For larger furniture items like modular sofas, dining tables, and sideboards, our premium delivery team brings the pieces directly to the room of your choice, unboxes, performs complete assembly, and removes all packaging materials for zero waste.",
  },
  {
    category: "Delivery & Assembly",
    question: "What is your return policy and in-home trial?",
    answer: "We offer an unconditional 100-day in-home trial. Live with your pieces, feel the fabrics, and experience the ergonomics. If you're not completely in love, contact our concierge for a hassle-free return and full refund.",
  },
  {
    category: "Materials & Care",
    question: "What sustainable materials are used in Deco Flower Casa furniture?",
    answer: "We prioritize FSC-certified European white oak and American walnut, chemical-free Belgian linen, Oeko-Tex certified bouclé, and lead-free natural clay ceramics. All wood finishes use non-toxic organic oils.",
  },
  {
    category: "Customization",
    question: "Can I customize fabrics, dimensions, or wood stains?",
    answer: "Yes! Many of our modular sofas, sectionals, and executive desks can be tailored with bespoke fabric swatches or dimensions. You can schedule a complimentary 30-minute virtual consultation with one of our interior architects.",
  },
  {
    category: "Warranty",
    question: "What does the 10-Year Craftsmanship Guarantee cover?",
    answer: "Our guarantee covers structural frame integrity, solid timber joinery, drawer slide mechanisms, and dual-motor electric standing desk mechanisms against defects for a full decade.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FDFBF7] border-t border-[#E8DFD8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#C86D51]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#2C2825] mt-2">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-[#6B655F] mt-2">
            Everything you need to know about delivery, materials, custom sizing, and our 10-year warranty.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {FAQ_LIST.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl transition-all duration-300 border ${
                  isOpen
                    ? "bg-[#FAF8F5] border-[#C86D51]/40 shadow-sm"
                    : "bg-white border-[#E8DFD8] hover:border-[#D8CCC2]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4"
                >
                  <span className="font-serif text-base sm:text-lg font-semibold text-[#2C2825]">
                    {item.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isOpen
                        ? "bg-[#C86D51] text-white"
                        : "bg-[#F4EFEB] text-[#2C2825]"
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="w-3.5 h-3.5" />
                    ) : (
                      <Plus className="w-3.5 h-3.5" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-[#6B655F] leading-relaxed border-t border-[#E8DFD8]/60 pt-4">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact concierge card */}
        <div className="mt-12 bg-[#FAF8F5] rounded-3xl p-6 sm:p-8 border border-[#E8DFD8] text-center flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h4 className="font-serif text-lg font-bold text-[#2C2825]">
              Still have questions or need custom floor planning?
            </h4>
            <p className="text-xs text-[#6B655F] mt-1">
              Our interior design specialists are available 7 days a week to assist you.
            </p>
          </div>
          <a
            href="mailto:contact@decoflowercasa.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2C2825] hover:bg-[#C86D51] text-white text-xs font-semibold tracking-wider uppercase transition-colors shrink-0 shadow-md"
          >
            <MessageSquare className="w-4 h-4" />
            Chat With Concierge
          </a>
        </div>
      </div>
    </section>
  );
}