import gql from 'graphql-tag';

const classTypeDefs = gql`
    type ClassRoom{
        id: ID!
        course: Course!
        teacher: Teacher!
        students: [Student]
        schedule: String!
        capacity: Int!
        roomNumber: String!
        status: String!
        startTime: String!
        endTime: String!
    }

    extend type Query{
        classRooms: [ClassRoom]
        classRoom(id: ID!): ClassRoom
        activeClassRooms: [ClassRoom]
    }

    extend type Mutation{
        addClassRoom(
            course: ID!, 
            teacher: ID!, 
            schedule: String!,
            capacity: Int!,
            roomNumber: String!,
            startTime: String!,
            endTime: String!
        ): ClassRoom
        updateClassRoom(
            id: ID!, 
            course: ID!, 
            teacher: ID!, 
            schedule: String!,
            capacity: Int,
            roomNumber: String,
            status: String,
            startTime: String,
            endTime: String
        ): ClassRoom
        deleteClassRoom(id: ID!): ClassRoom
        addStudentToClassRoom(classRoomId: ID!, studentId: ID!): ClassRoom
        removeStudentFromClassRoom(classRoomId: ID!, studentId: ID!): ClassRoom
        activateClassRoom(id: ID!): ClassRoom
        deactivateClassRoom(id: ID!): ClassRoom
    }
`;

export default classTypeDefs;