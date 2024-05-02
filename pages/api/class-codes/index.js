import { getServerSession } from "next-auth/next";
import * as db from "../../../services/database.mjs";

export default async function handler(req, res) {
    const session = await getServerSession(req, res);

    if (req.method === "GET") {
        console.log("Session contains", session)

        if (!session) {
            res.status(401).json("Unauthorized");
        }
        const classCodes = await db.getClassCodes(session.user.name)
        res.status(200).json(classCodes);
    } else if (req.method === "POST") {
        if (!session) {
            return res.status(401).json("Unauthorized")
        }
        const data = req.body
        if (!data.id) { 
            return res.status(400).json({message: "Mising id field"})
        }
        const classCode = await db.createClassCode({id: data.id, owner: session.user.name})
        return res.status(201).json(classCode)
    } else if (req.method === "DELETE") {
        if (!session) {
            return res.status(401).json("Unauthorized")
        }
        const data = req.body
        if (!data.id) {
            return res.status(400).json({message: "Mising id field"})
        }
        const classCode = await db.deleteClassCode(data.id)
        return res.status(200).json(classCode)
    }
}