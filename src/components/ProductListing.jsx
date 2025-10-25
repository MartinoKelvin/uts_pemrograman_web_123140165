"use client"

import { useState, useEffect } from "react"
import { Loader2, AlertCircle } from "lucide-react"
import { useCart } from "../context/CartContext"
import ProductCard from "./ProductCart"

export default function ProductListing() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const { addToCart } = useCart()

  // Fetch products and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [productsRes, categoriesRes] = await Promise.all([
          fetch("https://fakestoreapi.com/products"),
          fetch("https://fakestoreapi.com/products/categories"),
        ])

        if (!productsRes.ok || !categoriesRes.ok) {
          throw new Error("Failed to fetch data")
        }

        const productsData = await productsRes.json()
        const categoriesData = await categoriesRes.json()

        setProducts(productsData)
        setCategories(categoriesData)
        setError(null)
      } catch (err) {
        setError(err.message || "Failed to load products")
        console.error("Error fetching products:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filter and sort products
  useEffect(() => {
    let filtered = products

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    // Filter by price range
    filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
        break
      case "featured":
      default:
        // Keep original order
        break
    }

    setFilteredProducts(filtered)
  }, [products, selectedCategory, priceRange, sortBy])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-[#0F172A]">
        <div className="bg-[#1E293B] border border-slate-700 rounded-lg p-6 max-w-md">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="text-red-500" size={24} />
            <h3 className="font-semibold text-[#F8FAFC]">Error Loading Products</h3>
          </div>
          <p className="text-slate-400">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-[#0F172A] text-[#F8FAFC] min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-[#F8FAFC]">Shopping Page</h1>
        <p className="text-slate-400">Browse our collection of quality products</p>
      </div>

      <div className="flex gap-6">
        {/* Filters Sidebar */}
        <aside className={`${showFilters ? "block" : "hidden"} md:block w-full md:w-64 flex-shrink-0`}>
          <div className="bg-[#1E293B] border border-slate-700 rounded-lg p-6 sticky top-20">
            <div className="flex justify-between items-center mb-4 md:hidden">
              <h2 className="font-semibold">Filters</h2>
              <button
                onClick={() => setShowFilters(false)}
                className="text-muted-foreground hover:text-foreground transition"
                aria-label="Close filters"
              >
                ✕
              </button>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3 text-[#38BDF8]">Category</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer hover:text-primary transition">
                  <input
                    type="radio"
                    name="category"
                    value="all"
                    checked={selectedCategory === "all"}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-4 h-4"
                    aria-label="All categories"
                  />
                  <span className="text-sm">All Categories</span>
                </label>
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer hover:text-primary transition">
                    <input
                      type="radio"
                      name="category"
                      value={cat}
                      checked={selectedCategory === cat}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-4 h-4"
                      aria-label={`Filter by ${cat}`}
                    />
                    <span className="text-sm capitalize">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3 text-[#38BDF8]">Price Range</h3>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                  className="w-full accent-[#38BDF8]"
                  aria-label="Price range slider"
                />
                <div className="flex justify-between text-sm text-slate-400">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Sort */}
            <div>
              <h3 className="font-semibold mb-3 text-[#38BDF8]">Sort By</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-slate-700 rounded-lg bg-[#0F172A] text-[#F8FAFC]"
                aria-label="Sort products"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden mb-4 px-4 py-2 border border-slate-700 rounded-lg bg-[#1E293B] hover:bg-slate-800 text-[#F8FAFC] transition"
            aria-label={showFilters ? "Hide filters" : "Show filters"}
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="animate-spin text-[#38BDF8]" size={32} aria-label="Loading products" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12 bg-[#1E293B] rounded-lg border border-slate-700">
              <p className="text-[#F8FAFC] mb-2">No products found</p>
              <p className="text-sm text-slate-400">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
