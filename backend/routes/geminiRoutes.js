import { Router } from "express";
import { generateWithGemini } from "../controllers/geminiController.js";

const router = Router();

router.post("/gemini-service", generateWithGemini);

export { router as geminiRoutes };
export default router;