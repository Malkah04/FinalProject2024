import React from 'react'
import { useState,useEffect } from 'react'
import './ALLproduct.css';

export default function ALLproduct() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [errors, setErrors] = useState(null);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');


  useEffect(() => {
    fetch('http://localhost:7000/products', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        const productsArray = Array.isArray(data) ? data : [data];
        setProducts(productsArray);
        setErrors(null);
      })
      .catch((error) => setErrors(error.message));
  }, []);

  const handleFilter = () => {
    const min = parseFloat(minPrice) || 0; 
    const max = parseFloat(maxPrice) || Infinity; 

    const filtered = products.filter(
      (product) => product.productPrice >= min && product.productPrice <= max
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className='allproducts'>
     <div className='allproducts2'>
    <h1>All Products</h1>

    <div >
        <label className='min-price '>
          Min Price:
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="0"
          />
        </label>
        <br></br>
        <label className='max-price ' >
          Max Price:
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="1000"
          />
        </label>
        <br></br>
        <button className='Buton' onClick={handleFilter} >
          Apply Filter
        </button>
      </div>

    {errors ? (
      <p>Error: {errors}</p>
    ) : (
      <div >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className='filtered_products' key={product._id}>
              <img 
                src={product.productImage}
                alt={product.productName}
                
              />
              <h3>{product.productName}</h3>
              <p>{product.productDescription}</p>
              <p>Price: ${product.productPrice}</p>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    )}
  </div>
  </div>
);
}
    
  

