import React from "react";
import { useState } from "react";
import Button from "./Button";

function Question(props) {
    
    const [clicked, setClicked] = useState("")

    function handleClick(event) {
        setClicked(event.currentTarget.innerHTML)
    }

    console.log(clicked)

    const buttons = props.mixedAnswers.map((element,index) => <Button />)

    return (
        <div className="question-container">
            <div className="question">{props.question}</div>
            <div className="answers-container">
                <Button value={props.mixedAnswers[0]} handleClick={handleClick}/>
                <Button value={props.mixedAnswers[1]} handleClick={handleClick}/>
                <Button value={props.mixedAnswers[2]} handleClick={handleClick}/>
                <Button value={props.mixedAnswers[3]} handleClick={handleClick}/>
               
            </div>
        </div>
    )
}

export default Question