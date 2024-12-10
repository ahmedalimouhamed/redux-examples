import { mergeResolvers } from "@graphql-tools/merge";

import assignmentResolvers from "./assignment.js";
import attendanceResolvers from "./attendance.js";
import classResolvers from "./classRoom.js";
import courseResolvers from "./course.js";
import examResolvers from "./exam.js";
import gradeResolvers from "./grade.js";
import studentResolvers from "./student.js";
import teacherResolvers from "./teacher.js";

const resolvers = mergeResolvers([
    assignmentResolvers,
    attendanceResolvers,
    classResolvers,
    courseResolvers,
    examResolvers,
    gradeResolvers,
    studentResolvers,
    teacherResolvers
]);

export default resolvers;