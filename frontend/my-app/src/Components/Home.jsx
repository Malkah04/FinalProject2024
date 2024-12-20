import React from 'react'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'

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
    <div>
       {/* image ,3 image */}
       <h5>FEATURED COLLECTIONS </h5>
       <h1>all product </h1>
       {errors ? (
                <p>Error: {errors}</p>
            ) : (
                products.length > 0 ? (
                    products.map((product) => (
                        cnt < 10 ? (
                            <div key={product._id}>
                                <img src={product.productImage} alt='' />
                                <h3>{product.productName}</h3>
                                {cnt++}
                            </div>
                        ) : null
                    ))
                ) : (
                    <p>No products found</p>
                )
            )}
            <Link to="/allproduct">
                <button>View All</button>
            </Link>

            {/* div for adva */}
            <div className='something'>
                <span>
                <i class="fa-solid fa-leaf"></i>
                100% Cruelty free
                </span>
                <span>
                <i class="fa-solid fa-rotate-right"></i>
                14 days exchange/refund
                </span>
                <span>
                <i class="fa-solid fa-user-secret"></i>
                Secure payment
                </span>
            </div>

            {/* our store */}
            <div>
            <h2>OUR STORY </h2>
            <p>"Welcome to Chic Bags, where style meets functionality.
                 Our journey began with a simple idea: to create elegant and practical bags that 
                 cater to modern lifestyles. Whether you’re carrying a laptop, a tote, or a backpack,
                  our mission is to offer chic, durable,
                 and thoughtfully designed solutions for every need."</p>
                 <Link to="/ourstory">
                        <span style={{ textDecoration: "underline" }}>Read More</span>
                 </Link>
                 <Link to='/add'>
                 <div>
                  Add a New Item
                 </div>
                 </Link>
                 
                 <button>Add Product</button>
            </div>
        </div>
  )
}
