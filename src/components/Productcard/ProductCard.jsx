import React, { useEffect, useState } from 'react'
import { Card, Button, Row, Col  } from 'react-bootstrap'
import axios from "axios";
import './ProductCard.css'

function ProductCard() {

const userData = JSON.parse(localStorage.getItem("chomp-food-user")) || null;
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
//   const [cart, setCart] = useState()
  const getProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://chomp-food.herokuapp.com/admin/getallproducts",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userData.data.token}`,
          },
        }
      );
      setProducts(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error.response);
    }
  };

  const addToCart = async (menuId) => {
    setLoading(true);
    try {
      const { data } = await axios.delete(
        `https://chomp-food.herokuapp.com/user/add/${menuId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userData.data.token}`,
          },
        }
      );
      console.log(data)
      const items = products.filter((item) => item.id !== menuId);
      setProducts(items);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error.response);
    }
  };
  

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <div className="product-card-container">
      {loading && <p className="text-center">Loading...</p>}
        <Row>
          {products.length ?
            products.map((item, i) => (
                <Col xs={12} lg={3} md={4} sm={12} className="product-card-col" key={item.id}>
                    <Card style={{ width: '100%' }} >
                        <Card.Img variant="top" className="product-card-img" src={item.image} />
                        <Card.Body>
                            <Card.Title>{item.name}</Card.Title>
                            <Card.Text>
                            {item.description}
                            </Card.Text>
                            <Button variant="primary" onClick={() => addToCart(item.id)}>Add to cart</Button>
                            
                        </Card.Body>
                    </Card>
                </Col>
            )) : null}
        </Row>
    </div>
  )
}

export default ProductCard