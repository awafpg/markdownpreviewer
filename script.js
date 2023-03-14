import React, { useState } from "https://cdn.skypack.dev/react@17.0.1";
import ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";

function myFunction() {
    document.getElementById("app").innerHTML = "Paragraph changed.";
  }

const App = () => <h1>Hello World</h1>

ReactDOM.render(<App />, document.getElementById("app"))