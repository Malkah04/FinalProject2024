import './App.css';
import Login from './Components/Login';
import Test from './Components/Test';
import Register from './Components/Register';
import{
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import About from './Components/About';
import Privacy from './Components/Privacy';
import Contact from './Components/Contact';
import Feedback from './Components/feedback';
import Backbag from './Components/Backbag';
import Laptop from './Components/Laptop';
import Crossbody from './Components/Crossbody';
import Footer from './Components/Footer';
import Main from './Components/Main';
<<<<<<< HEAD
import Backbag from './Components/Backbag';
=======
import Home from './Components/Home';

import ALLproduct from './Components/ALLproduct';
import Ourstory from './Components/Ourstory';
>>>>>>> 5e34e53319a0cae7f6c98b76d90fa33098564618

function App() {
  return (
    
    <>
    <Router>
       
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/posts" element={<Test />} />
        <Route path="/" element={<Main />} /> 
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/backbag" element={<Backbag />} />
        <Route path="/laptop" element={<Laptop />} />
        <Route path="/crossbody" element={<Crossbody />} />
        <Route path='home' element={<Home />} />
        <Route path='/allproduct' element={<ALLproduct/>} />
        <Route path='/ourstory' element={<Ourstory/>} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>

       
      <Footer/>
      
    </Router>
    </>
  );
}

export default App;
