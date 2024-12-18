import './App.css';
import Login from './Components/Login';
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
import Backpack from './Components/Backpack';
import Home from './Components/Home';
import ALLproduct from './Components/ALLproduct';
import Ourstory from './Components/Ourstory';
import Laptop from './Components/Laptop';
import Tote from './Components/Tote';
import Footer from './Components/Footer';
import Header1 from './Components/Header1';


function App() {
  return (
    
    <>
    <Router>
       <Header1/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} /> 
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/Backpack" element={<Backpack />} />
        <Route path="/laptop" element={<Laptop />} />
        <Route path="/tote" element={<Tote />} />
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
