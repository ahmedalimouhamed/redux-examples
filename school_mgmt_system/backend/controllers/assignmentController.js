import Assignment from "../models/Assignment.js";

const assignmentController = {
    getAllAssignments: async (req, res) => {
        try {
            return await Assignment.find();
        } catch (error) {
            throw new Error('Error fetching assignments : '+ error.message);
        }
    },

    getAssignmentById: async (req, res) => {
        try {
            const assignment = await Assignment.findById(req.params.id);
            if (!assignment) {
                throw new Error("Assignment not found");
            }

            return assignment;

        } catch (error) {
            throw new Error('Error fetching assignment : '+ error.message);
        }
    },

    createAssignment: async (req, res) => {
        try {
            const { titre, description, dueDate, course } = req.body;
            const assignment = new Assignment({ titre, description, dueDate, course });
            const newAssignment = await assignment.save();
            return newAssignment;
        } catch (error) {
            throw new Error('Error creating assignment : '+ error.message);
        }
    },

    updateAssignment: async (req, res) => {
        try {
            const assignment = await Assignment.findById(req.params.id);

            if (!assignment) {
                throw new Error("Assignment not found");
            }

            const { titre, description, dueDate, course } = req.body;

            assignment.titre = titre;
            assignment.description = description;
            assignment.dueDate = dueDate;
            assignment.course = course;

            const updatedAssignment = await assignment.save();
            return updatedAssignment;
        } catch (error) {
            throw new Error('Error updating assignment : '+ error.message);
        }
    },

    deleteAssignment: async (req, res) => {
        try{
            const assignment = await Assignment.findById(req.params.id);

            if(!assignment) {
                throw new Error("Assignment not found");
            }

            await assignment.deleteOne();
            return "Assignment deleted successfully";   
        }catch(error){
            throw new Error(error.message);
        }
    }
};

export default assignmentController;