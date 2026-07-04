import express from "express";
import upload from "../middleware/upload.js";
import {
  getModels,
  uploadModel,
  updateModel,
  deleteModel,
} from "../controllers/modelController.js";

const router = express.Router();

router.get("/", getModels);
router.post("/", upload.single("model"), uploadModel);
router.put("/:id", updateModel);
router.delete("/:id", deleteModel);

export default router;