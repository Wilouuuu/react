import { useEffect , useState } from 'react'
import axios from 'axios'
import { Routes, Route } from 'react-router'
import OrdersPage from './pages/OrdersPage'
import HomePage from './pages/HomePage'
import CheckoutPage from './pages/checkout/CheckoutPage'
import TrackingPage from './pages/TrackingPage'
import NotFound from './pages/NotFound'
import './App.css'

function App() {
  const [cart, setCart] = useState([])

  useEffect(() => {
    axios.get('/api/cart-items?expand=product')
      .then((response) => {
        setCart(response.data);
      })
  }, [])


  return (
    <Routes>
      <Route index element={<HomePage cart={cart} />} />
      <Route path="checkout" element={<CheckoutPage cart={cart}  />} />
      <Route path='orders' element={<OrdersPage />} />
      <Route path='tracking' element={<TrackingPage />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
