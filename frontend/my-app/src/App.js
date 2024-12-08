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
import Backpack from './Components/Backpack';
import Laptop from './Components/Laptop';
import Crossbody from './Components/Crossbody';
import Footer from './Components/Footer';
import Main from './Components/Main';

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
        <Route path="/backpack" element={<Backpack />} />
        <Route path="/laptop" element={<Laptop />} />
        <Route path="/crossbody" element={<Crossbody />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>

       
      <Footer/>
      
    </Router>
    </>
  );
}

export default App;
