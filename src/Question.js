import React from "react";
import { useState } from "react";
import { decode } from "html-entities"

function Question(props) {

    const [isHeld, setIsHeld] = useState(false)

    const style = {
        backgroundColor: isHeld ? "red" : "green"
    }
    
    function handleClick(event) {
        props.handleChoose(event)
        
    }

    return (
        <div className="question-container">
            <div className="question">{props.question}</div>
            <div className="answers-container">
                <button style = {style} onClick={handleClick}>{decode(props.mixed_answers[0])}</button>
                <button style = {style} onClick={handleClick}>{decode(props.mixed_answers[1])}</button>
                <button style = {style} onClick={handleClick}>{decode(props.mixed_answers[2])}</button>
                <button style = {style} onClick={handleClick}>{decode(props.mixed_answers[3])}</button>
            </div>
        </div>
    )
}

export default Question