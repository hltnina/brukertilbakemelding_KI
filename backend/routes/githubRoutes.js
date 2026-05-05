import { Router } from "express";
import {
  createIssue,
  getDefaultRepoIssues,
  getRepoIssues,
  getUserIssues,
} from "../controllers/githubController.js";

const router = Router();

router.post("/issues", createIssue);
router.get("/issues/repo", getDefaultRepoIssues);
router.get("/issues/repo/:owner/:repo", getRepoIssues);
router.get("/issues/user/:username", getUserIssues);

export { router as githubRoutes };
export default router;