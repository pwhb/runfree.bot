import axios from "axios";
import { B13Student } from "../models/index.js";

const greetKeywords = ["hi", "hello", "hey"];
let classTime = "6:30 - 8:00 PM";
let classText = "https://runfree-broccoli.vercel.app/class/b-13";

export const b13Help = async (ctx) => {
  if (ctx.chat.type === "private") {
    ctx.reply(
      "/help : command list \n/class : အတန်း page link \n/register : စာရင်းသွင်းမယ် \n/my_id : student id သိချင်တယ် \n/when : လာမယ့်အတန်းကဘယ်တော့လဲ? \n/why_join : ဘာလို့တက်ချင်လဲကို ပြင်မယ် \n/present : attendance မှတ်တမ်းတင်မယ် \n/tell_a_joke : ဟာသပြောပြ"
    );
  } else {
    {
      ctx.reply(
        "/help : command list \n/class : အတန်း page link \n/when : လာမယ့်အတန်းကဘယ်တော့လဲ?\n/tell_a_joke : ဟာသပြောပြ"
      );
    }
    // ctx.reply(
    //   "/help : command list \n/class : အတန်း page link \n/register : စာရင်းသွင်းမယ် \n/my_id : student id သိချင်တယ် \n/when : လာမယ့်အတန်းကဘယ်တော့လဲ? \n/why_join : ဘာလို့တက်ချင်လဲကို ပြင်မယ် \n/present : attendance မှတ်တမ်းတင်မယ် \n/tell_a_joke : ဟာသပြောပြ \n/quit : အတန်းကထွက်မယ်"
    // );
  }
};

export const b13Class = async (ctx) => {
  ctx.reply(classText);
};

export const b13Register = async (ctx) => {
  if (ctx.chat.type !== "private") {
    ctx.reply(
      "private info နဲ့ဆိုင်သမျှကို private chat မှာသာလုပ်နိုင်ပါတယ်။ \n \n t.me/rf_b_bot"
    );
    return;
  }
  try {
    const { id, first_name, last_name, username } = ctx.chat;
    const doc = await B13Student.findOne({ telegram_id: id });

    if (doc) {
      ctx.reply("အရင်ကတည်းက စာရင်းသွင်းပြီးပါပြီ၊ ထပ်လုပ်ရန်မလိုပါ။");
      ctx.reply(
        `${first_name}, သင့် student id က ${doc.student_id} ပါ။ ဒီမှာလည်း ထပ်စစ်ကြည့်နိုင်ပါတယ်၊ https://runfree-broccoli.vercel.app/class/b-13#b13-${doc.student_id}`
      );
    } else {
      const doc = await B13Student.create({
        telegram_id: id,
        username,
        first_name,
        last_name,
      });
      ctx.reply(
        `စာရင်းသွင်းပြီးပါပြီ။ ${first_name} ရဲ့ student id က ${doc.student_id} ပါ။ ဒီမှာလည်း ထပ်စစ်ကြည့်နိုင်ပါတယ်၊ https://runfree-broccoli.vercel.app/class/b-13#b13-${doc.student_id}`
      );
      ctx.reply(
        "ဘာလို့ ဒီအတန်းကို တက်ချင်တာပါလဲ \n \n အောက်က နမူနာလိုမျိုးပြန်ဖြေပေးပါ \n \n reason for joining: telegram bot ရေးတတ်ချင်လို့"
      );
    }
  } catch (e) {
    console.log(e);
  }
};

export const b13MyID = async (ctx) => {
  if (ctx.chat.type !== "private") {
    ctx.reply(
      "private info နဲ့ဆိုင်သမျှကို private chat မှာသာလုပ်နိုင်ပါတယ်။ \n \n t.me/rf_b_bot"
    );
    return;
  }
  try {
    const { id, first_name } = ctx.chat;
    const doc = await B13Student.findOne({ telegram_id: id });
    if (doc) {
      ctx.reply(
        `${first_name}, သင့် student id က ${doc.student_id} ပါ။ ဒီမှာလည်း ထပ်စစ်ကြည့်နိုင်ပါတယ်၊ https://runfree-broccoli.vercel.app/class/b-13#b13-${doc.student_id}`
      );
    } else {
      ctx.reply(
        `အတန်းတက်ဖို့ စာရင်းမသွင်းရသေးပါ။ /register ကို နှိပ်ပြီး စာရင်းသွင်းပါ`
      );
    }
  } catch (e) {
    console.log(e);
  }
};

export const b13WhyJoin = async (ctx) => {
  if (ctx.chat.type !== "private") {
    ctx.reply(
      "private info နဲ့ဆိုင်သမျှကို private chat မှာသာလုပ်နိုင်ပါတယ်။ \n \n t.me/rf_b_bot"
    );
    return;
  }
  try {
    const { id, first_name } = ctx.chat;
    const doc = await B13Student.findOne({ telegram_id: id });
    if (doc) {
      const reason_for_joining = doc.reason_for_joining;
      if (reason_for_joining) {
        ctx.reply(
          `${first_name} ဒီအတန်းကို တက်နေတဲ့ အကြောင်းအရင်း : ${reason_for_joining}`
        );
        ctx.reply(
          "ပြန်ပြင်လိုပါက အောက်ကနမူနာလိုမျိုးပြန်ပို့ပေးပါ \n \n reason for joining: telegram bot ရေးတတ်ချင်လို့"
        );
      } else {
        ctx.reply(
          "ဘာလို့ ဒီအတန်းကို တက်ချင်တာပါလဲ \n \n အောက်ကနမူနာလိုမျိုးပြန်ဖြေပေးပါ \n \n reason for joining: telegram bot ရေးတတ်ချင်လို့"
        );
      }
    } else {
      ctx.reply(
        `${first_name} အတန်းတက်ဖို့ စာရင်းမသွင်းရသေးပါ။ /register ကို နှိပ်ပြီး စာရင်းအရင်သွင်းပါ`
      );
    }
  } catch (e) {
    console.log(e);
  }
};

