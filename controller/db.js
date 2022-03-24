import { B13Student, B13Project } from "../models/index.js";

export const update_why_join = async ({ ctx, reason_for_joining }) => {
  if (ctx.chat.type !== "private") {
    ctx.reply(
      "private info နဲ့ဆိုင်သမျှကို private chat မှာသာလုပ်နိုင်ပါတယ်။ \n \n t.me/rf_b_bot"
    );
    return;
  }
  try {
    const { id } = ctx.chat;
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

export const insert_new_project = async ({ ctx, add_project }) => {
  if (ctx.chat.type !== "private") {
    ctx.reply(
      "private info နဲ့ဆိုင်သမျှကို private chat မှာသာလုပ်နိုင်ပါတယ်။ \n \n t.me/rf_b_bot"
    );
    return;
  }
  try {
    const { id, username, first_name } = ctx.chat;
    const newProject = {
      name: add_project,
      first_name: first_name,
      telegram_id: id,
      type: "suggested",
      updated_at: new Date(),
    };
    const student = await B13Student.findOne({ telegram_id: id });
    if (username !== "pwhbdev" && !student) {
      ctx.reply(
        `အတန်းတက်ဖို့ စာရင်းမသွင်းရသေးပါ။ /register ကို နှိပ်ပြီး စာရင်းအရင်သွင်းပါ`
      );
      return;
    }
    const doc = await B13Project.create(newProject);
    ctx.reply(`project name: ${doc.name} \n \nadded by: ${doc.first_name}`);
  } catch (e) {
    console.log(e);
  }
};
