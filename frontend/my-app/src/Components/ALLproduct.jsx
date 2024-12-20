import React from 'react'
import { useState,useEffect } from 'react'
import './ALLproduct.css';


export default function ALLproduct() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [errors, setErrors] = useState(null);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [detail, setDetail] = useState(null);
  const [id, setId] = useState(null);
  const [visiable, setvisiable] = useState(false);
  const [loading, setLoading] = useState(false);


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



  const addToCart = async (productId, productQuantity) => {
    setLoading(true);

    try {
      const response = await fetch('http://localhost:7000/products', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // userId,
          productId,
          productQuantity, 
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Cart updated:", data.cart);
      } else {
        console.error("Failed to add to cart");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className='allproducts'>
     <div className='allproducts2'>
    <h1>All Products</h1>

    <div  className='in'>
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
      </div>
      <button className='Buton' onClick={handleFilter} style={{marginButtom:"0px"}}  >
          Apply Filter
        </button>

      
  

    {errors ? (
      <p>Error: {errors}</p>
    ) : (
      <div className='d' style={{ display: "flex", textAlign: "center" ,alignItems: "center"}} >
        {display.length > 0 ? (
          display.map((product) => (
            <div className='filtered_products s' key={product.id}>
              <img 

                src={product.productImage}
                alt={product.productName}
                
              />
              <p className="plus" onClick={() => details(product._id)}>+</p>
              <h3>{product.productName}</h3>
              <p>{product.productPrice}LE</p>
           

            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    )} 
    {visiable? ( <div className="detail">
          {id && detail && (
            <div>
              <div className='close'>
              <i  onClick={() => closeDetails()} class="fa-solid fa-x"></i>
              </div>
              <h2>{detail.productName}</h2>
              <img src={detail.productImage} alt={detail.productName} />
              <p>{detail.productDescription}</p>
              <p>Price: {detail.productPrice} LE</p>
              <button
              className="bt"
              onClick={() => addToCart(ALLproduct._id, 1, ALLproduct.price)}
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add to Cart'}
            </button>
            </div>
          )}
        </div>):
        (null)
        }
       
  </div>
  </div>
);
}
    
  

