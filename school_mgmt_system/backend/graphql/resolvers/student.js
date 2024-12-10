import studentController from "../../controllers/studentControllers.js";

const studentResolvers = {
    Query: {
        students : async() => await studentController.getAllStudents(),
        student: async(_, {id}) => await studentController.getStudent(id)
    }, 

    Mutation: {
        addStudent: async(_, {name, email}) => await studentController.createStudent({name, email}),
        updateStudent: async(_, {id, name, email}) => await studentController.updateStudent(id, {name, email}),
        deleteStudent: async(_, {id}) => await studentController.deleteStudent(id)
    }
};

export default studentResolvers;