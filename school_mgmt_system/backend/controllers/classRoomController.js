import ClassRoom from "../models/ClassRoom.js";

const classRoomController = {
    getAllClasses : async () => {
        return await ClassRoom.find();
    },

    getClassRoomById : async(id) => {
        const foundedClassRoom = await ClassRoom.findById(id);

        if(!foundedClassRoom) {
            throw new Error("ClassRoom not found");
        }

        return foundedClassRoom;   
    },

    createClassRoom : async(req, res) => {
        try{
            const { course, teacher, schedule } = req.body;
            const newClassRoom = new ClassRoom({ course, teacher, schedule });
            return await newClassRoom.save();
        }catch(error){
            res.status(500).json({ message: error.message });
        }
    },

    updateClassRoom : async(req, res) => {
        try{
            const { id } = req.params;
            const { course, teacher, schedule } = req.body;
            const classRoomToUpdate = await ClassRoom.findById(id);
    
            if(!classRoomToUpdate) {
                throw new Error("Class not found");
            }
    
            classRoomToUpdate.course = course;
            classRoomToUpdate.teacher = teacher;
            classRoomToUpdate.schedule = schedule;
            return await classRoomToUpdate.save();  
        }catch(error){
            throw new Error(error.message);
        }
    },

    addStudentToClassRoom : async(req, res) => {
        try{
            const { id } = req.params;
            const { student } = req.body;
            const classRoomToUpdate = await ClassRoom.findById(id);
    
            if(!classRoomToUpdate) {
                throw new Error("Class not found");
            }
    
            classRoomToUpdate.students.push(student);
            return await classToUpdate.save();  
        }catch(error){
            throw new Error(error.message);
        }
    },

    removeStudentFromClassRoom : async(req, res) => {
        try{
            const { id } = req.params;
            const { student } = req.body;
            const classRoomToUpdate = await ClassRoom.findById(id);
    
            if(!classRoomToUpdate) {
                throw new Error("Class not found");
            }
    
            classRoomToUpdate.students = classRoomToUpdate.students.filter(s => s !== student);
            return await classToUpdate.save();  
        }catch(error){
            throw new Error(error.message);
        }
    },

    activateClassRoom : async(req, res) => {
        try{
            const { id } = req.params;
            const classRoomToUpdate = await ClassRoom.findById(id);
    
            if(!classRoomToUpdate) {
                throw new Error("Class not found");
            }
    
            classRoomToUpdate.active = true;
            return await classToUpdate.save();  
        }catch(error){
            throw new Error(error.message);
        }
    },

    desactivateClassRoom : async(req, res) => {
        try{
            const { id } = req.params;
            const classRoomToUpdate = await ClassRoom.findById(id);
    
            if(!classRoomToUpdate) {
                throw new Error("Class not found");
            }
    
            classRoomToUpdate.active = false;
            return await classRoomToUpdate.save();  
        }catch(error){
            throw new Error(error.message);
        }
    }

}

export default classRoomController;