import './App.css';
import Login from './Components/Login';
import Test from './Components/Test';
import Register from './Components/Register';
import{
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import Aboutus from './Components/Aboutus';
import Privacypolicy from './Components/privacypolicy';
import Contactus from './Components/Contactus';
import Feedback from './Components/feedback';
import Backpackbags from './Components/Backpackbags';
import Laptopbags from './Components/Laptopbags';
import Crossbodybags from './Components/Crossbodybags';
import Home from './Components/Home';
import Footer from './Components/Footer';
function App() {
  return (
    
    <>
    <Router>
       <Footer/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/posts" element={<Test />} />
        {/* <Route path="/" element={<Main />} /> */}
        <Route path="*" element={<div>Page Not Found</div>} />

        <Route path="/aboutus" element={<Aboutus/>} />
        <Route path="/privacypolicy" element={<Privacypolicy/>} />
        <Route path="/contactus" element={<Contactus/>} />
        <Route path="/feedback" element={<Feedback/>} />
        <Route path="/backpackbags" element={<Backpackbags/>} />
        <Route path="/laptopbags" element={<Laptopbags/>} />
        <Route path="/crossbodybags" element={<Crossbodybags/>} />

      </Routes>

    </Router>
    </>
  );
}

export default App;
