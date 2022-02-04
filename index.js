import { Telegraf } from "telegraf";
import {
  b13Register,
  b13MyID,
  b13When,
  b13WhyJoin,
  b13EditWhyJoin,
  b13Present,
  b13Help,
  textHandler,
  b13Class,
  jokeHandler,
  changeClassTime,
} from "./controller/index.js";
import mongoose from "mongoose";
import express from "express";
import axios from "axios";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("runfree bot"));
app.listen(port, () => {
  console.log("server started");
});

async function main() {
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("database connected!");
    })
    .catch((e) => console.log(e));
  const bot = new Telegraf(process.env.BOT_TOKEN);
  // const bot = new Telegraf("5040711592:AAFgst8BjvlD8FiO2Jn9BGcwW7Ep-23ynnc");

  bot.start((ctx) => {
    ctx.reply(`hello ${ctx.chat.first_name}`);
  });

  // register
  bot.command("register", b13Register);

  bot.command("why_join", b13WhyJoin);

  // check id
  bot.command("my_id", b13MyID);

  bot.command("when", b13When);

  bot.command("help", b13Help);

  bot.command("present", b13Present);

  bot.command("class", b13Class);

  bot.command("tell_a_joke", jokeHandler);

  bot.on("text", textHandler);

  bot.launch();

  // Enable graceful stop
  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
}

main();
