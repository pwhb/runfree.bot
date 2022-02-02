import { B13Student } from "../models/index.js";
export const b13Register = async ({
  telegram_id,
  username,
  first_name,
  last_name,
}) => {
  const doc = await B13Student.findOne({ telegram_id });

  if (doc === null) {
    const student = await B13Student.create({
      telegram_id,
      username,
      first_name,
      last_name,
    });
    return student;
  }
  return { ...doc._doc, created: true };
};

export const b13MyID = async ({ telegram_id }) => {
  const doc = await B13Student.findOne({ telegram_id });
  if (doc === null) {
    return null;
  }
  return { ...doc._doc, created: true };
};
