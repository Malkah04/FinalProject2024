import React, { useState, useEffect } from 'react';

function Cart() {
  const [cart, setCart] = useState({ cartItems: [] });

  
  useEffect(() => {
 
    const EmptyCart = {
      cartItems: [
       
      ],      
      totalItems: 0,
      totalPrice: 0
    };
 
    let loccart = localStorage.getItem('cart');

    const Mycart = JSON.parse (loccart) ? JSON.parse(loccart) : EmptyCart;
    setCart(Mycart);
   
   
  }, []);

  
  const removeFromCart = (detail) => {
    const EmptyCart = {
      cartItems: [
       
      ],      
      totalItems: 0,
      totalPrice: 0
    };
 
    let loccart = localStorage.getItem('cart');

    let Mycart = JSON.parse (loccart) ? JSON.parse(loccart) :  EmptyCart;
 


    let filteredItems = Mycart.cartItems.filter((item) => item._id !== detail._id);
    Mycart.cartItems = filteredItems;
    
      setCart(Mycart);
     
  


// if(EmptyCart.totalPrice - detail.totalPrice>=0){
  Mycart.totalItems -=1;
Mycart.totalPrice -= parseInt(detail.productPrice);

// }

localStorage.setItem('cart', JSON.stringify(Mycart));
    
   
    
     

  }; 

  return (
    <div>
      <h2>Your Cart Contains : {cart.totalItems ? cart.totalItems: 0} </h2>
     
      <h2>With totalPrice : {cart.totalPrice ? cart.totalPrice: 0} </h2>
      
      <ul>

        {cart.cartItems&& cart.cartItems.map((item) => (
          <li key={item.productId}>
          <div>
          
         
          <h2>{item.productName}</h2>
          <img src={item.productImage} width={"200"}  height={"200"}alt={item.productName} />
          <p>{item.productDescription}</p>
          <p>Price: {item.productPrice} LE</p>
        
        </div>
           <button onClick={() => removeFromCart(item)}>Remove</button>
           
          </li>
          
         ))} 
      </ul>
    </div>
  );
}

export default Cart;



