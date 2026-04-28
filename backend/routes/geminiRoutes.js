import express from "express";
import { generateWithGemini } from "../controllers/geminiController.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post(
    "/gemini-service",
    upload.array("files", 5), // justere på filene
    generateWithGemini
);

export default router;