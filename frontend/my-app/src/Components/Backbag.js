import React, { useState, useEffect } from 'react'

const Backbag = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('http://localhost:7000/products')
    .then((response) => response.json())
    .then((data) => setProducts(data))
    .catch((error) => console.error('Error fetching products:', error));
  }, []);


  return (
    <div>
      <h1> Back bag </h1>
      {products
        .filter((product) => product.productCategory === 'Backpack')
        .map((product) => (
          <div key={product._id}>
            <img src={product.productImage} alt={product.productName} />
            <p>{product.productName}</p>
          </div>
        ))}
    </div>
  );


}

export default Backbag