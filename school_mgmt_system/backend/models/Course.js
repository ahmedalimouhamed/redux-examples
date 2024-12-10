import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    name: {type: String, required: true},
    code: {type: String, required: true, unique: true},
    teacher: {type: mongoose.Schema.Types.ObjectId, ref: "Teacher"},
    students: [{type: mongoose.Schema.Types.ObjectId, ref: "Student"}],
    classRooms: [{type: mongoose.Schema.Types.ObjectId, ref: "ClassRoom"}]
});

export default mongoose.model("Course", courseSchema);