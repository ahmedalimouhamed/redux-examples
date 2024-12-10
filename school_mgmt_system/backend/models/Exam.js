import mongoose from 'mongoose';

const examSchema = new mongoose.Schema({
    title: {type: String, required: true},
    course: {type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true},
    date: {type: Date, required: true},
    grades: [{type: mongoose.Schema.Types.ObjectId, ref: 'Grades'}]
});

export default mongoose.model('Exam', examSchema, 'Exams'); 
