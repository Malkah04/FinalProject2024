import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <Footer className='footer'>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <h4>Contact info</h4>
            <ul>
              <li>Phone: 0000000</li>
              <li>email: Shop@gmail.com</li>
            </ul>
          </div>
          <div className='col'>
            <h4>Customer Services</h4>
            <ul>
               <li>
               <Link to="/aboutus">About us</Link>
               </li>
                <li>
               <Link to="/privacypolicy">Privacy policy</Link>
               </li>
               <li>
                <Link to="/contactus">Contact us</Link>
               </li>
               <li>
               <Link to="/feedback">feedback</Link>
               </li>
           </ul>
         </div>
          
          <div className='col'>
            <h4>Collections</h4>   
            <ul>
              <li>
              <Link to="/backpackbags">Backpack bags</Link>
              </li>
              <li>
              <Link to="/laptopbags">Laptop bags</Link>
              </li>
               <li>
              <Link to="/crossbodybags">Crossbody bags</Link>
              </li>
         </ul>  
        </div>
      </div>
    </div>   
  </Footer>
  )
}

export default Footer