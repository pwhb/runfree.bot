import { Telegraf } from "telegraf";
import {
  b13Register,
  b13MyID,
  b13When,
  b13WhyJoin,
  b13EditWhyJoin,
} from "./controller/index.js";
import mongoose from "mongoose";
import express from "express";

const app = express();
const port = process.env.PORT || 3000;

const greetKeywords = ["hi", "hello", "hey"];

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

  bot.start((ctx) => ctx.reply(`hello ${ctx.chat.first_name}`));

  // register
  bot.command("b13_register", b13Register);

  bot.command("b13_why_join", b13WhyJoin);

  // check id
  bot.command("b13_my_id", b13MyID);

  bot.command("b13_when", b13When);

  bot.command("b13_present", );

  bot.on("text", async (ctx) => {
    const { text } = ctx.message;
    if (text.includes("reason for joining")) {
      let reason_for_joining = text.replace("reason for joining", "");
      reason_for_joining = reason_for_joining.replace(":", "");
      reason_for_joining = reason_for_joining.replace("-", "");
      reason_for_joining = reason_for_joining.trim();
      await b13EditWhyJoin({ ctx, reason_for_joining });
    } else if (greetKeywords.includes(text.toLowerCase())) {
      ctx.reply(`${text} ${ctx.chat.first_name}`);
    } else {
      ctx.reply("နားမလည်ပါ");
    }
  });

  bot.launch();

  // Enable graceful stop
  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
}

main();
