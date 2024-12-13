import React, { useState, useEffect } from 'react'

const Backbag = () => {
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
  let display = filteredProducts.length > 0 ? filteredProducts : products;



  return (
    <div>
      <h1> Back bag </h1>
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
      {display
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