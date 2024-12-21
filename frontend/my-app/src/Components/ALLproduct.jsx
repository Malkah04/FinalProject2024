import React, { useState, useEffect } from 'react';
import './ALLproduct.css';

export default function ALLproduct() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [errors, setErrors] = useState(null);
  const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [detail, setDetail] = useState(null);
  const [id, setId] = useState(null);
  const [visiable, setvisiable] = useState(false);

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

    const filtered = products.filter((product) => {
      const matchesCategory = category === "all" || product.productCategory === category;
      const matchesPrice = product.productPrice >= min && product.productPrice <= max;
      const matchesSearchQuery = product.productName.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesPrice && matchesSearchQuery;
    });

    setFilteredProducts(filtered);
  };

  let display = filteredProducts.length > 0 ? filteredProducts : products;

  const details = (id) => {
    setId(id);
    setvisiable(true);
  };

  const closeDetails = () => {
    setvisiable(false); 
  };

  useEffect(() => {
    if (id) {
      const pro = products.find((product) => product._id === id);
      setDetail(pro);
    }
  }, [id]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleFilter();
    }
  };

  const AddToCart = (detail) => {
    const EmptyCart = {
      cartItems: [
        

      ],

      
      totalItems: 0,
      totalPrice: 0
    };
   
   
    let loccart = localStorage.getItem('cart');

const Mycart = JSON.parse (loccart) ? JSON.parse(loccart) : EmptyCart;


Mycart.cartItems.push(detail);
Mycart.totalItems +=1;
Mycart.totalPrice = parseInt(Mycart.totalPrice) +parseInt (detail.productPrice);

    
    alert(`Added ${detail.productName} to the cart`) 
    
    
    localStorage.setItem('cart', JSON.stringify(Mycart));
   

  }; 

  return (
    <div className='allproducts'>
      <div className='allproducts2'>
        <h1>All Products</h1>

        <div className="search-container">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Search for a product"
          />
        </div>

        <div className='filters'>
          <div className="filter-item">
            <label>Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">All</option>
              <option value="Backpack">Backpack Bags</option>
              <option value="laptop">Laptop Bags</option>
              <option value="tote">Tote Bags</option>
            </select>
          </div>
          
          <div className='filter-item'>
            <label>Min Price:</label>
            <input
              className="price-input"
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="0"
            />
          </div>

          <div className='filter-item'>
            <label>Max Price:</label>
            <input
              className="price-input"
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="1000"
            />
          </div>

          <button className='Buton' onClick={handleFilter}>
            Apply Filter
          </button>
        </div>

        {errors ? (
          <p>Error: {errors}</p>
        ) : (
          <div className='d' style={{ display: "flex", textAlign: "center", alignItems: "center" }}>
            {display.length > 0 ? (
              display.map((product) => (
                <div className='filtered_products s' key={product.id}>
                  <img
                    src={product.productImage}
                    alt={product.productName}
                  />
                  <p className="plus" onClick={() => details(product._id)}>+</p>
                  <h3>{product.productName}</h3>
                  <p className='price'>{product.productPrice}LE</p>
                </div>
              ))
            ) : (
              <p>No products found</p>
            )}
          </div>
        )}

        {visiable && (
          <div className="detail">
            {id && detail && (
              <div>
                <div className='close'>
                  <i onClick={() => closeDetails()} className="fa-solid fa-x"></i>
                </div>
                <h2>{detail.productName}</h2>
                <img src={detail.productImage} alt={detail.productName} />
                <p>{detail.productDescription}</p>
                <p className='detial-price'>Price: {detail.productPrice} LE</p>
                <button className='bt'    onClick={() => AddToCart(detail)}>Add to cart</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
