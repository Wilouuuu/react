import { useEffect, useState } from 'react'
import axios from 'axios'
import Header from "../../components/Header"
import ProductsGrid from './productsGrid'
import "./HomePage.css"

function HomePage({ cart , loadCart }) {

  window.axios = axios;
  const [products, setProducts] = useState([])

  useEffect(() => {
    const getHomeData = async () => {
      const response = await axios.get('/api/products')
      setProducts(response.data)
    };
    getHomeData();
  }, [])

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />
      <title>Ecommerce Project</title>

      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  )
}
export default HomePage