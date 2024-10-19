import React from "react";
import Login from "./pages/Login";
import Consumer from "./pages/Consumer";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Checkout from "./components/Checkout/Checkout";
import Lender from "./pages/Lender";
import HomePage from "./pages/Home";
import MyBookings from "./pages/MyBookings";


function App() {
  return (
    <>
      <Navbar />
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            flex: 1, // Ensures the content takes up the remaining space between the navbar and footer
            paddingTop: "70px", // Adjust this to match the height of your Navbar
            paddingBottom: "60px", // Adjust this to match the height of your Footer
          }}
        >
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/consumer" element={<Consumer />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/lender" element={<Lender />} />
            <Route path="/consumer/my-bookings" element={<MyBookings />}/>
            {/* <Route path="/add-parking" element={<AddParking />} /> */}
            {/* Other routes can be added here for Listings, Contact, etc. */}
          </Routes>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
