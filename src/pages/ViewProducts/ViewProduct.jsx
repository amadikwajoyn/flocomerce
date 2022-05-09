import React from 'react'
import Navbox from '../../components/Navbox/Navbox'
import ViewProducts from '../../components/Product/ViewProducts/ViewProducts';
import SideBar from '../../components/SideBar/SideBar'
import './ViewProduct.css';

function ViewProduct() {
  return (
    <div>
        <Navbox />
        <div className="viewproduct-container">
            <SideBar />
            <ViewProducts />
        </div>
        
    </div>
  )
}

export default ViewProduct