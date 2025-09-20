import { Router } from "express";
import * as controller from "../controllers/bookController";

const router = Router();

router.post("/", controller.createBook);
router.get("/", controller.getAllBooks);
router.get("/:bookId", controller.getBookById);
router.put("/:bookId", controller.updateBook);
router.delete("/:bookId", controller.deleteBook);

export default router;
