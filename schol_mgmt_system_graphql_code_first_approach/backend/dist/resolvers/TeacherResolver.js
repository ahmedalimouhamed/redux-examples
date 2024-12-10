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
import { Teacher, TeacherModel } from "../models/Teacher.js";
let TeacherResolver = class TeacherResolver {
    async teachers() {
        return await TeacherModel.find();
    }
    async teacher(id) {
        return await TeacherModel.findById(id);
    }
    async createTeacher(name, email) {
        const teacher = new TeacherModel({ name, email });
        return await teacher.save();
    }
    async updateTeacher(id, name, email) {
        return await TeacherModel.findByIdAndUpdate(id, { name, email }, { new: true });
    }
    async deleteTeacher(id) {
        await TeacherModel.findByIdAndDelete(id);
        return true;
    }
};
__decorate([
    Query(() => [Teacher]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TeacherResolver.prototype, "teachers", null);
__decorate([
    Query(() => Teacher),
    __param(0, Arg('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeacherResolver.prototype, "teacher", null);
__decorate([
    Mutation(() => Teacher),
    __param(0, Arg('name')),
    __param(1, Arg('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TeacherResolver.prototype, "createTeacher", null);
__decorate([
    Mutation(() => Teacher),
    __param(0, Arg('id')),
    __param(1, Arg('name')),
    __param(2, Arg('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], TeacherResolver.prototype, "updateTeacher", null);
__decorate([
    Mutation(() => Boolean),
    __param(0, Arg('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeacherResolver.prototype, "deleteTeacher", null);
TeacherResolver = __decorate([
    Resolver(() => Teacher)
], TeacherResolver);
export { TeacherResolver };
