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
  attendance: [Boolean],
});

StudentSchema.plugin(AutoIncrement, { inc_field: "student_id" });

const ProjectSchema = new mongoose.Schema({
  name: String,
  desc: String,
  first_name: String,
  telegram_id: String,
  type: String,
  updated_at: Date,
});

export const B13Project = mongoose.model("B13_Project", ProjectSchema);

export const B13Student = mongoose.model("B13_Student", StudentSchema);
