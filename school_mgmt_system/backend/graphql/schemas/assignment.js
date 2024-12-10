import gql from 'graphql-tag';
const assignementTypeDefs = gql`
    type Submission{
        student: Student!
        fileUrl: String!
        submitedAt: String!
    }

    type Assignment{
        id: ID!
        titre: String!
        description: String!
        dueDate: String!
        course: Course!
        submissions: [Submission]
    }

    extend type Query{
        assignments: [Assignment]
        assignment(id: ID!): Assignment
    }

    extend type Mutation{
        addAssignment(titre: String!, description: String!, dueDate: String!, course: ID!): Assignment
        updateAssignment(id: ID!, titre: String!, description: String!, dueDate: String!, course: ID!): Assignment
        deleteAssignment(id: ID!): Assignment
    }
`;

export default assignementTypeDefs;