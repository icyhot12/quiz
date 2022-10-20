import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { decode } from "html-entities";
import shuffle from "./shuffle.js";

import Question from "./Question";

function App() {
  const [data, setData] = useState([]);
  const selected = useRef([])

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
      .then((response) => response.json())
      .then((data) => setData(data.results));
  }, []);

  // preparing answers

  let correctAnswers = [];
  data.map((element) => correctAnswers.push(element.correct_answer));

  let incorrectAnswers = [];
  data.map((element) => incorrectAnswers.push(element.incorrect_answers));

  let fullAnswers = [];
  for (let i = 0; i < correctAnswers.length; i++) {
    fullAnswers[i] = incorrectAnswers[i].concat(correctAnswers[i]);
  }

  let mixedAnswers = [];
  for (let i = 0; i < correctAnswers.length; i++) {
    mixedAnswers[i] = shuffle(fullAnswers[i]);
  }

  function handleSelect(clicked,index) {
    selected.current[index] = clicked
  }

  const questionsElements = data.map((element, index) => (
    <Question
      key={nanoid()}
      questionId={index}
      mixedAnswers={mixedAnswers[index]}
      question={decode(element.question)}
      handleSelect={handleSelect}
    />
  ));

  return mixedAnswers.length > 1 ? (
    <div className="main-container">
      <div className="title">Quiz</div>
      <div className="question-container">{questionsElements}</div>
      <div className="btn-container">
        <button>Check your answers</button>
      </div>
    </div>
  ) : (
    <div>Waiting...</div>
  );
}

export default App;
