import { getSession } from "next-auth/react"
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "@/lib/prisma";
// import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";


type Link = {
    id: string
    slug: string
    name: string
}

type Error = {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Link|Error>) {

    const session = await getSession({ req })

    if (session) {
        const tenantId = String(req.query.tenantId);
        if (req.method == "POST") {
            const linkData = {
                name: req.body.name,
                publicName: req.body.publicName,
                slug: req.body.slug,
                destination: req.body.destination,
                tenantId
            };
    
            const savedLink = await prisma.link.create({
                //@ts-ignore
                data: linkData
            })

            return res.send(savedLink)
        }

        const links = await prisma.link.findMany({
            where: {
                tenantId: {
                    equals: tenantId
                }
            }
        });

        return res.send(links);
    } else {
        res.send({message: "403"})
    }
}