import React from 'react'
import  { useState, useEffect } from 'react'
import './Tote.css'


const Tote = () => {

  const [products, setProducts] = useState([]);
      const [filteredProducts, setFilteredProducts] = useState([]);
    const [minPrice, setMinPrice] = useState('');
      const [maxPrice, setMaxPrice] = useState('');
         const [detail, setDetail] = useState(null);
          const [id, setId] = useState(null)
          const [visiable, setvisiable] = useState(false)
    
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
    let display = filteredProducts.length > 0 ? filteredProducts : products;

  
  
  return (
    <div>
      <h1>Tote Bags</h1>
    <div >
      <div className="in">
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
      </div>
      <br></br>
      <button className='Buton' onClick={handleFilter} >
        Apply Filter
      </button>
    </div>
    <div className='product'>
    {display
      .filter((product) => product.productCategory === 'tote')
      .map((product) => (
        <div className='prod s' key={product._id}>
          <img  src={product.productImage} alt={product.productName} />
          <p className="pl" onClick={() => details(product._id)}>+</p>
          <p className='product_name' >{product.productName}</p>
          <p className='product_price' > {product.productPrice}LE</p>
        </div>
      ))}
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
          <button className='bt'>Add to cart</button>
        
        </div>
      )}
    </div>):
    (null)
    }
  </div>
  </div>
  )
}

export default Tote