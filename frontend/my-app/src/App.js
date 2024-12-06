import './App.css';
import Login from './Components/Login';
import Test from './Components/Test';
import Register from './Components/Register';
import{
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
function App() {
  return (
    
    <>
    <Router>
    
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/posts" element={<Test />} />
        {/* <Route path="/" element={<Main />} /> */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
