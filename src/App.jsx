import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom"
import { CartProvider } from "./context/CartContext"
import Header from "./components/Header"
import Home from "./pages/Home"
import ProductDetail from "./pages/ProductDetail"
import Cart from "./pages/Cart"
import NotFound from "./components/NotFound"
import Checkout from "./pages/Checkout"
import "./App.css"

function App() {
  return (

    <BrowserRouter>
      <CartProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Router>
      </CartProvider>
   </BrowserRouter>
  )
}

export default App
