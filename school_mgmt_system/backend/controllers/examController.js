import Exam from "../models/Exam.js";

const examController = {
    getAllExams: async() => {
        try {
            const exams = await Exam.find().populate('grades');
            return exams;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    getExamById: async(id) => {
        try {
            const exam = await Exam.findById(id).populate('grades');
            if(!exam) {
                throw new Error("Exam not found");
            }
            return exam;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    createExam: async({title, course, date}) => {
        try {
            const newExam = new Exam({title, course, date});
            const savedExam = await newExam.save();
            return savedExam;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    updateExam: async(id, title, course, date) => {
        try {
            const updatedExam = await Exam.findByIdAndUpdate(id, {title, course, date}, {new: true});
            return updatedExam;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    deleteExam: async(id) => {
        try{
            const deletedExam = await Exam.findByIdAndDelete(id);
            return deletedExam;
        } catch (error) {
            throw new Error(error.message);
        }
    }

};

export default examController;