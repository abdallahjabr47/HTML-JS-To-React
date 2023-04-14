import './App.css';
import { useState } from "react";

function App() {
  const [textArea, setTextArea] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleTextareaChange = (e) => {
    setTextArea(e.target.value);
  };

  async function handleFormSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResult("");
    try {
      await submitForm(textArea);
      setResult("success");
    } catch (error) {
      setResult(error.message);
    } finally {
      setLoading(false);
    }
  }

  function submitForm(answer) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (answer.toLowerCase() == "istanbul") {
          resolve();
        } else {
          reject(new Error("Good guess but a wrong answer. Try again!"));
        }
      }, 1500);
    });
  }

  return (
    <div className="App">
       {result !== "success" ? (
        <form id="form" onSubmit={handleFormSubmit}>
          <h2>City quiz</h2>
          <p>What city is located on two continents?</p>
          <textarea id="textarea" onChange={handleTextareaChange} disabled={loading} ></textarea>

          <br />

          <button id="button" disabled={!textArea.length || loading} > 
            Submit 
          </button >

          {loading && <p id="loading">Loading...</p>}

          <p id="error" style={{ color: "red" }}>
            {result}
          </p>

        </form>
          ) : (
        <h1 id="success">That's right!</h1>
      )}
    </div>
  );
}

export default App;

