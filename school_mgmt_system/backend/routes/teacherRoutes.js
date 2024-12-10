import express from "express";
import teacherResolvers from "../graphql/resolvers/teacher.js";

const router = express.Router();

router.get("/", teacherResolvers.teachers);
router.get("/:id", teacherResolvers.teacher);
router.post("/", teacherResolvers.addTeacher);
router.put("/:id", teacherResolvers.updateTeacher);
router.delete("/:id", teacherResolvers.deleteTeacher);

export default router;