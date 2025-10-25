"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Loader2, AlertCircle, Star, ShoppingCart, ArrowLeft } from "lucide-react"
import { useCart } from "../context/CartContext"

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const res = await fetch(`https://fakestoreapi.com/products/${id}`)
        if (!res.ok) throw new Error("Product not found")
        const data = await res.json()
        setProduct(data)
        setError(null)
      } catch (err) {
        setError(err.message || "Failed to load product")
        console.error("Error fetching product:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-[#0F172A]">
        <div className="bg-[#1E293B] border border-slate-700 rounded-lg p-6 max-w-md">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="text-red-500" size={24} />
            <h3 className="font-semibold text-[#F8FAFC]">Error</h3>
          </div>
          <p className="text-slate-400 mb-4">{error}</p>
          <Link to="/" className="text-[#38BDF8] hover:text-sky-400 transition-colors">
            Back to Shop
          </Link>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F172A]">
        <Loader2 className="animate-spin text-[#38BDF8]" size={32} />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-[#0F172A]">
        <div className="text-center">
          <p className="text-slate-400 mb-4">Product not found</p>
          <Link to="/" className="text-[#38BDF8] hover:text-sky-400 transition-colors">
            Back to Shop
          </Link>
        </div>
      </div>
    )
  }

  const rating = product.rating?.rate || 0
  const ratingCount = product.rating?.count || 0

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link to="/" className="flex items-center gap-2 text-[#38BDF8] hover:text-sky-400 transition-colors mb-8">
          <ArrowLeft size={20} />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-[#1E293B] border border-slate-700 rounded-lg p-8 flex items-center justify-center min-h-96">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              className="max-w-full max-h-96 object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            {/* Category */}
            <p className="text-sm text-slate-400 capitalize mb-2">{product.category}</p>

            {/* Title */}
            <h1 className="text-3xl font-bold mb-4 text-[#F8FAFC]">{product.title}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={i < Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {rating.toFixed(1)} ({ratingCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <p className="text-4xl font-bold text-[#38BDF8]">${product.price.toFixed(2)}</p>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="font-semibold mb-2 text-[#38BDF8]">Description</h2>
              <p className="text-slate-300 leading-relaxed">{product.description}</p>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-[#38BDF8]">Quantity</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 border border-slate-700 rounded-lg bg-[#1E293B] text-[#F8FAFC] hover:bg-slate-800 transition"
                >
                  −
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                  className="w-16 px-3 py-2 border border-slate-700 rounded-lg text-center bg-[#1E293B] text-[#F8FAFC]"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 border border-slate-700 rounded-lg bg-[#1E293B] text-[#F8FAFC] hover:bg-slate-800 transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 mb-4 ${
                added
                  ? "bg-green-500 text-[#F8FAFC] hover:bg-green-600"
                  : "bg-[#38BDF8] text-[#F8FAFC] hover:bg-sky-500"
              }`}
            >
              <ShoppingCart size={20} />
              {added ? "Added to Cart!" : "Add to Cart"}
            </button>

            {/* Stock Info */}
            <div className="bg-[#1E293B] border border-slate-700 rounded-lg p-4">
              <p className="text-sm text-slate-300">
                <span className="font-semibold text-[#38BDF8]">In Stock:</span> Available for immediate delivery
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
