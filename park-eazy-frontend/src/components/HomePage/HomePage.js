import React from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import "./HomePage.css"; // Import CSS styles for HomePage
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const onBecomeALenderClickHandler = () => {
    navigate("/login", { state: { to: "/lender" } });
  };

  const onBecomeAConsumerClickHandler = () => {
    navigate("/login", { state: { to: "/consumer" } });
  };

  return (
    <div className="homepage">
      <Navbar />
      <header className="hero">
        <div className="overlay">
          {" "}
          {/* Added overlay div */}
          <h1>Welcome to Park-eazy</h1>
          <p>Find and rent parking spaces with ease.</p>
          <div className="buttons">
            <button
              className="btn lender-btn"
              onClick={onBecomeALenderClickHandler}
            >
              Become a Lender
            </button>
            <button
              className="btn parker-btn"
              onClick={onBecomeAConsumerClickHandler}
            >
              Become a Parker
            </button>
          </div>
        </div>
      </header>
      <Footer />
    </div>
  );
};

export default HomePage;
