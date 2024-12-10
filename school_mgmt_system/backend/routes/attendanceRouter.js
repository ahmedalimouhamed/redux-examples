import express from "express";
import attendanceResolvers from "../graphql/resolvers/attendance.js";

const router = express.Router();

router.get("/", attendanceResolvers.attendances);
router.get("/:id", attendanceResolvers.attendance);
router.post("/", attendanceResolvers.addAttendance);
router.put("/:id", attendanceResolvers.updateAttendance);
router.delete("/:id", attendanceResolvers.deleteAttendance);

export default router;