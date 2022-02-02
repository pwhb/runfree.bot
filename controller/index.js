import { B13Student } from "../models/index.js";
export const b13Register = async (ctx) => {
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

export const b13ReasonForJoining = async ({
  telegram_id,
  reason_for_joining,
}) => {
  const doc = await B13Student.findOneAndUpdate(
    { telegram_id },
    { reason_for_joining },
    { new: true }
  );
};

export const b13MyID = async (ctx) => {
  try {
    const { id, first_name } = ctx.chat;
    const doc = await B13Student.findOne({ telegram_id: id });
    if (doc) {
      ctx.reply(
        `${first_name}, သင့် student id က ${doc.student_id} ပါ။ ဒီမှာလည်း ထပ်စစ်ကြည့်နိုင်ပါတယ်၊ https://runfree-broccoli.vercel.app/class/b-13#b13-${doc.student_id}`
      );
    } else {
      ctx.reply(
        `အတန်းတက်ဖို့ စာရင်းမသွင်းရသေးပါ။ /b13_register ကို နှိပ်ပြီး စာရင်းသွင်းပါ`
      );
    }
  } catch (e) {
    console.log(e);
  }
};

export const b13WhyJoin = async (ctx) => {
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
        `${first_name} အတန်းတက်ဖို့ စာရင်းမသွင်းရသေးပါ။ /b13_register ကို နှိပ်ပြီး စာရင်းအရင်သွင်းပါ`
      );
    }
  } catch (e) {
    console.log(e);
  }
};

export const b13EditWhyJoin = async ({ ctx, reason_for_joining }) => {
  try {
    const { id, first_name } = ctx.chat;
    const doc = await B13Student.findOneAndUpdate(
      { telegram_id: id },
      { reason_for_joining },
      { new: true }
    );
    if (doc) {
      ctx.reply(`တက်ချင်တဲ့ အကြောင်းအရင်း : ${reason_for_joining}`);
      ctx.reply(`ပြန်ပြင်လိုပါက /b13_why_join ကိုနှိပ်ပါ`);
    } else {
      ctx.reply(
        `အတန်းတက်ဖို့ စာရင်းမသွင်းရသေးပါ။ /b13_register ကို နှိပ်ပြီး စာရင်းအရင်သွင်းပါ`
      );
    }
  } catch (e) {
    console.log(e);
  }
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
      ctx.reply("မနက်ဖြန် 6:30-8:00 PM");
      break;

    case 2:
    case 3:
      ctx.reply("သောကြာနေ့ 6:30-8:00 PM");
      break;
    case 6:
      ctx.reply("တနင်္လာနေ့ 6:30-8:00 PM");
      break;
    case 1:
      if (start > now) {
        ctx.reply("ဒီနေ့ညနေ 6:30-8:00 PM");
      } else if (start <= now && end >= now) {
        ctx.reply("အခုအတန်းရှိနေတာနော် !!!");
      } else {
        ctx.reply("သောကြာနေ့ 6:30-8:00 PM");
      }
      break;
    case 5:
      if (start > now) {
        ctx.reply("ဒီနေ့ 6:30-8:00 PM");
      } else if (start <= now && end >= now) {
        ctx.reply("အခုအတန်းရှိနေတာနော် !!!");
      } else {
        ctx.reply("တနင်္လာနေ့ 6:30-8:00 PM");
      }
  }
};
