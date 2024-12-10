var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Student, StudentModel } from "../models/Student.js";
let StudentResolver = class StudentResolver {
    async students() {
        return await StudentModel.find();
    }
    async student(id) {
        return await StudentModel.findById(id);
    }
    async createStudent(name, email) {
        const student = new StudentModel({ name, email });
        return await student.save();
    }
    async updateStudent(id, name, email) {
        return await StudentModel.findByIdAndUpdate(id, { name, email }, { new: true });
    }
    async deleteStudent(id) {
        await StudentModel.findByIdAndDelete(id);
        return true;
    }
};
__decorate([
    Query(() => [Student]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StudentResolver.prototype, "students", null);
__decorate([
    Query(() => Student, { nullable: true }),
    __param(0, Arg('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentResolver.prototype, "student", null);
__decorate([
    Mutation(() => Student),
    __param(0, Arg('name')),
    __param(1, Arg('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], StudentResolver.prototype, "createStudent", null);
__decorate([
    Mutation(() => Student, { nullable: true }),
    __param(0, Arg('id')),
    __param(1, Arg('name')),
    __param(2, Arg('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], StudentResolver.prototype, "updateStudent", null);
__decorate([
    Mutation(() => Boolean),
    __param(0, Arg('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentResolver.prototype, "deleteStudent", null);
StudentResolver = __decorate([
    Resolver(() => Student)
], StudentResolver);
export { StudentResolver };
