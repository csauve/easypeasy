import { workerData, parentPort } from "worker_threads";
import ReactDOMServer from "react-dom/server.js";
import React from "react";
import components from "../components";

const {component, props} = workerData;
const Component = components[component];

const html = ReactDOMServer.renderToStaticMarkup(<Component {...props}/>);

parentPort!.postMessage(html);