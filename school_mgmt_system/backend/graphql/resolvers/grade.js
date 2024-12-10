import gradeController from '../../controllers/gradeController.js';

const gradeResolvers = {
    Query: {
        grades: async() => await gradeController.getAllGrades(),
        grade: async(_, {id}) => await gradeController.getGradById(id)
    },

    Mutation: {
        addGrade: async(_, {student, exam, grade}) => await gradeController.createGrade({student, exam, grade}),

        updateGrade: async(_, {id, student, exam, grade}) => await gradeController.updateGrade(id, {student, exam, grade}),

        deleteGrade: async(_, {id}) => await gradeController.deleteGrade(id)
    }
};

export default gradeResolvers;