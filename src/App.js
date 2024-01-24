import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./store/slices/productsSlice";
import { fetchCategories } from "./store/slices/categoriesSlice";
import { useEffect } from "react";
import AppNavbar from "./components/AppNavbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Carts from "./pages/Carts";
import DetailsProduct from "./pages/DetailsProduct";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);


  return (
    <div className="App">
      <AppNavbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/carts' element={<Carts />} />
        <Route path='/products/:product_id' element={<DetailsProduct />} />
      </Routes>
    </div>
  );
}

export default App;