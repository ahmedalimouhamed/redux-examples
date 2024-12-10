import classRoomController from "../../controllers/classRoomController.js";

const ClassRoomResolvers = {
    Query: {
        classRooms: async() => await classRoomController.getAllClassRooms(),
        classRoom: async(_, {id}) => await classRoomController.getClassRoomById(id)
    },

    Mutation: {
        addClassRoom: async(_, { course, teacher, schedule, capacity, roomNumber, startTime, endTime }) => await classRoomController.addClassRoom(course, teacher, schedule, capacity, roomNumber, startTime, endTime),
        updateClassRoom: async(_, { id, course, teacher, schedule, capacity, roomNumber, status, startTime, endTime }) => await classRoomController.updateClassRoom(id, course, teacher, schedule, capacity, roomNumber, status, startTime, endTime),
        deleteClassRoom: async(_, {id}) => await classRoomController.deleteClassRoom(id),
        addStudentToClassRoom: async(_, { ClassRoomId, studentId }) => await classRoomController.addStudentToClassRoom(ClassRoomId, studentId),
        removeStudentFromClassRoom: async(_, { ClassRoomId, studentId }) => await classRoomController.removeStudentFromClassRoom(ClassRoomId, studentId),
        activateClassRoom: async(_, { id }) => await classRoomController.activateClassRoom(id),
        deactivateClassRoom: async(_, { id }) => await classRoomController.deactivateClassRoom(id)
    }
}

export default ClassRoomResolvers;