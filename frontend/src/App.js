import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import ShopCategory from './Pages/ShopCategory';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import kid_banner from './Components/Assets/banner_kids.png'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginSignup />}></Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Shop />}></Route>
            <Route path="/product" element={<Product />}>
              <Route index element={<Product />}></Route>
              <Route path=":productId" element={<Product />}></Route>
            </Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/mens" element={<ShopCategory banner={men_banner} category="men" />} />
            <Route path="/womens" element={<ShopCategory banner={women_banner} category="women" />} />
            <Route path="/kids" element={<ShopCategory banner={kid_banner} category="kid" />} />
            <Route path="/electronic" element={<ShopCategory banner={kid_banner} category="electronic" />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
