import React from 'react'
import Navbox from '../../components/Navbox/Navbox'
import PostProduct from '../../components/Product/PostProduct'
import SideBar from '../../components/SideBar/SideBar'
import './Dashboard.css';

function Dashboard() {
  return (
    <div>
        <Navbox />
        <div className="dashboard-container">
            <SideBar />
            <PostProduct />
        </div>
        
    </div>
  )
}

export default Dashboard