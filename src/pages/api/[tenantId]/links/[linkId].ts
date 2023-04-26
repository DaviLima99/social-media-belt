import { getSession } from "next-auth/react"
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "@/lib/prisma";
// import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";


type Message = {
    id: String
    success: boolean
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Message>) {

    const session = await getSession({ req })
    const linkId = String(req.query.linkId);
    if (session) {
        if (req.method == "DELETE") {
            await prisma.link.delete({
                where: {
                    id: linkId
                }
            })
        }

        return res.send({
            id: linkId,
            success: true
        })
    } else {
        return res.send({
            id: linkId,
            success: false
        })
    }
}