import mongoose from "mongoose";

const classRoomSchema = new mongoose.Schema({
    course: {type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true},
    teacher: {type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true},
    students: [{type: mongoose.Schema.Types.ObjectId, ref: "Student"}],
    schedule: {type: String, required: true},
    capacity: {type: Number, required: true, min: 1},
    roomNumber: {type: String, required: true},
    status: {type: String, enum: ['active', 'inactive'], default: 'active'},
    startTime: {type: String, required: true},
    endTime: {type: String, required: true}
});

// Add validation to check student capacity
classRoomSchema.pre('save', function(next) {
    if (this.students && this.students.length > this.capacity) {
        next(new Error('classRoom capacity exceeded'));
    }
    next();
});

export default mongoose.model("ClassRoom", classRoomSchema);