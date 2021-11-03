import React from "react";
import Html from "./shared/Html";

export default function Example(props) {
  return (
    <Html>
      <h1>Home page</h1>
      <p>Hello, {props.name}!</p>

      <a href="/example">Go to example page</a>
    </Html>
  );
}
