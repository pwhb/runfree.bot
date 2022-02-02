import { Telegraf } from "telegraf";
import { b13Register, b13MyID } from "./controller/index.js";
import mongoose from "mongoose";

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
  bot.command("b13_register", async (ctx) => {
    const { id, first_name, last_name, username } = ctx.chat;
    const doc = await b13Register({
      telegram_id: id,
      username,
      first_name,
      last_name,
    });
    const { created } = doc;
    if (created) {
      ctx.reply(
        "your name is already in the database. no need to register again."
      );
    } else {
      ctx.reply(`successfully registered`);
    }
    ctx.reply(`your student_id is ${doc.student_id}`);
    ctx.reply(
      `you can check your name here, https://runfree-broccoli.vercel.app/class/b-13#b13-${doc.student_id}`
    );
  });

  // check id
  bot.command("b13_my_id", async (ctx) => {
    const { id, first_name } = ctx.chat;
    const doc = await b13MyID({
      telegram_id: id,
    });
    const { created } = doc;
    if (created) {
      ctx.reply(`${first_name}, your student_id is ${doc.student_id}`);
      ctx.reply(
        `you can also check your name here, https://runfree-broccoli.vercel.app/class/b-13#b13-${doc.student_id}`
      );
    } else {
      ctx.reply(`you haven't registered yet. you don't have a student id`);
      ctx.reply(`send me /b13_register to register`);
    }
  });

  bot.command("b13_when", async (ctx) => {
    const now = new Date();
    const day = now.getDay();

    const start = new Date();
    start.setHours(12, 0, 0);
    const end = new Date();
    end.setHours(13, 30, 0);

    switch (day) {
      case 0:
      case 4:
        ctx.reply("Tomorrow 6:30-8:00 PM");
        break;

      case 2:
      case 3:
        ctx.reply("Friday 6:30-8:00 PM");
        break;
      case 6:
        ctx.reply("Monday 6:30-8:00 PM");
        break;
      case 1:
        if (start > now) {
          ctx.reply("Today 6:30-8:00 PM");
        } else if (start <= now && end >= now) {
          ctx.reply("there is a class right now !!!");
        } else {
          ctx.reply("Friday 6:30-8:00 PM");
        }
        break;
      case 5:
        if (start > now) {
          ctx.reply("Today 6:30-8:00 PM");
        } else if (start <= now && end >= now) {
          ctx.reply("there is a class right now !!!");
        } else {
          ctx.reply("Monday 6:30-8:00 PM");
        }
    }
  });

  bot.launch();
  // Enable graceful stop
  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
}

main();
