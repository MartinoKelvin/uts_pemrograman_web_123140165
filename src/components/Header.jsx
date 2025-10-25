"use client"

import { Link } from "react-router-dom"
import { ShoppingCart, Menu, X } from "lucide-react"
import { useCart } from "../context/CartContext"
import { useState } from "react"

export default function Header() {
  const { cartCount } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-[#1E293B] border-b border-slate-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#38BDF8] rounded-lg flex items-center justify-center">
              <span className="text-[#F8FAFC] font-bold text-lg">M</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline text-[#F8FAFC]">Martino Mart</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-[#F8FAFC] hover:text-[#38BDF8] transition">
              Shop
            </Link>
            <Link to="/checkout" className="text-[#F8FAFC] hover:text-[#38BDF8] transition">
              Checkout
            </Link>
          </nav>

          <Link
            to="/cart"
            className="relative flex items-center gap-2 px-4 py-2 rounded-lg bg-[#38BDF8] text-[#F8FAFC] hover:bg-sky-500 transition"
          >
            <ShoppingCart size={20} />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-[#F8FAFC] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-[#F8FAFC]">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-4">
            <Link to="/" className="text-[#F8FAFC] hover:text-[#38BDF8] transition">
              Shop
            </Link>
            <Link to="/checkout" className="text-[#F8FAFC] hover:text-[#38BDF8] transition">
              Checkout
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
