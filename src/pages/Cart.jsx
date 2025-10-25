"use client"

import { Link } from "react-router-dom"
import { Trash2, Plus, Minus, ArrowLeft, ShoppingCart } from "lucide-react"
import { useCart } from "../context/CartContext"

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart()

  const TAX_RATE = 0.08
  const SHIPPING_COST = cart.length > 0 ? 10 : 0
  const tax = cartTotal * TAX_RATE
  const total = cartTotal + tax + SHIPPING_COST

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-[#0F172A]">
        <div className="text-center">
          <ShoppingCart size={48} className="mx-auto text-[#38BDF8] mb-4" />
          <h1 className="text-2xl font-bold mb-2 text-[#F8FAFC]">Your cart is empty</h1>
          <p className="text-slate-400 mb-6">Start shopping to add items to your cart</p>
          <Link
            to="/product"
            className="inline-block px-6 py-2 bg-[#38BDF8] text-[#F8FAFC] rounded-lg hover:bg-sky-500 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link to="/product" className="flex items-center gap-2 text-[#38BDF8] hover:text-sky-400 transition-colors mb-8">
          <ArrowLeft size={20} />
          Continue Shopping
        </Link>

        <h1 className="text-3xl font-bold mb-8 text-[#F8FAFC]">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-[#1E293B] border border-slate-700 rounded-lg overflow-hidden">
              {/* Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-slate-800 border-b border-slate-700 font-semibold text-sm">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Price</div>
                <div className="col-span-2 text-right">Action</div>
              </div>

              {/* Cart Items List */}
              <div className="divide-y divide-slate-700">
                {cart.map((item) => (
                  <div key={item.id} className="p-6 hover:bg-slate-800/50 transition">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      {/* Product Info */}
                      <div className="md:col-span-6 flex gap-4">
                        <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            className="w-full h-full object-contain p-2"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold line-clamp-2">{item.title}</h3>
                          <p className="text-sm text-muted-foreground capitalize">{item.category}</p>
                        </div>
                      </div>

                      {/* Quantity */}
                      <div className="md:col-span-2 flex items-center justify-center">
                        <div className="flex items-center gap-2 border border-slate-700 rounded-lg bg-slate-800">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-muted transition"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-muted transition"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="md:col-span-2 text-right">
                        <p className="font-semibold text-[#38BDF8]">${(item.price * item.quantity).toFixed(2)}</p>
                        <p className="text-xs text-slate-400">${item.price.toFixed(2)} each</p>
                      </div>

                      {/* Remove Button */}
                      <div className="md:col-span-2 flex justify-end">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Clear Cart Button */}
              <div className="px-6 py-4 bg-slate-800 border-t border-slate-700">
                <button
                  onClick={clearCart}
                  className="text-red-400 hover:text-red-300 text-sm font-medium transition"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#1E293B] border border-slate-700 rounded-lg p-6 sticky top-20">
              <h2 className="text-xl font-bold mb-6 text-[#F8FAFC]">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (8%)</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-semibold">${SHIPPING_COST.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-slate-700 pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="font-bold text-[#F8FAFC]">Total</span>
                  <span className="text-2xl font-bold text-[#38BDF8]">${total.toFixed(2)}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full py-3 bg-[#38BDF8] text-[#F8FAFC] rounded-lg font-semibold hover:bg-sky-500 transition block text-center mb-3"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