export const b13EditWhyJoin = async ({ ctx, reason_for_joining }) => {
  if (ctx.chat.type !== "private") {
    ctx.reply(
      "private info နဲ့ဆိုင်သမျှကို private chat မှာသာလုပ်နိုင်ပါတယ်။ \n \n t.me/rf_b_bot"
    );
    return;
  }
  try {
    const { id, first_name } = ctx.chat;
    const doc = await B13Student.findOneAndUpdate(
      { telegram_id: id },
      { reason_for_joining },
      { new: true }
    );
    if (doc) {
      ctx.reply(`တက်ချင်တဲ့ အကြောင်းအရင်း : ${reason_for_joining}`);
      ctx.reply(`ပြန်ပြင်လိုပါက /why_join ကိုနှိပ်ပါ`);
    } else {
      ctx.reply(
        `အတန်းတက်ဖို့ စာရင်းမသွင်းရသေးပါ။ /register ကို နှိပ်ပြီး စာရင်းအရင်သွင်းပါ`
      );
    }
  } catch (e) {
    console.log(e);
  }
};

export const b13Present = async (ctx) => {
  if (ctx.chat.type !== "private") {
    ctx.reply(
      "private info နဲ့ဆိုင်သမျှကို private chat မှာသာလုပ်နိုင်ပါတယ်။ \n \n t.me/rf_b_bot"
    );

    return;
  }
  const now = new Date();
  const day = now.getDay();

  const start = new Date();
  start.setHours(11, 30, 0);
  const end = new Date();
  end.setHours(14, 30, 0);

  if (day == 1 || day == 5) {
    if (start <= now && end >= now) {
      const { id } = ctx.chat;

      const doc = B13Student.findOneAndUpdate(
        { telegram_id: id },
        { attendance: [true] },
        { new: true }
      );
      if (doc) {
        // // updated database
        // ctx.reply("‌attendance မှတ်တမ်းတင်လိုက်ပါပြီ");
        ctx.reply("‌attendance မှတ်တမ်းတင်ပြီးပါပြီ");
      } else {
        ctx.reply(
          `အတန်းတက်ဖို့ စာရင်းမသွင်းရသေးပါ။ /register ကို နှိပ်ပြီး စာရင်းအရင်သွင်းပါ`
        );
      }

      return;
    }
  }
  ctx.reply("အတန်းချိန်မဟုတ်သေးပါ");
};

export const b13When = async (ctx) => {
  const now = new Date();
  const day = now.getDay();

  const start = new Date();
  start.setHours(12, 0, 0);
  const end = new Date();
  end.setHours(13, 30, 0);

  switch (day) {
    case 0:
    case 4:
      ctx.reply(`မနက်ဖြန် ${classTime}`);
      break;

    case 2:
    case 3:
      ctx.reply(`သောကြာနေ့ ${classTime}`);
      break;
    case 6:
      ctx.reply(`တနင်္လာနေ့ ${classTime}`);
      break;
    case 1:
      if (start > now) {
        ctx.reply(`ဒီနေ့ ${classTime}`);
      } else if (start <= now && end >= now) {
        ctx.reply(`အခုအတန်းရှိနေတာနော် !!!`);
      } else {
        ctx.reply(`သောကြာနေ့ ${classTime}`);
      }
      break;
    case 5:
      if (start > now) {
        ctx.reply(`ဒီနေ့ ${classTime}`);
      } else if (start <= now && end >= now) {
        ctx.reply(`အခုအတန်းရှိနေတာနော် !!!`);
      } else {
        ctx.reply(`တနင်္လာနေ့ ${classTime}`);
      }
  }
};

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
      if (text.includes("reason for joining")) {
        let reason_for_joining = text.replace("reason for joining", "");
        reason_for_joining = reason_for_joining.replace(":", "");
        reason_for_joining = reason_for_joining.replace("-", "");
        reason_for_joining = reason_for_joining.trim();
        await b13EditWhyJoin({ ctx, reason_for_joining });
      } else if (greetKeywords.includes(text.toLowerCase())) {
        ctx.reply(`${text} ${ctx.chat.first_name}`);
      } else if (text.includes("change_classTime")) {
        const { username } = ctx.chat;
        const { text } = ctx.message;

        if (username === "pwhbdev") {
          classTime = text.replace("change_classTime: ", "");
          ctx.reply("class time updated!");
          ctx.reply("/when");
        }
      } else if (text.includes("change_classText")) {
        const { username } = ctx.chat;
        const { text } = ctx.message;

        if (username === "pwhbdev") {
          classTime = text.replace("change_classText: ", "");
          ctx.reply("class text updated!");
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
