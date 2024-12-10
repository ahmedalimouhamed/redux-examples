import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    enrolledCourses: [{type: mongoose.Schema.Types.ObjectId, ref: "Course"}],
    attendance: [{type: mongoose.Schema.Types.ObjectId, ref: "Attendance"}],
    grades: [{type: mongoose.Schema.Types.ObjectId, ref: "Grades"}]
});

export default mongoose.model("Student", studentSchema);

