import React from 'react'
import { Link } from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <h4>Contact info</h4>
            <ul className='contact-info'> 
              <li>Phone: 02 37427531 </li>
              <li>email: ChicBags@gmail.com</li>
            </ul>
          </div>
          <div className='col'>
            <h4>Customer Services</h4>
            <ul>
               <li>
               <Link to="/about">About us</Link>
               </li>
                <li>
               <Link to="/privacy">Privacy policy</Link>
               </li>
               <li>
                <Link to="/contact">Contact us</Link>
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
              <Link to="/backpack">Backpack bags</Link>
              </li>
              <li>
              <Link to="/laptop">Laptop bags</Link>
              </li>
               <li>
              <Link to="/tote">Tote bags</Link>
              </li>
         </ul>  
        </div>
        <div className='col'>
            <h4>Follow us</h4>   
            <div className='social-links'>
              <Link to="#"><i className='fab fa-facebook-f'></i></Link>
              <Link to="#"><i className='fab fa-twitter'></i></Link>
              <Link to="#"><i className='fab fa-instagram'></i></Link>
              <Link to="#"><i className='fab fa-linkedin-in'></i></Link>
         </div>  
        </div>
      </div>
    </div>   
  </footer>
  )
}

export default Footer