import type { Request, Response } from "express";
import db from "../db.ts"

const createMessage = async (req: Request, res: Response) => {
  const { name, message } = req.body;
  console.log("received:", req.body);

  try {
    const result = await db.query(
      `INSERT INTO messages (name, message)
       VALUES ($1, $2)
       RETURNING id, name, message`,
      [name, message]
    );

    res.status(201).json({
      success: true,
      message: "Message sent!",
      data: result.rows[0],
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "There is an error somewhere... Internal Server Error",
    });
  }
};


const getPublicMessages = async (req: Request, res: Response) => {
  try {
    const result = await db.query(`
      SELECT
        m.id,
        m.name,
        m.message,
        r.reply
      FROM messages AS m
      INNER JOIN replies AS r
        ON m.id = r.message_id
      ORDER BY r.id DESC
    `);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No public messages yet",
      });
    }

    res.json({
      success: true,
      message: "Messages fetched!",
      data: result.rows,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "There is an error somewhere... Internal Server Error",
    });
  }
};



const getAllMessages = async (req: Request, res: Response) => {
  try {
    const result = await db.query(`
      SELECT
        m.id,
        m.name,
        m.message,
      FROM messages AS m
      ORDER BY r.id DESC
    `);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No messages yet",
      });
    }

    res.json({
      success: true,
      message: "Messages fetched!",
      data: result.rows,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "There is an error somewhere... Internal Server Error",
    });
  }
};


export {
  createMessage,
  getPublicMessages,
  getAllMessages
};
