import ProductListing from "../components/ProductListing"
import { Link } from "react-router-dom"

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-[#0F172A] overflow-x-hidden text-[#F8FAFC]">
      {/* Hero */}
      <section className="relative pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
              Martino Mart — Futuristic Shopping Experience
            </h1>
            <p className="text-slate-400 mb-6 max-w-xl">
              Clean, fast, and curated selection of products. Discover top-quality items with an intuitive shopping flow — designed for modern buyers.
            </p>

            <div className="flex items-center gap-4">
              <Link
                to="/product"
                className="inline-flex items-center gap-3 px-6 py-3 bg-[#38BDF8] text-[#0F172A] font-semibold rounded-lg shadow hover:bg-sky-500 transition"
              >
                Shop Now
              </Link>
              <Link
                to="/checkout"
                className="inline-flex items-center gap-2 px-5 py-3 border border-slate-700 text-[#F8FAFC] rounded-lg hover:bg-slate-800 transition"
              >
                Checkout
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-md">
              <div className="bg-[#1E293B] p-3 rounded-lg text-sm text-slate-300">
                <strong className="text-[#38BDF8]">Fast Delivery</strong>
                <div className="mt-1">Reliable shipping and tracking.</div>
              </div>
              <div className="bg-[#1E293B] p-3 rounded-lg text-sm text-slate-300">
                <strong className="text-[#38BDF8]">Secure Payment</strong>
                <div className="mt-1">Multiple secure payment options.</div>
              </div>
              <div className="bg-[#1E293B] p-3 rounded-lg text-sm text-slate-300">
                <strong className="text-[#38BDF8]">24/7 Support</strong>
                <div className="mt-1">We're here to help anytime.</div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-[#1E293B] rounded-xl p-6 shadow-lg border border-slate-700">
              <img
                src="/martino-mart.png"
                alt="Featured"
                className="w-full h-64 object-contain rounded-md"
              />
            </div>
          </div>
        </div>
      </section>

    
    </main>
  )
}