import {Route,Routes, BrowserRouter} from 'react-router-dom';
import './index.css';
import Home from './pages/Home'
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Header from './components/Header.jsx';
import Footer  from './components/Footer.jsx';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
      <Footer />
    </BrowserRouter>
)
}

export default App
