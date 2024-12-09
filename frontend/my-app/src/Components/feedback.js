import React from 'react'
import "./feedback.css"
const feedback = () => {
  return (
    <section className="feedback">
        <form className='form'>
            <h1>Feedback</h1>
            <input type="text" className="field-feed" placeholder="Subject" required/>
            <div className="input-box-feed">
                <input type="text" className="field-feed" placeholder="Your name (option)"/>
            </div>
            <div className="input-box-feed">
                <input type="email" className="field-feed" placeholder="your email (option)"/>
            </div>
            <div className="input-box-feed">
                <textarea name="" id="" className="field-feed mess" placeholder="feedback" required ></textarea>
            </div>
            <button type="submit">Submit</button>
        </form>
    </section>
  )
}

export default feedback