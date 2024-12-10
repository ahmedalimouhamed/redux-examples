import examController from "../../controllers/examController.js";

const examResolvers = {
    Query: {
        exams: async() => await examController.getAllExams(),
        exam: async(_, {id}) => await examController.getExamById(id)
    },

    Mutation: {
        addExam: async(_, {title, course, date}) => await examController.createExam(title, course, date),

        updateExam: async(_, {id, title, course, date}) => await examController.updateExam(id, title, course, date),

        deleteExam: async(_, {id}) => await examController.deleteExam(id)       

    }
}

export default examResolvers;