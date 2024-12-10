import React, { useEffect, useState } from 'react';

export default function Test() {
  const [products, setProducts] = useState([]); 

  useEffect(() => {
    fetch('http://localhost:7000/products', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        return response.json(); 
      })
      .then((data) => {
        const productsArray = Array.isArray(data) ? data : [data]; 
        setProducts(productsArray);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []); 
  return (
    <div>

      <div style={{ display:"flex",flexWrap:"wrap",gap:"20px" }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '10px',
              padding: '20px',
              maxWidth: '300px',
            }}
          >
            <img
              src={product.productImage}
              alt={product.productName}
              style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
            />
            <h2>{product.productName}</h2>
            <p>Price: {product.productPrice} LE</p>
            <p>{product.productDescription}</p>
            <p>Category: {product.productCategory}</p>
            <p>Available Quantity: {product.productQuantity}</p>
            <p>{product.id}</p>
            
          </div>
        ))}
      </div>
    </div>
  );
}
