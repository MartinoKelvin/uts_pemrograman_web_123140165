import { BrowserRouter , Routes, Route, Navigate } from "react-router-dom"
import { CartProvider } from "./context/CartContext"
import Header from "./components/Header"
import Home from "./pages/Home"
import ProductDetail from "./pages/ProductDetail"
import Cart from "./pages/Cart"
import NotFound from "./components/NotFound"
import Checkout from "./pages/Checkout"
import "./App.css"
import Product from "./pages/Product"

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="bg-[#0F172A] min-h-screen">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product  />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </div>
      </BrowserRouter >
    </CartProvider>
  )
}

export default App
