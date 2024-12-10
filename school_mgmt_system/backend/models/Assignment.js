import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
    titre: {type: String, required: true},
    description: {type: String, required: true},
    dueDate: {type: Date, required: true},
    course: {type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true},
    submissions: [
        {
            student: {type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true},
            fileUrl: {type: String},
            submitedAt: {type: Date, default: Date.now}
        }
    ]
});

export default mongoose.model("Assignment", assignmentSchema);