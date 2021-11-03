import React from "react";

export default function Html(props) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:,"/>
        <link rel="stylesheet" href="/assets/style.css"/>
      </head>
      <body>
        {props.children}
        <script src="/assets/script.js"></script>
      </body>
    </html>
  );
}
