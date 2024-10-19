// src/components/payment/Payment.js

import React, { useState } from 'react';

const Payment = ({ amount }) => {
    const [transactionHash, setTransactionHash] = useState('');

    const handlePayment = async () => {
        try {
            // Fetch.ai payment request logic
            const response = await fetch('https://api.fetch.ai/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount }), // Pass amount to the payment API
            });

            const data = await response.json();
            if (response.ok) {
                setTransactionHash(data.transactionHash); // Get transaction hash from response
                console.log("Payment Successful:", data);
            } else {
                console.error("Payment Error:", data);
            }
        } catch (error) {
            console.error("Network Error:", error);
        }
    };

    return (
        <div>
            <h2>Payment</h2>
            <p>Amount: {amount} FET</p>
            <button onClick={handlePayment}>Pay with Fetch.ai</button>
            {transactionHash && (
                <div>
                    <p>Transaction Hash: {transactionHash}</p>
                </div>
            )}
        </div>
    );
};

export default Payment;
