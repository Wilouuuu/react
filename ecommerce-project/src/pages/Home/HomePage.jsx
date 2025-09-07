import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import axios from 'axios'
import Header from "../../components/Header"
import ProductsGrid from './productsGrid'
import "./HomePage.css"

function HomePage({ cart , loadCart }) {

  window.axios = axios;
  const [products, setProducts] = useState([])
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');

  useEffect(() => {
    const getHomeData = async () => {
      const URLpath = search ? `/api/products?search=${search}` : '/api/products';
      const response = await axios.get(URLpath)
      setProducts(response.data)
    };
    getHomeData();
  }, [search])

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