import React, { useState } from "react";
import Loadinglogo from '../sp.svg';

function CustomPrompt({ onGenerate }) {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add isLoading state

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleGenerate = () => {
    setIsLoading(true); // Set isLoading to true when generate button is clicked

    fetch("http://localhost:8000/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: inputValue }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Passing generated text to parent component
        onGenerate(data.generatedText);
        setIsLoading(false); // Set isLoading to false when response is received
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false); // Set isLoading to false when error occurs
      });
  };

  return (
    <div>
      <input
        className="p-2 w-60 rounded"
        type="text"
        placeholder="Tell about the email you want"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button
        className="ml-2 p-2 bg-green-300 hover:bg-green-400 rounded"
        onClick={handleGenerate}
        disabled={isLoading} // Disable the button when isLoading is true
      >
        {isLoading ? <img src={Loadinglogo} className="h-4 w-4" /> : "Generate"} 
      </button>
    </div>
  );
}

export default CustomPrompt;
//////


