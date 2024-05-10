import React, { useState } from "react";
import Loadinglogo from '../sp.svg';

function CustomPrompt({ onGenerate }) {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add isLoading state
  const [generatedText, setGeneratedText] = useState(""); // Add generatedText state
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
        setGeneratedText(data.generatedText);
        setInputValue(""); // Clear input value after generating text
        setIsLoading(false); // Set isLoading to false when response is received
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false); // Set isLoading to false when error occurs
      });
  };

  const handleParaphrase = () => {
    setIsLoading(true); // Set isLoading to true when paraphrase button is clicked

    fetch("http://localhost:8000/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: generatedText + " Paraphrase it" }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Passing paraphrased text to parent component
        onGenerate(data.generatedText);
        setGeneratedText(data.generatedText);
        setIsLoading(false); // Set isLoading to false when response is received
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false); // Set isLoading to false when error occurs
      });
  };

  return (
    <div className="flex flex-row items-center">
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
        Generate
        {/* {isLoading ? <img src={Loadinglogo} className="h-4 w-4" /> : "Generate"}  */}
      </button>
      <button
        className="ml-2 mr-2  p-2 bg-blue-300 hover:bg-blue-400 rounded"
        onClick={handleParaphrase}
      >
        Paraphrase
      </button>
      <div>
      { isLoading && <img src={Loadinglogo} className="h-8 w-8" /> }
      </div>
       
      {/* {<img src={Loadinglogo} className="h-4 w-4 p-2" /> }  */}
    </div>
  );
}

export default CustomPrompt;



