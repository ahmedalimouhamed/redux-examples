import {Arg, Mutation, Query, Resolver} from "type-graphql";
import {Teacher, TeacherModel} from "../models/Teacher.js";

@Resolver(() => Teacher)
export class TeacherResolver{

    @Query(() => [Teacher])
    async teachers(): Promise<Teacher[]> {
        return await TeacherModel.find();
    }

    @Query(() => Teacher)
    async teacher(@Arg('id') id: string): Promise<Teacher | null> {
        return await TeacherModel.findById(id);
    }

    @Mutation(() => Teacher)
    async createTeacher(@Arg('name') name: string, @Arg('email') email: string): Promise<Teacher> {
        const teacher = new TeacherModel({name, email});
        return await teacher.save();
    }

    @Mutation(() => Teacher)
    async updateTeacher(@Arg('id') id: string, @Arg('name') name: string, @Arg('email') email: string): Promise<Teacher | null> {
        return await TeacherModel.findByIdAndUpdate(id, {name, email}, {new: true});
    }

    @Mutation(() => Boolean)
    async deleteTeacher(@Arg('id') id: string): Promise<boolean> {
        await TeacherModel.findByIdAndDelete(id);
        return true;
    }
}