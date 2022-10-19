import React from "react";
import { useState } from "react"
import { decode } from "html-entities"

function Button(props) {

    const style = {
        backgroundColor: props.isHeld ? "yellow" : "white"
    }

    return (
        <button style={style} onClick={() => props.handleClick(props)}>{decode(props.value)}</button>
    )
}

export default Button