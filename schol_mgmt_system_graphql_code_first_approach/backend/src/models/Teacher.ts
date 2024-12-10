import {Field, ID, ObjectType} from "type-graphql";
import {prop as Property, getModelForClass} from "@typegoose/typegoose";

@ObjectType()
export class Teacher {
    @Field(() => ID)
    readonly id!: string

    @Field()
    @Property({required: true})
    name!: string

    @Field()    
    @Property({required: true, unique: true})
    email!: string    
}

export const TeacherModel = getModelForClass(Teacher);