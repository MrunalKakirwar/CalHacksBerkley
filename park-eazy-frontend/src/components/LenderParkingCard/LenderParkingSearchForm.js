import React, { useState } from "react";
import axios from "axios";

const LenderParkingSearchForm = ({ setParking }) => {
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState(""); // New state for price
  const [additionalAddress, setAdditionalAddress] = useState(""); // New state for additional address
  const [fromDate, setFromDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toDate, setToDate] = useState("");
  const [toTime, setToTime] = useState("");

  const handleSearch = async (e) => {
    try {
      e.preventDefault();
      const lenderId = localStorage.getItem("email");

      const parkingSearchDetails = {
        address,
        additionalAddress,
        price,
        fromDate,
        fromTime,
        toDate,
        toTime,
      };

      const response = await axios.post(
        `http://localhost:5000/lender/add-parking/${lenderId}/`,
        parkingSearchDetails
      );
      // fetchLenderParking();
      setParking(response.data.availableParking);
    } catch (err) {
      console.log(err);
    }
  };

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
    <form
      onSubmit={handleSearch}
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        padding: "32px",
        borderRadius: "8px",
        color: "white",
        width: "90%",
        maxWidth: "900px",
        margin: "0 auto 24px",
      }}
    >
      <h1
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "16px",
          textAlign: "center",
        }}
      >
        Add Parking
      </h1>

      {/* Address Input */}
      <label htmlFor="address" style={{ display: "block", marginBottom: "8px" }}>
        Parking Name
      </label>
      <input
        type="text"
        id="address"
        placeholder="Enter Parking Name"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{
          padding: "8px",
          marginBottom: "16px",
          width: "100%",
          backgroundColor: "#4A5568",
          borderRadius: "4px",
          color: "white",
          border: "1px solid transparent",
          outline: "none",
        }}
        required
      />

      {/* Additional Address Input */}
      <label
        htmlFor="additionalAddress"
        style={{ display: "block", marginBottom: "8px" }}
      >
        Address 
      </label>
      <input
        type="text"
        id="additionalAddress"
        placeholder="Enter Address"
        value={additionalAddress}
        onChange={(e) => setAdditionalAddress(e.target.value)}
        style={{
          padding: "8px",
          marginBottom: "16px",
          width: "100%",
          backgroundColor: "#4A5568",
          borderRadius: "4px",
          color: "white",
          border: "1px solid transparent",
          outline: "none",
        }}
      />

      {/* Price Input */}
      <label htmlFor="price" style={{ display: "block", marginBottom: "8px" }}>
        Price per Hour ($)
      </label>
      <input
        type="number"
        id="price"
        placeholder="Enter Price per Hour ($)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={{
          padding: "8px",
          marginBottom: "16px",
          width: "100%",
          backgroundColor: "#4A5568",
          borderRadius: "4px",
          color: "white",
          border: "1px solid transparent",
          outline: "none",
        }}
        required
      />

      {/* Date & Time Inputs */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          marginBottom: "16px",
        }}
      >
        {/* From Date & Time */}
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <label
              htmlFor="fromDate"
              style={{ display: "block", marginBottom: "8px" }}
            >
              From Date
            </label>
            <input
              type="date"
              id="fromDate"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              style={{
                padding: "8px",
                width: "100%",
                backgroundColor: "#4A5568",
                borderRadius: "4px",
                color: "white",
                border: "1px solid transparent",
                outline: "none",
              }}
              required
            />
          </div>
          <div style={{ flex: 1 }}>
            <label
              htmlFor="fromTime"
              style={{ display: "block", marginBottom: "8px" }}
            >
              From Time
            </label>
            <input
              type="time"
              id="fromTime"
              value={fromTime}
              onChange={(e) => setFromTime(e.target.value)}
              style={{
                padding: "8px",
                width: "100%",
                backgroundColor: "#4A5568",
                borderRadius: "4px",
                color: "white",
                border: "1px solid transparent",
                outline: "none",
              }}
              required
            />
          </div>
        </div>

        {/* To Date & Time */}
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <label
              htmlFor="toDate"
              style={{ display: "block", marginBottom: "8px" }}
            >
              To Date
            </label>
            <input
              type="date"
              id="toDate"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              style={{
                padding: "8px",
                width: "100%",
                backgroundColor: "#4A5568",
                borderRadius: "4px",
                color: "white",
                border: "1px solid transparent",
                outline: "none",
              }}
              required
            />
          </div>
          <div style={{ flex: 1 }}>
            <label
              htmlFor="toTime"
              style={{ display: "block", marginBottom: "8px" }}
            >
              To Time
            </label>
            <input
              type="time"
              id="toTime"
              value={toTime}
              onChange={(e) => setToTime(e.target.value)}
              style={{
                padding: "8px",
                width: "100%",
                backgroundColor: "#4A5568",
                borderRadius: "4px",
                color: "white",
                border: "1px solid transparent",
                outline: "none",
              }}
              required
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: "#C53030",
          borderRadius: "8px",
          color: "white",
          fontWeight: "bold",
          border: "none",
          cursor: "pointer",
        }}
      >
        Add
      </button>
    </form>
  );
};

export default LenderParkingSearchForm;
