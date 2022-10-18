import React from "react";
import { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import { decode } from 'html-entities'

import Question from "./Question";

function App() {

  const [data, setData] = useState([])

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple')
      .then((response) => response.json())
      .then((data) => setData(data.results));
  }, [])

  const questionsElements = data.map(element => (
    <Question
      key={nanoid()}
      id={element.id}
      correct_answer={element.correct_answer}
      incorrect_answers={element.incorrect_answers}
      question={decode(element.question)}
    />
  )
  )

  return (
    data.length > 4 ?
      <div className="main-container">
        <div className="title">Quiz</div>
        <div className="question-container">
          {questionsElements}
        </div>
        <div className="btn-container">
          <button>Check your answers</button>
        </div>
      </div> :
      <div>Loading your quiz...</div>
  );
}

export default App;
