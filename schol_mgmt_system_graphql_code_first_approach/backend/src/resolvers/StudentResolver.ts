import {Arg, Mutation, Query, Resolver} from "type-graphql";
import {Student, StudentModel} from "../models/Student.js";

@Resolver(() => Student)
export class StudentResolver {

    @Query(() => [Student])
    async students(): Promise<Student[]> {
        return await StudentModel.find();
    }

    @Query(() => Student, {nullable: true})
    async student(@Arg('id') id: string): Promise<Student | null> {
        return await StudentModel.findById(id);
    }

    @Mutation(() => Student)
    async createStudent(@Arg('name') name: string, @Arg('email') email: string): Promise<Student> {
        const student = new StudentModel({name, email});
        return await student.save();
    }

    @Mutation(() => Student, {nullable: true})
    async updateStudent(@Arg('id') id: string, @Arg('name') name: string, @Arg('email') email: string): Promise<Student | null> {
        return await StudentModel.findByIdAndUpdate(id, {name, email}, {new: true});
    }

    @Mutation(() => Boolean)
    async deleteStudent(@Arg('id') id: string): Promise<boolean> {
        await StudentModel.findByIdAndDelete(id);
        return true;
    }


}   