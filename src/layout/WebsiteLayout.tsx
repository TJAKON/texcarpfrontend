import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function WebsiteLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className=" w-full mx-auto">
        <Outlet /> {/* just render it directly */}
      </main>
      <Footer />
    </div>
  );
}
