// src/components/Chatbot/Chatbot.js
import React, { useState } from 'react';
import { sendMessage } from './Api'; // Adjusted path
import './Chatbot.css';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const userMessage = { text: input, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const response = await sendMessage(input);
      const botMessage = { text: response || 'No response from bot', sender: 'bot' }; // Adjust based on the API response structure
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      const errorMessage = { text: 'Error: Unable to get a response from the bot.', sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }

    setInput('');
  };

  return (
    
      <div className="chatbot">
        <h2 className="chatbot-header">Let's chat with our AI Bot</h2>
        <div className="chatbot-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`chatbot-message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <form className="chatbot-form" onSubmit={handleSend}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
   
  );
};

export default Chatbot;
