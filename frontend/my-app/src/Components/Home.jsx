
import React from 'react'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import image1 from '../asset/Screenshot (30).png'
import "./Home.css"
export default function Home() {
    const [products, setProducts] = useState([])
    const [errors, setErrors] = useState(null)
    useEffect(() => {
        fetch('http://localhost:7000/products', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
          .then((response) => {
            if (!response.ok) {
              setErrors(response.statusText)
            }
            return response.json(); 
          })
          .then((data) => {
            const productsArray = Array.isArray(data) ? data : [data]; 
            setProducts(productsArray);
            setErrors(null);
          })
          .catch((error) =>
            setErrors(error.message )
            );
      }, []);
    
      let cnt=0;
  return (
    <div className='home-page'>
      <div className="contact-home">
            <img src={image1} alt="" className='photo' />
        </div>
        <div className="hero">
                <h2 className="animation home">make <br /> new bags</h2>
                <p className="animation">A bags store offers a variety of stylish, functional, and durable bags for all occasions, including travel, work, and casual use.</p>
                <button className="btn btn3 animation">shop now</button> 
            </div>
       {/* image ,3 image */}
      <div className="back-image"></div>
      <h5 className='collection'>FEATURED COLLECTIONS </h5>
      <h1 className='all'>All products </h1>
      <div className="product-container">
    {errors ? (
        <p>Error: {errors}</p>
    ) : (
        products.length > 0 ? (
            (() => {
                 
                return products.map((product) => {
                    if (cnt < 10) {
                        cnt++;
                        return (
                            <div key={product._id}>
                                <img src={product.productImage} alt='' width={200} height={200} />
                                <h3>{product.productName}</h3>
                            </div>
                        );
                    }
                    return null; 
                });
            })()
        ) : (
            <p>No products found</p>
        )
    )}
</div>


      
            <Link to="/allproduct" className='your-link'>
                <button className='btn btn3'>View All</button>
            </Link>

            {/* div for adva */}
            <div className="slider">
              <div className='something'>
                
                <span className='m1'>
                <i class="fa-solid fa-leaf"></i>
                100% Cruelty free
                </span>
                <span className='m2'>
                <i class="fa-solid fa-rotate-right"></i>
                14 days exchange/refund
                </span>
                <span className='m3'>
                <i class="fa-solid fa-user-secret"></i>
                Secure payment
                </span>
            </div>
            </div>


{/* our store */}
            <div className='story'>
            <h2 >OUR STORY </h2>
            <p>"Welcome to Chic Bags, where style meets functionality.
                 Our journey began with a simple idea: to create elegant and practical bags that 
                 cater to modern lifestyles. Whether you’re carrying a laptop, a tote, or a backpack,
                  our mission is to offer chic, durable,
                 and thoughtfully designed solutions for every need."</p>
                 <Link to="/ourstory"className='read'>
                        <span className='read-more'>Read More</span>
                 </Link>
                 <Link to= '/add'>
                 <div className='new-item'>
                  Add a New Item
                 </div>
                 </Link>
                 <button className='btn btn3'>Add Product</button>
            </div>
            
        </div>
  )
}