// routes/userRoutes.ts

import express from "express";

import {
  getAllImages,
  saveImageAndGetImageUrl,
} from "../controllers/ImageController";

const router = express.Router();

router.post("/saveImageAndGetImageUrl", saveImageAndGetImageUrl);
router.get("/getAllImages", getAllImages);

export default router;
