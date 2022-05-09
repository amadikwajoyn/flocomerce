import React, {useState} from 'react'
import HomeHero from '../../components/HomeHero/HomeHero'
import Navbox from '../../components/Navbox/Navbox'
import ProductCard from '../../components/Productcard/ProductCard'
import './Home.css'


function Home() {
    const [carts, setCarts] = useState(0)
  return (
    <div>
        <Navbox carts={carts} />
        <HomeHero />
        <h4 className="product-card-title">Lists of Available Products</h4>
        <div className="product-card-container" >
            <ProductCard setCarts={setCarts} />
        </div>
        
    </div>
  )
}

export default Home