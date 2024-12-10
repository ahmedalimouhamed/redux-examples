import gql from 'graphql-tag';

const examTypeDefs = gql`
    type Exam{
        id: ID!
        title: String!
        course: Course!
        date: String!
        grades: [Grade]
    }

    extend type Query{
        exams: [Exam]
        exam(id: ID!): Exam
    }

    extend type Mutation{    
        addExam(title: String!, course: ID!, date: String!): Exam
        updateExam(id: ID!, title: String!, course: ID!, date: String!): Exam    
        deleteExam(id: ID!): Exam
    }
`;

export default examTypeDefs;