import {Field, ID, ObjectType} from "type-graphql";
import {prop as Property, getModelForClass} from "@typegoose/typegoose";

@ObjectType()
export class Student {
    @Field(() => ID)
    readonly id!: string;

    @Field()
    @Property({required: true})
    name!: string;

    @Field()
    @Property({required: true})
    email!: string;
}

export const StudentModel = getModelForClass(Student);