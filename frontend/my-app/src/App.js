import './App.css';
import Login from './Components/Login';
import Test from './Components/Test';
import Register from './Components/Register';
import Header from './Components/Header'; 
import Cart from './Components/Cart';
import Account from './Components/Account';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL || "/"}>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/login"     element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts" element={<Test />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/Account" element={<Account />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;