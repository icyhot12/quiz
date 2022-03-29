import { React, useState, useEffect } from "react";
import { decode } from 'html-entities';
import { nanoid } from 'nanoid';

function App() {

  const [data, setData] = useState([]); //fetched questions API
  const [checked, setChecked] = useState([]); //checked Answers by user
  const [verified, setVerified] = useState([]); //verified users answers
  const [visible, setVisible] = useState(false); //visible answers
  const [mixed, setMixed] = useState(0); //answers array mixed indicator
  const [mixedArray, setMixedArray] = useState([]); //mixed answers array

  //data fetch----------------------------------------------------------------------------

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then(response => {
        return response.json();
      })
      .then(response => {
        setData(response.results);
      })

  }, [])

  // end of data fetch--------------------------------------------------------------------

  var corAnswersArray = [];

  if (data) {
    data.map((corAnswers, index) => {
      corAnswersArray[index] = corAnswers.correct_answer
    })
  }

  var incAnswersArray = [];

  if (data) {
    data.map((incAnswers, index) => {
      incAnswersArray[index] = incAnswers.incorrect_answers
    })
  }

  var answersArray = [];

  if (data) {
    incAnswersArray.map((incAnswer, index) => {
      answersArray[index] = incAnswer.concat(corAnswersArray[index])
    })
  }

  function shuffle(arr) {
    return [...arr].map((_, i, arrCopy) => {
      var rand = i + (Math.floor(Math.random() * (arrCopy.length - i)));
      [arrCopy[rand], arrCopy[i]] = [arrCopy[i], arrCopy[rand]]
      return arrCopy[i]
    })
  }

  var questionsArray = [];

  if (data) {
    data.map((questions, index) => {
      questionsArray[index] = decode(questions.question)
    })
  }

  // mixing answers array ------------------------------------------------------------------

  if (mixed < 1) {
    var mixedAnswers = [];
    answersArray.map((answersPart, index) => {
      mixedAnswers[index] = shuffle(answersPart)
    })
    if (mixedAnswers.length > 0) {
      setMixed(prevMixed => {
        return prevMixed + 1
      })
      setMixedArray(prevMixedArray => {
        return prevMixedArray = mixedAnswers
      })
    }
  }

  // data handling -------------------------------------------------------------------------

  function idCheck(event) {

    var index = event.target.id
    var text = event.target.value;

    setChecked(prevChecked => {
      prevChecked[index] = text
      return prevChecked
    })
  }
  // check answers ---------------------------------------------------------------------------

  function answersCheck(event) {
    checked.map((target, index) => {
      corAnswersArray.includes(target) ?
        setVerified(prevVerified => {
          prevVerified[index] = "OK"
          return prevVerified
        })
        :
        setVerified(prevVerified => {
          prevVerified[index] = "WRONG"
          return prevVerified
        })
    })
    if (checked.length > 4) {
      setVisible(prevVisible => {
        return !prevVisible
      })
    }
    console.log(checked)
  }

  // rendering -----------------------------------------------------------------------------

  if (mixedArray.length > 1) {
    return (
      <div>
        {questionsArray.map((question, indexA) => {
          return (
            <div className="question--full">
              <div className="question" key={nanoid()}>
                <div>{question}</div>
                {mixedArray[indexA].map((answer, indexB) => {
                  return (
                    <label key={nanoid()}>
                      <input
                        type="radio"
                        name={"button" + indexA}
                        id={indexA}
                        className="radio-toolbar"
                        value={decode(answer)}
                        onClick={(event) => idCheck(event)}
                        key={nanoid()}
                      />
                      {decode(answer)}
                    </label>
                  )
                })}
              </div>
              <div className="verified">{verified[indexA]}</div>
            </div>
          )
        })
        }
        <button
          className="button--bottom"
          onClick={(event) => answersCheck(event)}
        >
          Check your quiz
        </button>
      </div >
    )
  } else {
    return "Loading..."
  }

}

export default App;