import "./App.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AboutUs from "./pages/AboutUs";
import Admin from "./pages/Admin";
import { AuthProvider } from "./components/AuthContext";
import Bookings from "./pages/Bookings";
import ContactForm from "./pages/ContactUs";
import Error from "./pages/Error";
import FilteredRooms from "./pages/FilteredRooms";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import React from "react";
import Rooms from "./pages/Rooms";
import Signup from "./pages/Signup";
import Single from "./pages/Single";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App font-montserrat">
          <Navbar />
          <div className="content font-montserrat">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/contactUs" element={<ContactForm />} />
              <Route path="/aboutUs" element={<AboutUs />} />
              <Route path="/admin" element={<Admin />} />
              {/*  */}
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/filtered" element={<FilteredRooms />} />
              <Route path="/rooms/:id" element={<Single />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
