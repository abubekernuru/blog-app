import {Route,Routes, BrowserRouter} from 'react-router-dom';
import './index.css';
import Home from './pages/Home'
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Header from './components/Header.jsx';
import Footer  from './components/Footer.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import IsAdminPrivateRoute from './components/IsAdminPrivateRoute.jsx';
import CreatePost from './pages/CreatePost.jsx';
import UpdatePost from './pages/UpdatePost.jsx';
import Post from './pages/Post.jsx';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route element={<IsAdminPrivateRoute />}>
          <Route path='/createpost' element={<CreatePost />} />
          <Route path='/updatepost/:postId' element={<UpdatePost />} />
        </Route>

        <Route path='/post/:postSlug' element={<Post />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
      <Footer />
    </BrowserRouter>
)
}

export default App
