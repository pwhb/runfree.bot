import axios from "axios";
export {
  register,
  my_info,
  class_info,
  help,
  why_join,
  when,
  present,
} from "./commands.js";
import { update_why_join, insert_new_project } from "./db.js";

const greetKeywords = ["hi", "hello", "hey"];

export const jokeHandler = async (ctx) => {
  try {
    const { data } = await axios.get("https://v2.jokeapi.dev/joke/Any");
    const { joke, setup, delivery, category } = data;
    // console.log(data);
    let emoji;
    switch (category) {
      case "Programming":
        emoji = "🖥️";
        break;
      case "Misc":
        emoji = "¯\\_(ツ)_/¯";
        break;
      case "Dark":
        emoji = "😬";
        break;
      case "Pun":
        emoji = "😁";
        break;
      case "Spooky":
        emoji = "🥶";
        break;
      case "Christmas":
        emoji = "🎄";
        break;
    }

    if (joke) {
      ctx.reply(`${joke} ${emoji}`);
    } else {
      ctx.reply(`${setup} \n \n${delivery} ${emoji}`);
    }
  } catch (e) {
    console.log(e);
  }
};

export const textHandler = async (ctx) => {
  if (ctx.chat.type === "private") {
    const { text } = ctx.message;
    try {
      if (text.includes("reason_for_joining")) {
        let reason_for_joining = text.replace("reason_for_joining", "");
        reason_for_joining = reason_for_joining.replace(":", "");
        reason_for_joining = reason_for_joining.replace("-", "");
        reason_for_joining = reason_for_joining.trim();
        await update_why_join({ ctx, reason_for_joining });
      } else if (greetKeywords.includes(text.toLowerCase())) {
        ctx.reply(`${text} ${ctx.chat.first_name ? ctx.chat.first_name : ""}`);
      } else if (text.includes("add_project")) {
        let add_project = text.replace("add_project", "");
        add_project = add_project.replace(":", "");
        add_project = add_project.replace("-", "");
        add_project = add_project.trim();
        await insert_new_project({ ctx, add_project });
      } else if (text.includes("change_classTime")) {
        const { username } = ctx.chat;
        if (username === "pwhbdev") {
          classTime = text.replace("change_classTime: ", "");
          ctx.reply("class time updated!");
          ctx.reply(classTime);
          ctx.reply("/when");
        }
      } else if (text.includes("change_classText")) {
        const { username } = ctx.chat;

        if (username === "pwhbdev") {
          classText = text.replace("change_classText: ", "");
          ctx.reply("class text updated!");
          ctx.reply(classText);
          ctx.reply("/class");
        }
      } else {
        ctx.reply("နားမလည်ပါ");
      }
    } catch (e) {
      console.log(e);
    }
  }
};
