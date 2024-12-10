import express from "express";
import studentResolvers from "../graphql/resolvers/student.js";

const router = express.Router();

router.get("/", studentResolvers.students);
router.get("/:id", studentResolvers.student);
router.post("/", studentResolvers.addStudent);
router.put("/:id", studentResolvers.updateStudent);
router.delete("/:id", studentResolvers.deleteStudent);

export default router;