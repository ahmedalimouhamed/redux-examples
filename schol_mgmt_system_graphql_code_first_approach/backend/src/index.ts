import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import {buildSchema} from "type-graphql";
import mongoose from "mongoose";
import {TeacherResolver} from "./resolvers/TeacherResolver.js";
import {StudentResolver} from "./resolvers/StudentResolver.js";

async function bootstrap() {
    const app = express();

    await mongoose.connect("mongodb://127.0.0.1:27017/school_mgmt_db_code_first")
        .then(() => console.log("MongoDB connected"));

    const schema = await buildSchema({
        resolvers: [TeacherResolver, StudentResolver],
        validate: false
    });

    const server = new ApolloServer({schema});

    await server.start();

    server.applyMiddleware({app});

    app.listen(8000, () => {
        console.log("Server started on http://127.0.0.1:8000/graphql");
    });
}

bootstrap();