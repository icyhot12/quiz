import React from "react";
import { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import { decode } from 'html-entities'
import shuffle from "./shuffle.js"

import Question from "./Question";

function App() {

  const [data, setData] = useState([])
  const [mixed, setMixed] = useState(false)
  const [selected, setSelected] = useState([])

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
// stop rerendering 
// save choosed answers to state
  let mixedAnswers = []
  if (mixed === false) {
    for (let i = 0; i < correctAnswers.length; i++) {
      mixedAnswers[i] = shuffle(fullAnswers[i])
    }
    if(mixedAnswers.length > 3) {
      setMixed(true)
    }
  }

  function handleSelect(clicked, questionId) {
    setSelected(prevSelected => {
      let tempSelected = [].concat(prevSelected)
      tempSelected[questionId] = clicked
      return tempSelected
    })
  }

  const questionsElements = data.map((element, index) => (
    <Question
      key={nanoid()}
      questionId={index}
      mixedAnswers={mixedAnswers[index]}
      question={decode(element.question)}
      handleSelect={handleSelect}
    />
  )
  )

  return (
    <div className="main-container">
      <div className="title">Quiz</div>
      <div className="question-container">
        {questionsElements}
      </div>
      <div className="btn-container">
        <button>Check your answers</button>
      </div>
    </div>
  );
}

export default App;
