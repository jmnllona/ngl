import type { Request, Response } from "express";
declare const createMessage: (req: Request, res: Response) => Promise<void>;
declare const getPublicMessages: (_req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const getAllMessages: (_req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export { createMessage, getPublicMessages, getAllMessages };
//# sourceMappingURL=messageController.d.ts.map