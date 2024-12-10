import assignmentController from "../../controllers/assignmentController.js";

const assignmentResolvers = {
    Query: {
        assignments: async() => await assignmentController.getAllAssignments(),
        assignment: async(_, {id}) => await assignmentController.getAssignmentById(id)
    },

    Mutation: {
        addAssignment: async(_, {titre, description, dueDate, course})=> await assignmentController.createAssignment({titre, description, dueDate, course}),
        updateAssignment: async(_, {id, titre, description, dueDate, course}) => await assignmentController.updateAssignment({id, titre, description, dueDate, course}),
        deleteAssignment: async(_, {id}) => await assignmentController.deleteAssignment(id)
    }
}
    
export default assignmentResolvers;