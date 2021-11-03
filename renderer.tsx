import { workerData, parentPort } from "worker_threads";
import ReactDOMServer from "react-dom/server.js";
import React from "react";

const {component, props} = workerData;

import(`./src/components/${component}`)
  .then(({default: Component}) => {
    const html = "<!DOCTYPE html>" + ReactDOMServer.renderToStaticMarkup(<Component {...props}/>);
    parentPort!.postMessage(html);
  })
  .catch(err => {
    console.error(`Couldn't find component file ${component}`);
  });
