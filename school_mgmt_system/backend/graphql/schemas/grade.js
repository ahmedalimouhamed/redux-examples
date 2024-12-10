import gql from 'graphql-tag';

const gradeTypeDefs = gql `
    type Grade{
        id: ID!
        student: Student!
        exam: Exam!
        grade: Float!
    }

    extend type Query{
        grades: [Grade]
        grade(id: ID!): Grade
    }

    extend type Mutation{    
        addGrade(student: ID!, exam: ID!, grade: Float!): Grade
        updateGrade(id: ID!, student: ID!, exam: ID!, grade: Float!): Grade
        deleteGrade(id: ID!): Grade
    }
`;

export default gradeTypeDefs;