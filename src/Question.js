import React, { useEffect } from "react";
import { useState } from "react";
import Button from "./Button";
import { nanoid } from "nanoid"

function Question(props) {

    const [clicked, setClicked] = useState(-1)

    function handleClick(props) {
        setClicked(props.id)
    }

    useEffect(() => {
        props.handleSelect(props.mixedAnswers[clicked],props.questionId)
    },[clicked])

    const buttons = props.mixedAnswers.map((element, index) => <Button
        key={nanoid()}
        id={index}
        value={element}
        handleClick={handleClick}
        isHeld={index === clicked ? true : false}
    />)

    return (
        <div className="question-container">
            <div className="question">{props.question}</div>
            <div className="answers-container" >
                {buttons}
            </div>
        </div>
    )
}

export default Question