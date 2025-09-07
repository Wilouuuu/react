import MobileLogoWhite from '../assets/images/mobile-logo-white.png'
import LogoWhite from '../assets/images/logo-white.png'
import CartIcon from '../assets/images/icons/cart-icon.png'
import SearchIcon from '../assets/images/icons/search-icon.png'
import { NavLink, useNavigate , useSearchParams } from 'react-router'
import './Header.css'
import { useState } from 'react'

function Header({ cart }) {
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const search = searchParams.get('search')


  const [searchText , setSearchText] = useState( search || '' )


  function headerNavigate(){
     navigate(`/?search=${searchText}`)
       console.log(searchText)
  }

 
  function searchingText(event){
    setSearchText(event.target.value)
  }
  let totalQuantity = 0;

  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity
  })

  return (
    <div className="header">
      <div className="left-section">
        <NavLink to="/" className="header-link">
          <img className="logo"
            src={LogoWhite} />
          <img className="mobile-logo"
            src={MobileLogoWhite} />
        </NavLink>
      </div>

      <div className="middle-section">
        <input
          className="search-bar"
          type="text"
          placeholder="Search"
          onChange={(event) => {
            searchingText(event)
          }} />

        <button className="search-button" onClick={headerNavigate} >
          <img className="search-icon" src={SearchIcon} />
        </button>
      </div>

      <div className="right-section">
        <NavLink className="orders-link header-link" to="/orders">

          <span className="orders-text">Orders</span>
        </NavLink>

        <NavLink className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src={CartIcon} />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </NavLink>
      </div>
    </div>
  )
}

export default Header