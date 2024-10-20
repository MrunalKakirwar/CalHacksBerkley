import React, { useState, useEffect } from "react";
import BACKDROP from "../../assets/image002.png";
import ParkingSpotCard from "./LenderParkingSpotCard";
import ParkingSearchForm from "./LenderParkingSearchForm";
import axios from "axios";

const LenderParkingCard = () => {
  const [parking, setParking] = useState([]);

  useEffect(() => {
    fetchLenderParking();
  }, []);

  const fetchLenderParking = async () => {
    const lenderId = localStorage.getItem("email");
    try {
      const response = await axios.get(
        `http://localhost:5000/lender/get-all-parking/${lenderId}`
      );

      setParking(response.data)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${BACKDROP})`,
        backgroundRepeat: "repeat",
        backgroundSize: "auto",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          position: "relative",
          zIndex: 10,
          paddingTop: "100px",
          paddingBottom: "24px",
          width: "100%",
        }}
      >
        <ParkingSearchForm setParking={setParking} />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "16px",
            width: "90%",
            maxWidth: "900px",
          }}
        >
          {parking && parking.map((parking) => {
            return <ParkingSpotCard key={parking.id} parking={parking} />;
          })}
          {/* return <ParkingSpotCard /> */}
        </div>
      </div>
    </div>
   
  );
};

export default LenderParkingCard;
