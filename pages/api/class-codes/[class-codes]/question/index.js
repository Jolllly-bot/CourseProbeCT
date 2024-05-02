import { getServerSession } from "next-auth/next";
import * as db from "../../../../../services/database.mjs";

export default async function handler(req, res) {
  const session = await getServerSession(req, res);
  const classCode  = req.query['class-codes'];

  // console.log("Session contains", session)
  switch(req.method) {
    
    case 'GET':
      const questions = await db.getQuestions(classCode);

      if(!questions) {
        return res.status(404).end();
      }
      res.status(200).json(questions);
      break;

    case 'POST':
      
      if(!classCode) {
        return res.status(404).end(); 
      }
      const newQuestion = await db.createQuestionForClassCode(classCode,req.body);
      console.log("POST session", session, classCode, req.body)
      console.log("newquestion:", newQuestion)
      if (!newQuestion) {
        return res.status(404).end();
      }
      res.status(201).json(newQuestion);
      break;
    }
  }