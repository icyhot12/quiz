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

  let correctAnswers = []
  data.map(element =>
    correctAnswers.push(element.correct_answer))

  let incorrect_answers = []
  data.map(element =>
    incorrect_answers.push(element.incorrect_answers))

  let full_answers = []
  for (let i = 0; i < correctAnswers.length; i++) {
    full_answers[i] = incorrect_answers[i].concat(correctAnswers[i])
  }

  let mixed_answers = []
  for (let i = 0; i < correctAnswers.length; i++) {
    mixed_answers[i] = shuffle(full_answers[i])
  }

  const questionsElements = data.map((element, index) => (
    <Question
      key={nanoid()}
      id={element.id}
      mixed_answers={mixed_answers[index]}
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
