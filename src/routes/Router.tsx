import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import WebsiteLayout from "../layout/WebsiteLayout";
import BroadLoomListing from "../pages/broadloom/Listing";
import BroadloomDetails from "../pages/broadloom/BroadloomDetails";
// import Products from "../pages/Products";
// import ProductDetails from "../pages/ProductDetails";
// import CarpetListing from "../pages/carpetTile/Listing";
// import CarpetDetails from "../pages/carpetTile/CarpetDetails";
// import BroadloomDetailsnext from "../pages/broadloom/BroadloomDetailsnext";

const Router = () => {
  return (
    <Routes>
      {/* Layout Route */}
      <Route path="/" element={<WebsiteLayout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        {/* <Route path="products" element={<Products />} /> */}
        {/* <Route path="carpetTile" element={<CarpetListing />} /> */}
        <Route path="broadloom" element={<BroadLoomListing />} />
        {/* <Route path="products" element={<Products />} /> */}
        {/* <Route path="blogs" element={<About />} /> */}

        {/* <Route path="/product/:sku" element={<ProductDetails />} />
        <Route path="/carpettile/:sku" element={<CarpetDetails />} /> */}
        <Route path="/broadloom/:sku" element={<BroadloomDetails />} />
        {/* <Route path="/broadloomView/:sku" element={<BroadloomDetailsnext/>} /> */}
      </Route>
    </Routes>
  );
};

export default Router;
