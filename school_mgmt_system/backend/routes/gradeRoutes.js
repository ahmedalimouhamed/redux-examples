import express from "express";
import gradeResolvers from "../graphql/resolvers/grade.js";

const router = express.Router();

router.get("/", gradeResolvers.grades);
router.get("/:id", gradeResolvers.grade);
router.post("/", gradeResolvers.addGrade);
router.put("/:id", gradeResolvers.updateGrade);
router.delete("/:id", gradeResolvers.deleteGrade);

export default router;