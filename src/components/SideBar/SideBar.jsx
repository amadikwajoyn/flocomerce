import React from 'react'
import './SideBar.css'

function SideBar() {
  return (
    <div className="sidebar-nav">
        <div className="sidebar-nav-text">
            <p><a href="dashboard" className="sidebar-a-link">Add Product </a></p>
        </div>
        <div className="sidebar-nav-text">
            <p><a href="view-products" className="sidebar-a-link">View Product </a></p>
        </div>
    
    </div>
    
  )
}

export default SideBar