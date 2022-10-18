import React from "react";

function Question(props) {
    return (
        <div className="question-container">
            <div className="question">{props.question}</div>
            <div className="answers-container">
                <button>{props.correct_answer}</button>
                <button>answer2</button>
                <button>answer3</button>
                <button>answer4</button>
            </div>
        </div>
    )
}

export default Question