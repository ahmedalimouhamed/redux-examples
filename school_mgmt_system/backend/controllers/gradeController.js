import Grade from "../models/Grade.js";

const gradeController = {
    getAllGrades: async() => {
        try {
            const grades = await Grade.find().populate('student').populate('exam');
            return grades;
        } catch (error) {
            throw new Error(error.message);
        }
    },  

    getGradById: async(id) => {
        try {
            const grade = await Grade.findById(id).populate('student').populate('exam');
            return grade;
        } catch (error) {
            throw new Error(error.message);
        }
    },  

    createGrade: async(student, exam, score) => {
        try {
            const newGrade = new Grade({student, exam, score});
            const savedGrade = await newGrade.save();
            return savedGrade;
        } catch (error) {
            throw new Error(error.message);
        }
    },  


    updateGrade: async(id, student, exam, score) => {
        try {
            const grade = await Grade.findById(id);
            if(!grade) {
                throw new Error("Grade not found");
            }

            const updatedGrade = await Grade.findByIdAndUpdate(id, {student, exam, score}, {new: true});
            return updatedGrade;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    deleteGrade: async(id) => {
        try {
            const deletedGrade = await Grade.findByIdAndDelete(id);
            if(!deletedGrade) {
                throw new Error("Grade not found");
            }
            return deletedGrade;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

export default gradeController; 
