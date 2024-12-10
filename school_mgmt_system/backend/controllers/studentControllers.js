import Student from "../models/Student.js";

const studentController = {
    getAllStudents: async () => {
        try {
            return await Student.find();
        } catch (error) {
            throw new Error('Error fetching students : '+ error.message);
        }
    },

    getStudentById: async (id) => {
        try {
            const student = await Student.findById(req.params.id);
            if (!student) {
                throw new Error('Student not found');
            } else {
                return student;
            }
        } catch (error) {
            throw new Error('Error fetching student : '+ error.message);
        }
    },

    createStudent: async(name, email) => {
        try {
            const student = new Student({name, email});
            const newStudent = await student.save();
            return newStudent;
        } catch (error) {
            throw new Error('Error creating student : '+ error.message);
        }
    },

    updadeStudent: async(id, name, email) => {
        try {
            const student = await Student.findById(id);
            if (!student) {
                throw new Error('Student not found');
            } else {
                student.name = name;
                student.email = email;
                const updatedStudent = await student.save();
                return updatedStudent;
            }
        } catch (error) {
            throw new Error('Error updating student : '+ error.message);
        }
    },

    deleteStudent: async(id) => {
        try {
            const student = await Student.findById(id);

            if(!student) {
                throw new Error('Student not found');
            }

            return await student.deleteOne();

        } catch (error) {
            throw new Error('Error deleting student : '+ error.message);
        }
    }
};    

export default studentController;