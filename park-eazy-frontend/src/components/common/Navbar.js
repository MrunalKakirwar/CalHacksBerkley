// Navbar.js
import React from "react";
import logo from "../../assets/logo.png"; // Adjust the path to your logo image
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  console.log(location);
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "70px", // Height of the navbar
        backgroundColor: "#2D3748", // Darker background for navbar
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Optional shadow for a better look
        zIndex: 20,
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={logo} // Use your logo image path here
          alt="Logo"
          style={{ height: "40px", marginRight: "10px" }} // Adjust height as needed
        />
        <span style={{ fontSize: "18px" }}>
          Park Eazy - Smart Parking Solution
        </span>
      </div>
      <ul style={{ listStyle: "none", display: "flex", margin: 0, padding: 0 }}>
        {location.pathname === "/consumer" && (
          <li style={{ margin: "0 10px" }}>
            <a href="/consumer/my-bookings" style={{ color: "white", textDecoration: "none" }}>
              My Bookings
            </a>
          </li>
        )}
        <li style={{ margin: "0 10px" }}>
          <a href="/" style={{ color: "white", textDecoration: "none" }}>
            Home
          </a>
        </li>
        <li style={{ margin: "0 10px" }}>
          <a href="/about" style={{ color: "white", textDecoration: "none" }}>
            About
          </a>
        </li>
        <li style={{ margin: "0 10px" }}>
        <a
            href="/contact"
            style={{ color: "white", textDecoration: "none" }}
          >
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
