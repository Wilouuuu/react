import { Routes ,Route } from 'react-router'
import OrdersPage from './pages/OrdersPage'
import HomePage from './pages/HomePage'
import CheckoutPage from './pages/checkout/CheckoutPage'
import TrackingPage from './pages/TrackingPage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="checkout" element={<CheckoutPage />} />
      <Route path='orders'  element={<OrdersPage />} />
      <Route path='tracking'  element={<TrackingPage />} />
    </Routes>
  )
}

export default App
