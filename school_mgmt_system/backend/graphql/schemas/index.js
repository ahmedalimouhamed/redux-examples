import {mergeTypeDefs} from '@graphql-tools/merge';

import assignmentTypeDefs from './assignment.js';
import attendanceTypeDefs from './attendance.js';
import classRoomTypeDefs from './classRoom.js';
import courseTypeDefs from './course.js';
import examTypeDefs from './exam.js';
import gradeTypeDefs from './grade.js';
import studentTypeDefs from './student.js';
import teacherTypeDefs from './teacher.js';


// Define the base types
const baseTypeDefs = `
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

const typeDefs = mergeTypeDefs([
    baseTypeDefs,
    assignmentTypeDefs,
    attendanceTypeDefs,
    classRoomTypeDefs,
    courseTypeDefs,
    examTypeDefs,
    gradeTypeDefs,
    studentTypeDefs,
    teacherTypeDefs
]);

export default typeDefs;