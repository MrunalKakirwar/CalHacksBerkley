import React, { useState } from "react";
import Vapi from "@vapi-ai/web"; // Import the Vapi SDK
import "./Contact.css"; // Import your CSS for styling
import contactImage from "../../assets/contact.gif"

const Contact = () => {
  const vapi = new Vapi(process.env.REACT_APP_VAPI_API_KEY);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const invokeVoiceWidget = () => {
    console.log('Invoking Vapi Widget...');
    const assistantId = process.env.REACT_APP_VAPI_ASSISTANT_ID;

    if (!assistantId) {
      console.error("Assistant ID is not defined.");
      return;
    }

    vapi.start(assistantId);
    setIsSpeaking(true);

    vapi.on("call-start", () => {
      console.log("Call has started.");
    });

    vapi.on("call-end", () => {
      console.log("Call has ended.");
      setIsSpeaking(false);
    });

    vapi.on("error", (e) => {
      console.error("Error during call:", e);
    });
  };

  return (
    <div className="contact-container">
        <img src={contactImage} alt="Description" className="contact-image" />
      <button onClick={invokeVoiceWidget} className="vapi-button">
        Call our AI Agent
      </button>
    </div>
  );
};

export default Contact;