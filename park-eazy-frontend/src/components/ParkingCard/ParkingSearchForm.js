import React, { useState } from "react";
import axios from "axios";

const ParkingSearchForm = ({ setParking }) => {
  const [address, setAddress] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toDate, setToDate] = useState("");
  const [toTime, setToTime] = useState("");

  const handleSearch = async (e) => {
    try {
      e.preventDefault();

      const parkingSearchDetails = {
        address,
        fromDate,
        fromTime,
        toDate,
        toTime,
      };

      const response = await axios.post(
        "http://localhost:5000/consumer/search",
        parkingSearchDetails
      );

      setParking(response.data.availableParking);
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
        Find Parking
      </h1>

      <input
        type="text"
        placeholder="Enter Address"
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
        Search
      </button>
    </form>
  );
};

export default ParkingSearchForm;
