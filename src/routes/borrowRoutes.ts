import { Router } from "express";
import * as controller from "../controllers/borrowController";

const router = Router();

router.post("/", controller.borrowBook);
router.get("/", controller.borrowedSummary);

export default router;
