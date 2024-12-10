import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import typeDefs from "./graphql/schemas/index.js";
import resolvers from "./graphql/resolvers/index.js";
import { makeExecutableSchema } from "@graphql-tools/schema";
import {createHandler} from "graphql-http/lib/use/express";

dotenv.config();

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});


const app = express();

app.use(cors());

app.use(express.json());


mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log('Error connecting to MongoDB', error);
});

app.all('/graphql', createHandler({schema}));

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});