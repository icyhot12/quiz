import React from "react";
import { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import { decode } from 'html-entities'
import shuffle from "./shuffle.js"

import Question from "./Question";

function App() {

  const [data, setData] = useState([])

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple')
      .then((response) => response.json())
      .then((data) => setData(data.results));
  }, [])

// preparing answers

  let correctAnswers = []
  data.map(element =>
    correctAnswers.push(element.correct_answer))

  let incorrectAnswers = []
  data.map(element =>
    incorrectAnswers.push(element.incorrect_answers))

  let fullAnswers = []
  for (let i = 0; i < correctAnswers.length; i++) {
    fullAnswers[i] = incorrectAnswers[i].concat(correctAnswers[i])
  }

  let mixedAnswers = []
  for (let i = 0; i < correctAnswers.length; i++) {
    mixedAnswers[i] = shuffle(fullAnswers[i])
  }

  function handleChoose(e){
    console.log(e.currentTarget.innerHTML)
  }

  const questionsElements = data.map((element, index) => (
    <Question
      key={nanoid()}
      id={element.id}
      mixedAnswers={mixedAnswers[index]}
      question={decode(element.question)}
      handleChoose={handleChoose}
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
