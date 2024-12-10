import express from "express";
import assignmentResolvers from "../graphql/resolvers/assignment.js";

const router = express.Router();

router.get("/", assignmentResolvers.assignements);
router.get("/:id", assignmentResolvers.assignment);
router.post("/", assignmentResolvers.addAssignement);
router.put("/:id", assignmentResolvers.updateAssignement);
router.delete("/:id", assignmentResolvers.deleteAssignement);    

export default router;