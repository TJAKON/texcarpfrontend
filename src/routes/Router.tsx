import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import WebsiteLayout from "../layout/WebsiteLayout";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";


const Router = () => {
  return (
    <Routes>
      {/* Layout Route */}
      <Route path="/" element={<WebsiteLayout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="products" element={<Products />} />
        <Route path="blogs" element={<About />} />

        <Route path="/product/:sku" element={<ProductDetails />} />
      </Route>
    </Routes>
  );
};

export default Router;
