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
import EditListing from './pages/EditListing';
import Listing from './pages/Listing';

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
              <Route path ="/edit-listing" element={<PrivateRoute/>}>
                    <Route path="/edit-listing/:listingId" element={<EditListing/>} />
              </Route>
              
              <Route path="/forgot-password" element={<ForgotPassword/>} />
              <Route path="/category/:categoryName/:listingId" element={<Listing/>} />
          </Routes>
      </Router>
      <ToastContainer
        theme="dark"
      />
    </>

  );
}

export default App;
