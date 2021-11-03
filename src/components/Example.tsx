import React from "react";
import Html from "./Html";

export default function Example(props) {
    return (
        <Html>
            <h1>Hello, {props.name}!</h1>
        </Html>
    );
}