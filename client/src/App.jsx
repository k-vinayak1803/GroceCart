import { Route, Routes, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import LoginForm from "./components/Login";
import { useAppContext } from "./context/AppContext";
import AllProducts from "./pages/AllProducts";
import ProductCategory from "./pages/ProductCategory";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import AddAddress from "./pages/AddAddress";
import MyOrders from "./pages/MyOrders";
import SellerLogin from "./components/seller/SellerLogin";
import SellerLayout from "./pages/seller/SellerLayout";
import AddProduct from "./components/seller/AddProduct";
import ProductList from "./components/seller/ProductList";
import Orders from "./components/seller/Orders";
import ContactPage from "./pages/Contact";
import PaymentSuccess from "./pages/PaymenySuccess";
import UpdateProduct from "./components/seller/EditProduct";

function App() {

  const isSellerPath = useLocation().pathname.includes('seller');
  const { showUserLogin, isSeller } = useAppContext()

  return (
    <div className="text-default min-h-screen text-gray-700 bg-white">
      {isSellerPath ? null : <Navbar />}
            <main className="flex-grow">
        {/* Your page content */}

      {showUserLogin ? <LoginForm /> : null}
      <Toaster />
      <div className={isSellerPath ? ' ' : `px-16 md:px-16 lg:px-24 xl:px-32`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/products/:category/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-address" element={<AddAddress />} />
          <Route path="/my-orders" element={<MyOrders />} />
    <Route path="/payment-success" element={<PaymentSuccess />} />

        <Route path="/seller" element={isSeller ? <SellerLayout /> : <SellerLogin />} >
          <Route index element={isSeller ? <AddProduct /> : null} />
          <Route path="update/:id" element={<UpdateProduct />} />
          <Route path="product-list" element={<ProductList />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>
    </div>
      </main>
    { !isSellerPath && <Footer /> }
    </div >
  )
}

export default App
