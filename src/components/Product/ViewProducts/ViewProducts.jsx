import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import "./ViewProducts.css";

function ViewProducts() {
  const userData = JSON.parse(localStorage.getItem("chomp-food-user")) || null;
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
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

  const deleteProducts = async (id) => {
    setLoading(true);
    try {
      const { data } = await axios.delete(
        `https://chomp-food.herokuapp.com/admin/deleteitem/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userData.data.token}`,
          },
        }
      );
      console.log(data)
      const items = products.filter((item) => item.id !== id);
      setProducts(items);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error.response);
    }
  };
  useEffect(() => {
    getProducts();
  });
  return (
    <div className="view-product">
      {loading && <p className="text-center">Loading...</p>}
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Image</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.length ?
            products.map((item, i) => (
              <tr key={item.id}>
                <td>{i + 1}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.image}</td>
                <td
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={() => deleteProducts(item.id)}
                >
                  X
                </td>
              </tr>
            )) : null}
        </tbody>
      </Table>
    </div>
  );
}

export default ViewProducts;
