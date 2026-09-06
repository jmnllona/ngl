import { Router } from "express";
import { createMessage, getPublicMessages, getAllMessages } from "../controllers/messageController.ts"

const router = Router();

router.post("/messages", createMessage);
router.get("/public-messages", getPublicMessages);
router.get("/all-messages", getAllMessages)
export default router;
