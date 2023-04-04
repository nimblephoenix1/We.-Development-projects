import React, { useRef, useState } from "react";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomLetter() {
  return String.fromCharCode(97 + Math.floor(Math.random() * 26));
}

function generateRandomEquations() {
  const equations = [];
  for (let i = 0; i < 10; i++) {
    const num1 = getRandomInt(-10, 10);
    const num2 = getRandomInt(-10, 10);
    const num3 = getRandomInt(-50, 50);
    const letter = getRandomLetter();
    const c = num2 * num1 + num3;
    const equation = `${num2}${letter} + ${num3} = ${c}`;
    equations.push({
      equation: `${num2}${letter} + ${num3} = ${c}`,
      answer: num1
   
    });
  }
  return equations;
}		

function App() {
  const [equations, setEquations] = useState(generateRandomEquations());
  const [userAnswers, setUserAnswers] = useState(Array(equations.length).fill(''));
  const [numCorrect, setNumCorrect] = useState(0);

const inputRef = useRef(null);
 
const handleSubmit = (event) => {
    event.preventDefault();
    let numCorrect = 0;
    equations.forEach((equation, index) => {
      if (parseInt(userAnswers[index]) === equation.answer) {
        numCorrect++;
      }
    });
    setNumCorrect(numCorrect);
  };

const handleUserAnswerChange = (event, index) => {
    const newUserAnswers = [...userAnswers];
    newUserAnswers[index] = event.target.value;
    setUserAnswers(newUserAnswers);
  }; 

  return (
   <div>
    <div style={{ display: "flex", justifyContent: "center", marginTop: "1em" }}>
      <h2 style={{ backgroundColor: "lightblue", padding: "0.5em", borderRadius: "0.5em" }}>2 Step Algebra Problems</h2>
    </div>
	<form onSubmit={handleSubmit}>
	   <div style={{ display: "flex", flexDirection: "row", gap: "1em", marginTop: "1em"  }}>
    	     <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
             {equations.slice(0, Math.ceil(equations.length / 2)).map((equation, index) => (
          <div key={index} style={{ marginBottom: "1em" }}>
            <div style={{ textAlign: "center" }}>{`${index + 1}. ${equation.equation}`}</div>
            <input
		  type="number" 
		  value={userAnswers[index]}           							  onChange={(event) => handleUserAnswerChange(event, index)}
	        ref={inputRef}
	     />
          </div>
        ))}
	</div>

  <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
        {equations.slice(Math.ceil(equations.length / 2)).map((equation, index) => (
          <div key={index} style={{ marginBottom: "1em" }}>
            <div style={{ textAlign: "center" }}>{`${index + Math.ceil(equations.length / 2) + 1}. ${equation.equation}`}</div>
            <input
              type="number"
              value={userAnswers[index + Math.ceil(equations.length / 2)]}
              onChange={(event) => handleUserAnswerChange(event, index + Math.ceil(equations.length / 2))}
              ref={index === 0 ? inputRef : null}
              />
            </div>
           ))}
         </div>
       </div>
         <div style={{ display: "flex", justifyContent: "center", marginTop: "1em" }}>
        <button type="submit">Check Answers</button>
      </div>
      </form>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "1em" }}>
      <div>Number Correct: {numCorrect}</div>
    </div>
    </div>
  );
}
export default App;
								