import { Router } from "express";
import pool from "../db.js"
import { createMessage, getPublicMessages, getAllMessages } from "../controllers/messageController.js"

const router = Router();

router.post("/messages", createMessage);
router.get("/public-messages", getPublicMessages);
router.get("/all-messages", getAllMessages)


router.post("/visit", async (_req, res) => {
    try {
        await pool.query(
            "INSERT INTO visitors (viewed) VALUES ('1')"
        );

        res.status(201).json({
            message: "Visit recorded"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to record visit"
        });
    }
});


export default router;
