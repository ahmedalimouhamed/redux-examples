import express from "express";
import courseResolvers from "../graphql/resolvers/course.js";

const router = express.Router();

router.get("/", courseResolvers.courses);
router.get("/:id", courseResolvers.course);
router.post("/", courseResolvers.addCourse);
router.put("/:id", courseResolvers.updateCourse);
router.delete("/:id", courseResolvers.deleteCourse);

export default router;