
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './Components/Header';
import Product from './Components/Product';
import ProductCart from './Components/ProductCart';
import ProductDetail from './Components/ProductDetail';
import { Provider } from 'react-redux';
import store from "./Redux/store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          
          <Route path='/' element={<Product />} />
          <Route path="/productDetail/:id" element={<ProductDetail />} />
          <Route path='/cart' element={<ProductCart />} />
        </Routes>
      </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
