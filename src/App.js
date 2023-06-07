import './index.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/Profile';
import Offers from './pages/Offers';
import ForgotPassword from './pages/ForgotPassword';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateListing from './pages/CreateListing';

function App() {
  return (
    <>
      <Router>
          <Header/>
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/profile" element={<PrivateRoute/>}>
                    <Route path="/profile" element={<Profile/>} />
              </Route>
              
              <Route path="/sign-in" element={<SignIn/>} />
              <Route path="/sign-up" element={<SignUp/>} />
              <Route path="/offers" element={<Offers/>} />
              <Route path ="/create-listing" element={<PrivateRoute/>}>
                    <Route path="/create-listing" element={<CreateListing/>} />
              </Route>
              <Route path="/forgot-password" element={<ForgotPassword/>} />
          </Routes>
      </Router>
      <ToastContainer
        theme="dark"
      />
    </>

  );
}

export default App;
