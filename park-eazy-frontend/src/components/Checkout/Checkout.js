// src/components/Checkout/Checkout.js

import React, { useState } from "react";
import Footer from "../common/Footer";
import logo from "../../assets/image.png";
import Payment from "../payment/Payment"; // Import the Payment component

const Checkout = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("credit-card");
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [showPayment, setShowPayment] = useState(false); // New state to show payment

    const handleBooking = (e) => {
        e.preventDefault();
        if (termsAccepted) {
            console.log("Booking confirmed:");
            setShowPayment(true); // Show payment component when booking is confirmed
        } else {
            alert("Please accept the terms and conditions to proceed.");
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "24px", maxWidth: "600px", margin: "0 auto", backgroundColor: "#f9f9f9", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", }}>
            <h1 style={{ textAlign: "center", fontWeight: "bold", margin: "16px 0", fontSize: "2.5rem" }}>
                Just a HONK away from your Parking Lot!
            </h1>
            <div style={{ width: "100%", marginBottom: "24px" }}>
                <img
                    src={logo}
                    style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "8px",
                    }}
                />
            </div>
            {/* Parking details aligned to the left */}
            <div style={{ textAlign: 'left', width: "100%", marginBottom: '24px' }}>
                <p style={{ marginBottom: '12px' }}><strong>Parking Location:</strong> UC Berkeley</p>
                <p style={{ marginBottom: '12px' }}><strong>Available Time:</strong> 10:00 AM - 5:00 PM</p>
                <p style={{ marginBottom: '12px' }}><strong>Price:</strong> $10</p>
            </div>

            <form onSubmit={handleBooking} style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                <div style={{ marginBottom: "12px" }}>
                    <label>
                        Full Name:
                        <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                            style={{
                                width: "100%",
                                padding: "8px",
                                borderRadius: "4px",
                                border: "1px solid #ccc",
                                marginTop: "8px",
                            }}
                        />
                    </label>
                </div>

                <div style={{ marginBottom: "12px" }}>
                    <label>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                width: "100%",
                                padding: "8px",
                                borderRadius: "4px",
                                border: "1px solid #ccc",
                                marginTop: "8px",
                            }}
                        />
                    </label>
                </div>

                <div style={{ marginBottom: "12px" }}>
                    <label>
                        Payment Method:
                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "8px",
                                borderRadius: "4px",
                                border: "1px solid #ccc",
                                marginTop: "8px",
                            }}
                        >
                            <option value="credit-card">Credit Card</option>
                            <option value="paypal">PayPal</option>
                            <option value="google-pay">Google Pay</option>
                            <option value="apple-pay">Apple Pay</option>
                            <option value="fetch-ai">Fetch.ai</option> {/* New option */}
                        </select>
                    </label>
                </div>

                <div style={{ marginBottom: "12px" }}>
                    <label style={{ display: "flex", alignItems: "center" }}>
                        <input
                            type="checkbox"
                            checked={termsAccepted}
                            onChange={() => setTermsAccepted(!termsAccepted)}
                            style={{ marginRight: "8px" }}
                        />
                        I accept the terms and conditions
                    </label>
                </div>

                <button
                    type="submit"
                    style={{
                        padding: "12px",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    Confirm Booking
                </button>
            </form>

            {showPayment && <Payment amount={10} />} {/* Show payment component if booking is confirmed */}

            <Footer />
        </div>
    );
};

export default Checkout;
