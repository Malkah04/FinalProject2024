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
          const [num, setnum] = useState(1)
    
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
    <div>
      <h1>Tote Bags</h1>
      <p className='text'>
      Chic Bags presents a stunning range of tote bags that blend elegance with everyday utility.
       Perfect for work, shopping, or casual outings, 
       our totes are designed to hold everything you need while making a fashion statement.
        Crafted with high-quality materials and timeless designs,
         these spacious and versatile bags are the ultimate accessory for the modern lifestyle. 
      Carry your essentials in style with Chic Bags' tote collection!
      </p>
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
      <button className='Buton' style={{width:'10%'}} onClick={handleFilter} >
        Apply Filter
      </button>
    </div>
    <div className='product d'>
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
          <div className='count'>
                <span className='p' onClick={() => add(detail._id)}>+</span>
                <span className='n'>{num}</span>
                <span className='m' onClick={() => minus()}>-</span>
              </div>
          <p>Price: {detail.productPrice} LE</p>
          <button className='bt'    onClick={() => AddToCart(detail)}>Add to cart</button>
        
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