import React from "react";

export default function Html(props) {
    return (
        <html>
            <head>
                <link rel="stylesheet" src="/style.css"/>
            </head>
            <body>
                {props.children}
            </body>
        </html>
    );
}