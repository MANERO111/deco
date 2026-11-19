"use client";
import React, { useState } from "react";
import { Mail, CheckCircle2, ArrowRight } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-[#FAF8F5] border-t border-[#E8DFD8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C86D51]">
          Join The Casa Circle
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#2C2825] mt-2">
          Receive $50 Off Your First Order
        </h2>
        <p className="text-sm text-[#6B655F] mt-3 max-w-lg mx-auto">
          Subscribe for early access to seasonal capsule launches, private sample sales, and interior styling inspirations.
        </p>

        {subscribed ? (
          <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-2xl max-w-md mx-auto flex items-center justify-center gap-2.5 text-green-800 text-sm font-medium">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            Thank you! Your $50 welcome voucher has been sent to your email.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
          >
            <div className="relative w-full">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full bg-white text-[#2C2825] placeholder-[#9B8777] text-sm rounded-full pl-11 pr-4 py-3.5 border border-[#E8DFD8] focus:border-[#C86D51] outline-none shadow-sm transition-colors"
              />
              <Mail className="w-4 h-4 text-[#9B8777] absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#2C2825] hover:bg-[#C86D51] text-white text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-md shrink-0 flex items-center justify-center gap-2"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        <p className="text-[11px] text-[#9B8777] mt-4">
          By signing up, you agree to our privacy policy. You can unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
