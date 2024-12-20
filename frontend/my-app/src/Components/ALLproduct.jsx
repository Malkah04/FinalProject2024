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
  const [id, setId] = useState(null)
  const [visiable, setvisiable] = useState(false)
  const [num, setnum] = useState(1)


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
    setnum(1);
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

  function add(id){
    let pro=products.find((product) => product._id === id);
    if (!pro) {
      return;
    }
    if(pro.productQuantity>num){
      setnum(num+1);
    }
  }
  function minus(){
    if(num>1){
      setnum(num-1);
    }
  }


  

  

  return (
    <div className='allproducts'>
     <div className='allproducts2'>
    <h1>All Products</h1>
     <p  className='text'>Welcome to Chic Bags' All Products collection, where style meets versatility. 
      Explore our wide range of bags crafted for every occasion,
       from chic totes to functional backpacks and elegant laptop bags. 
       Each piece combines premium materials with thoughtful designs to meet the needs of your modern 
       lifestyle. Whether you're heading to work, traveling, or enjoying a casual day out,
        our collection offers something special for everyone.
       Discover the perfect bag to complement your look and elevate your everyday essentials.</p>
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
              <p className='price' style={{color:' #9f0f5dd6;'}}>{product.productPrice}LE</p>
           

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
              <div className='count'>
                <span className='p' onClick={() => add(detail._id)}>+</span>
                <span className='n'>{num}</span>
                <span className='m' onClick={() => minus()}>-</span>
              </div>
              <button className='bt'>Add to cart</button>

            </div>
          )}
        </div>):
        (null)
        }
       
  </div>
  </div>
);
}
    
  

