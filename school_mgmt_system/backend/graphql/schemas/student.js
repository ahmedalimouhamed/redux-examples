import gql from 'graphql-tag';

const studentTypeDefs = gql`
    type Student{
        id: ID!
        name: String!
        email: String!
        enrolledCourses: [Course]
        attendance: [Attendance]
        grades: [Grade]
    }

    extend type Query {
        students: [Student]
        student(id: ID!): Student
    }

    extend type Mutation {
        addStudent(name: String!, email: String!): Student
        updateStudent(id: ID!, name: String!, email: String!): Student
        deleteStudent(id: ID!): Student
    }
`;

export default studentTypeDefs;