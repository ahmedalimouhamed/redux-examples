import mongoose from 'mongoose';

const gradeSchema = new mongoose.Schema({
    student: {type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true},
    exam: {type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true},
    grade: {type: Number, required: true}
});

export default mongoose.model('Grade', gradeSchema);