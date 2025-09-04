import axios from 'axios'
import { useParams } from 'react-router'
import { Link } from 'react-router'
import Header from '../components/Header'
import './TrackingPage.css'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

function TrackingPage({ cart }) {  
  const [order, setOrder] = useState(null)
  const { orderId, productId } = useParams();

  useEffect(() => {
    const fetchTrackingData = async () => {
      const response = await axios.get(`/api/orders/${orderId}?expand=products`)
      setOrder(response.data)
    }
    fetchTrackingData()
  }, [orderId])

  if (!order) { 
    return null 
  }

  const orderProduct = order.products.find((orderProduct) => {
    return orderProduct.productId === productId;
  });

  const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs

  const timePassedMs = dayjs().valueOf() - order.orderTimeMs
  let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) *100
  if (deliveryPercent > 100) {
    deliveryPercent = 100;
  }
  
  let isPreparing = false
  let isShipped = false
  let isDeliverd = false

  if(deliveryPercent < 33){
     isPreparing = true
  }else{if(deliveryPercent >= 33 && deliveryPercent < 100){
     isShipped = true 
  }else{
     isDeliverd = true
  }}

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/tracking-favicon.png" />
      <title>Tracking</title>

      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            {deliveryPercent >= 100 ? 'Delivered on' : 'Arriving on'} {dayjs(orderProduct
              .estimatedDeliveryTimeMs)
              .format('dddd, MMMM D')}
          </div>

          <div className="product-info">
            {orderProduct.product.name}
          </div>

          <div className="product-info">
            Quantity: {orderProduct.quantity}
          </div>

          <img className="product-image" src={orderProduct.product.image} />

          <div className="progress-labels-container">
            <div className={isPreparing ? "progress-label current-status" : "progress-label" }>
              Preparing
            </div>
            <div className={isShipped ? "progress-label current-status" : "progress-label" }>
              Shipped
            </div>
            <div className={isDeliverd ? "progress-label current-status" : "progress-label" }>
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div style={{width: `${deliveryPercent}%`}} className="progress-bar"></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TrackingPage