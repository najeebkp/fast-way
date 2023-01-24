import "./App.css";
import ProductList from "./Components/ProductList";
import NavBar from "./Components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductListPage from "./Pages/ProductListPage";
import ProductDetailPage from "./Pages/ProductDetailPage";
import CartPage from "./Pages/CartPage";
import { GlobalContextProvider } from "./Components/Context/GlobalContextProvider";

function App() {
  return (
    <GlobalContextProvider>
      <div className="App">
        <div>
          <Router>
            <NavBar />
            <Routes>
              <Route path="/" element={<ProductListPage />} />
              <Route path="/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </Router>
        </div>
      </div>
    </GlobalContextProvider>
  );
}

export default App;
