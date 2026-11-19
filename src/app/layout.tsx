import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Deco Flower Casa | Scandinavian Modern Home Living & Furniture",
  description: "Explore curated Scandinavian & Japandi modern furniture, home decor, ergonomic desks, lighting, cozy rugs, and organization solutions at Deco Flower Casa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakartaSans.variable} ${playfairDisplay.variable}`}>
      <body className="min-h-screen bg-[#FDFBF7] text-[#2C2825] font-sans antialiased selection:bg-[#E8DCC4] selection:text-[#1A1816]">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <div className="flex flex-col min-h-screen">
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
