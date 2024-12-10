import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    courses: [{type: mongoose.Schema.Types.ObjectId, ref: "Course"}]
});

export default mongoose.model("Teacher", teacherSchema);