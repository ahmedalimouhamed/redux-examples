import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
    student: {type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true},
    classRooms: {type: mongoose.Schema.Types.ObjectId, ref: 'ClassRoom', required: true},
    date: {type: Date, required: true},
    statut: {type: String, required: true, enum: ['Present', 'Absent'], default: 'Present'}
}); 

export default mongoose.model('Attendance', attendanceSchema);