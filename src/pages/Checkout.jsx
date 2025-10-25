import { useCart } from "../context/CartContext"
import { Link } from "react-router-dom"

export default function Checkout() {
  const { cartTotal } = useCart()
  const whatsappNumber = "0895621366589"
  const message = `Halo, saya ingin melakukan pembayaran sebesar $${cartTotal.toFixed(2)}`
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0F172A] text-[#F8FAFC] p-4">
      <div className="bg-[#1E293B] p-8 rounded-lg shadow-xl max-w-md w-full text-center">
        <h1 className="text-4xl font-bold mb-4">Checkout Page</h1>
        <p className="mb-4 text-lg">Total Pembayaran: <span className="text-[#38BDF8] font-bold">${cartTotal.toFixed(2)}</span></p>
        <p className="mb-6">Silahkan bayar melalui QRIS berikut:</p>

        <img src="qris.jpg" alt="qris" className="w-full max-w-[320px] mx-auto mb-6 rounded-lg shadow-md" />

        <Link
          to={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-3 px-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold mb-4 transition-colors"
        >
          Kirim Bukti Pembayaran via WhatsApp
        </Link>

        <Link
          to="/cart"
          className="block w-full py-3 px-4 bg-[#38BDF8] hover:bg-sky-500 text-white rounded-lg font-semibold transition-colors"
        >
          Kembali ke Cart
        </Link>
      </div>
    </div>
  )
}