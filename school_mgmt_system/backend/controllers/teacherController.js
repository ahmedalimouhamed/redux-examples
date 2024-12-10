import Teacher from "../models/Teacher.js";

const teacherController = {
    getAllTeachers: async() => {
        return await Teacher.find();
    },

    getTeacherById: async(id) => {
        const teacher = await Teacher.findById(id);

        if(!teacher) {
            throw new Error("Teacher not found");
        }

        return teacher;
    },

    createTeacher: async(name, email) => {
        try {
            const teacher = new Teacher({ name, email });
            return await teacher.save();
        } catch (error) {
            throw new Error(error.message);
        }
    },

    updateTeacher: async(id, name, email) => {
        try {
            const teacher = await Teacher.findById(id);

            if(!teacher) {
                res.status(404).json({ message: "Teacher not found" });
                return;
            }

            teacher.name = name;
            teacher.email = email;
            return await teacher.save();
        } catch (error) {
            throw new Error(error.message);
        }
    },

    deleteTeacher: async(id) => {
        try {
            return await Teacher.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

export default teacherController;
