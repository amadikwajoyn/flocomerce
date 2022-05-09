import React from 'react'
import HomeHero from '../../components/HomeHero/HomeHero'
import Navbox from '../../components/Navbox/Navbox'
import ProductCard from '../../components/Productcard/ProductCard'
import './Home.css'

function Home() {
  return (
    <div>
        <Navbox />
        <HomeHero />
        <h4 className="product-card-title">Lists of Available Products</h4>
        <div className="product-card-container" >
            <ProductCard />
        </div>
        
    </div>
  )
}

export default Home