import Attendance from "../models/Attendance.js";

const attendanceController = {
    getAllAttendances: async (req, res) => {
        try {
            return await Attendance.find();
        } catch (error) {
            throw new Error('Server error : ' + error.message);
        }
    },

    getAttendanceById: async (req, res) => {
        try {
            const { id } = req.params;
            const attendance = await Attendance.findById(id);
            if (!attendance) {
                throw new Error("Attendance not found");
            }
            res.json(attendance);
        } catch (error) {
            throw new Error('Server error : ' + error.message);
        }
    },

    createAttendance: async (req, res) => {
        try {
            //const { student, class, date, statut } = req.body;
            const newAttendance = new Attendance(req.body);
            return await newAttendance.save();
        } catch (error) {
            throw new Error('Server error : ' + error.message);
        }

    },

    updateAttendance: async (req, res) => {
        try {
            const { id } = req.params;
            //const { student, class, date, statut } = req.body;
            const updatedAttendance = await Attendance.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedAttendance) {
                throw new Error("Attendance not found");
            }
            return updatedAttendance;
        } catch (error) {
            throw new Error('Server error : ' + error.message);
        }
    },

    deleteAttendance: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedAttendance = await Attendance.findByIdAndDelete(id);
            if (!deletedAttendance) {
                throw new Error("Attendance not found");
            }
            return deletedAttendance;
        } catch (error) {
            throw new Error('Server error : ' + error.message);
        }
    }
};

export default attendanceController;