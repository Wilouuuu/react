import { useState } from "react";
import { formatMoney } from "../../utils/money";
import axios from "axios"

function CartItemDetails({ cartItem , deleteCartItem , loadCart}) {
  const [quantity ,setQuantity] = useState(cartItem.quantity);
  const [ Update , setUpdate ] = useState(false);

 

  async function switchUpdate(){
    if(Update){
      setUpdate(false)
      await axios.put(`/api/cart-items/${cartItem.productId} ` ,{
        quantity: quantity
      })
      await loadCart();
    }else{
       setUpdate(true)
    }
     
  };

  return (
    <>
      <img className="product-image"
        src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">
          {cartItem.product.name}
        </div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity: <input 
              onKeyDown={(event) => {
                if(event.key === 'Enter')
                  switchUpdate();
                if(event.key === 'Escape')
                  setUpdate(false)
              }
             }
                
              className={ Update ? "quantity-number" : "quantity-number-hide"} type="text"  
              value={quantity} 
              onChange={(event) => {
              const updatedQuantity = event.target.value
              setQuantity(Number(updatedQuantity))
            }}/><span className="quantity-label">{cartItem.quantity}</span>
          </span>
          <span className="update-quantity-link link-primary" 
            onClick={switchUpdate} 
            >
            Update
          </span>
          <span className="delete-quantity-link link-primary"
            onClick={deleteCartItem} >
            Delete
          </span>
        </div>
      </div>
    </>
  );
}

export default CartItemDetails