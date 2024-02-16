// routes/userRoutes.ts

import express from "express";

import { saveImageAndGetImageUrl } from "../controllers/ImageController";

const router = express.Router();

router.post("/saveImageAndGetImageUrl", saveImageAndGetImageUrl);

export default router;
