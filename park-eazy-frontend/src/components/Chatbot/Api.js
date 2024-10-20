// src/api.js
import axios from 'axios';
import { GoogleGenerativeAI } from "@google/generative-ai";

// const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-large:generateContent?key=AIzaSyBtyVx4mruXuGK1mkNYH2uc1QCcxj1ehoc'; // Replace with your actual Gemini API URL
const genAI = new GoogleGenerativeAI("AIzaSyBtyVx4mruXuGK1mkNYH2uc1QCcxj1ehoc");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const CONTEXT = `Park-Eazy is a platform for renting and booking parking spaces, similar to Airbnb but for parking. Users can either rent out their unused spots for extra income or find affordable parking spaces for their needs. The platform supports secure bookings, multiple payment methods (including Sui cryptocurrency), and 24/7 customer support. The chatbot should assist users in booking, managing reservations, renting out spaces, and handling support inquiries like cancellations, refunds, and extensions. It should provide accurate, friendly, and efficient responses to ensure a seamless user experience. Give answer in normal text and keep it short`

export const sendMessage = async (message) => {
  try {
    const result = await model.generateContent(`Context: ${CONTEXT}. Answer the below question based on the given context. And do not tell me in response that I gave you this context or even do not mention about it and don't includ '*' in it. Question: ${message}`);
    return result.response.text() // Return the response data to the component
  } catch (error) {
    console.error('Error sending message:', error.response ? error.response.data : error.message);
    throw error; // Rethrow to handle in the component
  }
};