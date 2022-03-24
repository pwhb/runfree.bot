import { Telegraf } from "telegraf";
import {
  register,
  my_info,
  class_info,
  help,
  why_join,
  when,
  present,
  textHandler,
  jokeHandler,
} from "./controller/index.js";
import mongoose from "mongoose";
import express from "express";

const app = express();
const { PORT, WEBHOOK_URL } = process.env

app.get("/", (req, res) => res.send("runfree bot"));


const bot = new Telegraf(process.env.BOT_TOKEN);
// const bot = new Telegraf(process.env.TEST_TOKEN);

bot.start((ctx) => {
  ctx.reply(`hello ${ctx.chat.first_name}`);
});
bot.command("test", (ctx) => {
  ctx.reply(ctx.chat.id);
});
// register
bot.command("register", register);

bot.command("why_join", why_join);

// check id
bot.command("my_id", my_info);

bot.command("when", when);

bot.command("help", help);

bot.command("present", present);

bot.command("class", class_info);

bot.command("tell_a_joke", jokeHandler);

bot.on("text", textHandler);

const secretPath = `/telegraf/${bot.secretPathComponent()}`

bot.telegram.setWebhook(`${WEBHOOK_URL}${secretPath}`)

// Set the bot API endpoint
app.use(bot.webhookCallback(secretPath))

app.listen(PORT, () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("database connected!");
    })
    .catch((e) => console.log(e));
  console.log("server started");
});

  // bot.launch();

  // // Enable graceful stop
  // process.once("SIGINT", () => bot.stop("SIGINT"));
  // process.once("SIGTERM", () => bot.stop("SIGTERM"));

