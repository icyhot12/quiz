import React from "react";
import { useState } from "react"
import { decode } from "html-entities"

function Button(props) {

    const [isHeld, setIsHeld] = useState(false)

    return (
        <button onClick={(event) => props.handleClick(event)}>{decode(props.value)}</button>
    )
}

export default Button