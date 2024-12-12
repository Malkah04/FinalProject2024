import React, { useState, useEffect } from 'react'
import './Laptop.css';

const Laptop = () => {
  const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
  const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
  
  useEffect(() => {
    fetch('http://localhost:7000/products')
    .then((response) => response.json())
    .then((data) => setProducts(data))
    .catch((error) => console.error('Error fetching products:', error));
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
    <div >
      <h1> Laptop Bags</h1>
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
      <div className='product'>
      {filteredProducts
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
