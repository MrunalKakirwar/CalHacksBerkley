import React from "react";
import parkingImage from "../../assets/image.png";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const ParkingSpotCard = ({ parking }) => {
    const navigate = useNavigate();

  const handleBookClick = () => {
    // Navigate to checkout page with the selected parking details as state
    console.log(parking)
    navigate("/checkout", { state: { parking } });
  };

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    // Format time to 12-hour AM/PM
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
    
    return `${formattedDate} at ${formattedTime}`;
};

// Helper function to render stars based on rating
const renderRatingStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <span key={i} style={{ color: i <= rating ? "#FFC107" : "#E4E5E9" }}>
                ★
            </span>
        );
    }
    return stars;
};

  return (
    <div
            style={{
                backgroundColor: "white",
                padding: "16px",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                maxWidth: "100%", // Increase width to maximum
                margin: "12px 0", // Optional margin for spacing
            }}
        >
            <img
                src={parkingImage} // URL of the parking image
                alt="Parking Spot"
                style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "8px",
                    marginBottom: "12px",
                }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 style={{ fontWeight: "bold" }}>{parking.parkingName}</h2>
                <div>
                    <FontAwesomeIcon
                        icon={faEdit}
                        onClick={() => {/* Add your edit functionality here */}}
                        style={{ marginRight: "12px", cursor: "pointer", color: "#3182CE" }}
                    />
                    <FontAwesomeIcon
                        icon={faTrash}
                        // onClick={() => onDelete(parking.id)} // Call delete function passed as prop
                        style={{ cursor: "pointer", color: "#E53E3E" }} // Red color for delete
                    />
                </div>
            </div>
            <p>Location: {parking.location}</p>
            <p>Price: {parking.price}$</p>

            {/* Displaying Availability Status */}
            <div style={{ marginTop: "12px", fontWeight: "bold", color: parking.available ? "#38A169" : "#E53E3E" }}>
                {parking.available ? "Available" : "Not Available"}
            </div>

            {/* Displaying Rating */}
            <div style={{ marginTop: "12px", fontSize: "1.2em" }}>
                <span>Rating: </span>
                {renderRatingStars(parking.rating)}
            </div>

            {/* Displaying Dates and Times */}
            <div style={{ marginTop: "12px" }}>
                <p>From: {formatDateTime(parking.fromDate)}</p>
                <p>To: {formatDateTime(parking.toDate)}</p>
            </div>

            <button
                onClick={handleBookClick}
                style={{
                    marginTop: "16px",
                    width: "100%",
                    padding: "8px",
                    backgroundColor: "#3182CE",
                    color: "white",
                    borderRadius: "4px",
                    border: "none",
                    cursor: "pointer",
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#2B6CB0")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#3182CE")}
            >
                Book Now
            </button>
        </div>
  );
};

export default ParkingSpotCard;
