import teacherController from "../../controllers/teacherController.js";

const teacherResolvers = {
    Query: {
        teachers: async() => await teacherController.getAllTeachers(),
        teacher: async(_, {id}) => await teacherController.getTeacherById(id),
    },

    Mutation: {
        addTeacher: async(_, {name, email}) => await teacherController.createTeacher(name, email),

        updateTeacher: async(_, {id, name, email}) =>await teacherController.updateTeacher(id, name, email),

        deleteTeacher: async(_, {id}) => await teacherController.deleteTeacher(id)
    }
}

export default teacherResolvers;