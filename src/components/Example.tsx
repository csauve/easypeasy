import ReactDOM from "react-dom";
import React, {useState} from "react";
import Html from "./shared/Html";

export default function Example() {
  return (
    <Html>
      <h1>Example page</h1>
      <div id="example-mountpoint"></div>

      <a href="/">Go to home page</a>
    </Html>
  );
}

function ExampleApp() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>The count is: {count}</p>
      <button onClick={increment}>Add 1</button>
    </div>
  );
}

export function loadExampleApp() {
  const exampleMountpoint = document.querySelector("#example-mountpoint");
  if (exampleMountpoint) {
    ReactDOM.render(<ExampleApp/>, exampleMountpoint);
  }
}
