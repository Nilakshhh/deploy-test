import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Services from "./components/Services/Services";
import Products from "./components/Products/Products";
import About from "./components/About/About";
import Reviews from "./Reviews/Reviews";
import Team from "./components/Team/Team";
import Contact from "./components/Contact/Contact";
import Admin from "./components/Admin/Admin";
import Login from "./components/Login/Login";
import "./App.css";
import PostReview from "./components/PostReview/PostReview";

function App() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  });

  const fetchProducts = async () => {
    try {
      console.log(apiUrl);
      var url = apiUrl + "/admins/product";
      const response = await axios.get(url);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Hero />
                <Services />
                <Products products={products} />
                <About />
                <Reviews />
                <Team />
                <Contact />
                <PostReview />
              </>
            }
          />

          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
