
import Navbar from "./components/Navbar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProductListing from "./Pages/ProductListing";
import { CartProvider } from "./context/CartContext";
import CartPage from "./components/CartPage";

function App() {
  return (
    <CartProvider>
     <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductListing/>}/>
        <Route path="/cart" element={<CartPage/>}/>
      </Routes>
    </Router>
    </CartProvider>

  );
}

export default App;
