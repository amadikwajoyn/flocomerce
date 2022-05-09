import React from 'react'
import Checkout from '../../components/Checkout/Checkout'
import Navbox from '../../components/Navbox/Navbox'
import './Checkouts.css'

function Checkouts() {
  return (
    <div>
        <Navbox />
        <div className="product-card-container" >
          <Checkout />
        </div>
        
    </div>
  )
}

export default Checkouts