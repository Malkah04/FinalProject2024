import React, {useState} from 'react'
import "./feedback.css"
const Feedback = () => {
    const [submitted, setSubmitted] = useState(false); 
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setSubmitted(true);  
    };

  return (
    <section className="feedback">
        {!submitted && <form className='form'>
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
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>}
        {submitted && <div className="mas">Thank You For Your Feedback</div>}
    </section>
  );
}

export default Feedback;