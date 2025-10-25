"use client"

import { Link } from "react-router-dom"
import { Star, ShoppingCart } from "lucide-react"
import { useCart } from "../context/CartContext"
import { useState } from "react"

export default function ProductCard({ product, addCart }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const handleAddToCart = (e) => {
    e.preventDefault()
    if (addCart) {
      addCart(product, 1)
    } else {
      addToCart(product, 1)
    }
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <Link to={`/product/${product.id}`}>
      <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
        <div className="bg-muted h-48 flex items-center justify-center overflow-hidden">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            className="w-full h-full object-contain p-4 hover:scale-105 transition-transform"
          />
        </div>

        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-semibold text-sm line-clamp-2 mb-2">{product.title}</h3>

          <div className="flex items-center gap-1 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={
                    i < Math.round(product.rating?.rate || 0)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground"
                  }
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">({product.rating?.count || 0})</span>
          </div>

          <div className="mb-4 mt-auto">
            <p className="text-lg font-bold text-primary">${product.price.toFixed(2)}</p>
          </div>

          <button
            onClick={handleAddToCart}
            className={`w-full py-2 px-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
              added
                ? "bg-green-500 text-[#F8FAFC] hover:bg-green-600"
                : "bg-[#38BDF8] text-[#F8FAFC] hover:bg-sky-500"
            }`}
          >
            <ShoppingCart size={16} />
            {added ? "Added!" : "Add to Cart"}
          </button>
        </div>
      </div>
    </Link>
  )
}
