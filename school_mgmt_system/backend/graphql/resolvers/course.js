import courseController from "../../controllers/courseController.js";

const courseResolvers = {
    Query: {
        courses: async() => await courseController.getAllCourses(),
        course: async(_, {id}) => await courseController.getCourseById(id)
    },
    Mutation: {
        addCourse: async(_, {name, code}) => await courseController.creaeCourse(name, code),

        updateCourse: async(_, {id, name, code}) => await courseController.updateCourse(id, name, code),

        deleteCourse: async(_, {id}) => await courseController.deleteCourse(id)
    }
}

export default courseResolvers;