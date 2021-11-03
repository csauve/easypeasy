import express from "express";
import serveStatic from "serve-static";

export default function runServer() {
  const app = express();
  app.use("/", serveStatic("./dist"));
  app.listen(8080);
  console.log("Serving at http://localhost:8080");
}
