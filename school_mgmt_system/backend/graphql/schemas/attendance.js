import gql from 'graphql-tag';

const attendanceTypeDefs = gql`
    type Attendance{
        id: ID!
        student: Student!
        classRoom: ClassRoom!
        date: String!
        statut: String!
    }

    extend type Query{
        attendances: [Attendance]
        attendance(id: ID!): Attendance
    }

    extend type Mutation{
        addAttendance(student: ID!, classRoom: ID!, date: String!, statut: String!): Attendance
        updateAttendance(id: ID!, student: ID!, classRoom: ID!, date: String!, statut: String!): Attendance
        deleteAttendance(id: ID!): Attendance
    }
`;

export default attendanceTypeDefs;