import express from "express";
import examResolvers from "../graphql/resolvers/exam.js";

const router = express.Router();

router.get("/", examResolvers.getAllExams);
router.get("/:id", examResolvers.exam);
router.post("/", examResolvers.addExam);
router.put("/:id", examResolvers.updateExam);
router.delete("/:id", examResolvers.deleteExam);

export default router;