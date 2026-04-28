import dotenv from "dotenv";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import geminiRoutes  from "./routes/geminiRoutes.js";
import  githubRoutes  from "./routes/githubRoutes.js";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = path.dirname(currentFilePath);

dotenv.config({ path: path.join(currentDirPath, ".env") });


const app = express();
const PORT = Number(process.env.PORT) || 3000;

    app.use(express.json());

    app.get("/", (_req, res) => {
  return res.json({ ok: true, message: "API is running" });
});

app.use("/api", geminiRoutes);
app.use("/api/github", githubRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
