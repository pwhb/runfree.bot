import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

const AutoIncrement = mongooseSequence(mongoose);

const StudentSchema = new mongoose.Schema({
  telegram_id: String,
  student_id: Number,
  username: String,
  first_name: String,
  last_name: String,
  reason_for_joining: String,
  reason_for_leaving: String,
});

StudentSchema.plugin(AutoIncrement, { inc_field: "student_id" });

export const B13Student = mongoose.model("B13_Student", StudentSchema);
