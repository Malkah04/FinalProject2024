import React from 'react'
import { useState } from 'react'
import './Checkout.css'

export default function Checkout() {
    const [email, setEmail] = useState()
     

  return (
    <div className='parent'>

    <div className='left'>
        <h2>Contact</h2>
        <input className='email'  type="text" placeholder='email' required value={email}  onChange={(e) => setEmail(e.target.value)} />
        
        <h2>Delivery</h2>
        {/* country */}
        <div className='name'>
         <input type="text" placeholder='First name' required />
         <input type="text" placeholder='last name' required />
        </div>
        <div className='address'>  <input type="text" placeholder='Address' required /> </div>
       <div className='address'><input type='text' placeholder='Apartment ,suite ,etc (optional)'/></div>
        <div className='country'>
            <input type='text' placeholder='City' required/>
            <input type='text' placeholder='Governorate' required/>
            <input type='text' placeholder='post code (optional) ' />
        </div>
        <input className='number' type="string" placeholder='Phone' required />
    </div>
    <div className='right'>
        {/* we need to take from cart the item to display here */}
        {/* totle price */}
    </div>
    </div>
  )
}
