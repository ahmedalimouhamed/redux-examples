import gql from 'graphql-tag';

const courseTypeDefs = gql`
    type Course{
        id: ID!
        name: String!
        code: String!
        teacher: Teacher
        students: [Student]
        classRooms: [ClassRoom]
    }

    extend type Query{
        courses: [Course]
        course(id: ID!): Course
    }

    extend type Mutation{
        addCourse(name: String!, code: String!): Course
        updateCourse(id: ID!, name: String!, code: String!): Course
        deleteCourse(id: ID!): Course
    }
`;

export default courseTypeDefs;