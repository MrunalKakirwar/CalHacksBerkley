import React, { useState } from "react";
import BACKDROP from "../../assets/image002.png";
import ParkingSpotCard from "./ParkingSpotCard";
import ParkingSearchForm from "./ParkingSearchForm";

const ParkingCard = () => {
  const [parking, setParking] = useState([]);

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
          {parking.map((parking) => {
            return <ParkingSpotCard key={parking.id} parking={parking} />;
          })}
        </div>
      </div>
    </div>
   
  );
};

export default ParkingCard;
