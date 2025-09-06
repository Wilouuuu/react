import { useEffect, useState } from 'react'
import axios from 'axios'
import { Routes, Route } from 'react-router'
import OrdersPage from './pages/orders/OrdersPage'
import HomePage from './pages/Home/HomePage'
import CheckoutPage from './pages/checkout/CheckoutPage'
import TrackingPage from './pages/TrackingPage'
import NotFound from './pages/NotFound'
import './App.css'

function App() {
  const [cart, setCart] = useState([])

  const loadCart = async () => {
      const response = await axios.get('/api/cart-items?expand=product')
      setCart(response.data);
    };

  useEffect(() => {
    loadCart();
  }, [])


  return (
    <Routes>
      <Route index element={<HomePage cart={cart} loadCart={loadCart}/>} />
      <Route path="checkout" element={<CheckoutPage cart={cart} />} />
      <Route path='orders' element={<OrdersPage cart={cart} />} />
      <Route path='tracking/:orderId/:productId' element={<TrackingPage cart={cart} />} />
      <Route path='*' element={<NotFound cart={cart} />}  />
    </Routes>
  )
}

export default App
