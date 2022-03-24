import express from "express";

export const app = express();
const port = process.env.PORT || 4000;

app.get("/", (req, res) => res.send("runfree bot"));


