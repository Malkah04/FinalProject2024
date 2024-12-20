import React from 'react'
import "./contact.css"
const Contact = () => {
  return (
    <section className="contact">
            <form className='f'>
                <h1>Contact Us</h1>
                <p>We will get back to you asap!</p>
                <input type="text" className="field" placeholder="Subject" required/>
                <div className="input-box">
                    <input type="text" className="field" placeholder="Your name" required/>
                </div>
                <div className="input-box">
                    <input type="email" className="field" placeholder="Enter your email"required/>
                </div>
                <div className="input-box">
                    <input type="text" className="field" placeholder="Your order number" />
                </div>
                <div className="input-box">
                    <textarea name="" id="" className="field mess" placeholder="Enter your message" ></textarea>
                </div>
                <button type="submit" className='button-contact'>Submit</button>
            </form>
        </section>
  )
}

export default Contact