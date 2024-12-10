import attendanceController from "../../controllers/attendanceController.js";


const attendanceResolvers = {
    Query: {
        attendances: async() => await attendanceController.getAllAttendances(),
        attendance: async(_, {id}) => await attendanceController.getAttendanceById(id)
    },

    Mutation: {
        addAttendance: async(_, {student, classRoom, date, statut}) => await attendanceController.createAttendance({student, classRoom, date, statut}), 

        updateAttendance: async(_, {id, student, classRoom, date, statut}) => await attendanceController.updateAttendance({id, student, classRoom, date, statut}),

        deleteAttendance: async(_, {id}) => await attendanceController.deleteAttendance(id)
    }

}

export default attendanceResolvers; 
    