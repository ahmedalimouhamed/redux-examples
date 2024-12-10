import gql from 'graphql-tag';

const teacherTypeDefs = gql`
    type Teacher{
        id: ID!
        name: String!
        email: String!
        courses: [Course]
    }

    extend type Query{
        teachers: [Teacher]
        teacher(id: ID!): Teacher
    }

    extend type Mutation{
        addTeacher(name: String!, email: String!): Teacher
        updateTeacher(id: ID!, name: String!, email: String!): Teacher
        deleteTeacher(id: ID!): Teacher
    }
`;

export default teacherTypeDefs;