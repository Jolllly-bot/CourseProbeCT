import { getServerSession } from "next-auth/next";
import * as db from "../../../../../../services/database.mjs";

export default async function handler(req, res) {
  const session = await getServerSession(req, res);
  const classCode  = req.query['class-code'];
  const questionId = req.query['question-id'];

  if (req.method === 'DELETE') {
    if (!session) {
        res.status(401).json("Unauthorized");
    }
    await db.deleteQuestion(questionId);
    res.status(200).json({ message: 'Question deleted successfully' });
  }
}