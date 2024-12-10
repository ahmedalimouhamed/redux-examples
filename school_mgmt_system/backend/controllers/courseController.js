import Course from "../models/Course.js";

const courseController = {
    getAllCourses : async() => {
        try{
            const courses = await Course.find();
            res.status(200).json(courses);
        }catch(error){
            throw new Error(error.message);
        }
    },
    getCourseById : async(id) => {
        try{
            const course = await Course.findById(id);
            if(!course) {
                throw new Error("Course not found");
            }
            return course;
        }catch(error){
            throw new Error(error.message);
        }
    },
    creaeCourse : async(name, code) => {
        try{
            const newCourse = new Course({ name, code });
            return await newCourse.save();
        }catch(error){
            throw new Error(error.message);
        }
    },

    updateCourse : async(id, name, code) => {
        try{
            const courseToUpdate = await Course.findById(id);
    
            if(!courseToUpdate) {
                res.status(404).json({ message: "Course not found" });
                return;
            }
    
            courseToUpdate.name = name;
            courseToUpdate.code = code;
            return await courseToUpdate.save();  
        }catch(error){
            throw new Error(error.message);
        }
    },

    deleteCourse : async(id) => {
        try{
            const courseToDelete = await Course.findById(id);
            if(!courseToDelete) {
                throw new Error("Course not found");
            }
            return await Course.findByIdAndDelete(id);
        }catch(error){    
            throw new Error(error.message);
        }
    }   
}

export default courseController;