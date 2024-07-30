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
import Note from "./Note";

function App() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

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

  useEffect(() => {
    fetchNotes();
  }, []);
  
  const fetchNotes = async () => {
    try{
      console.log(apiUrl);
      var url = apiUrl + "/admins/note";
      const response = await axios.get(url);
      setNotes(response.data);
    }
    catch(error) {
      console.log("Error fetching notes: ", error);
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
                <Note notes={notes} />
                <Services />
                <Products products={products} />
                <Reviews />
                <Team />
                <Contact />
                <PostReview />
                <About />
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
