import express from "express";
import classRoomResolvers from "../graphql/resolvers/classRoom.js";

const router = express.Router();

router.get("/", classRoomResolvers.classRooms);
router.get("/:id", classRoomResolvers.classRoom);
router.post("/", classRoomResolvers.addClassRoom);
router.put("/:id", classRoomResolvers.updateClassRoom);
router.delete("/:id", classRoomResolvers.deleteClassRoom);

export default router;