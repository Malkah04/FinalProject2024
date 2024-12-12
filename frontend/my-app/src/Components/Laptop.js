import React, { useState, useEffect } from 'react'
import './Laptop.css';

const Laptop = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('http://localhost:7000/products')
    .then((response) => response.json())
    .then((data) => setProducts(data))
    .catch((error) => console.error('Error fetching products:', error));
  }, []);


  return (
    <div >
      <h1> Laptop Bags</h1>
      <div className='product'>
      {products
        .filter((product) => product.productCategory === 'laptop')
        .map((product) => (
          <div className='product_id' key={product._id}>
            <img  src={product.productImage} alt={product.productName} />
            <p className='product_name' >{product.productName}</p>
            <p className='product_price' >Price: {product.productPrice}</p>
          </div>
        ))}
    </div>
    </div>
  );


}

export default  Laptop ;
