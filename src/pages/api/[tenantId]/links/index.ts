import { getSession } from "next-auth/react"
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "@/lib/prisma";
// import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

interface LinkPaginationWrapper {
    cursor: string
    take: number
    items: Link[]
}

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
    res: NextApiResponse<LinkPaginationWrapper|Link|Error>) {

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

        const { cursor, take } = req.query;
        let links = [] as Link[]
        if (cursor) {
            links = await prisma.link.findMany({
                where: {
                    tenantId: {
                        equals: tenantId
                    }
                },
                cursor: {
                    id: String(cursor)
                },
                skip: 1,
                take: Number(take || 10),
                orderBy: {
                    id: 'asc'
                }
            });

        } else {
            links = await prisma.link.findMany({
                where: {
                    tenantId: {
                        equals: tenantId
                    }
                },
                take: Number(take || 10),
                orderBy: {
                    id: 'asc'
                }
            });
        }
           
        return res.send({
            cursor: '',
            take: 10,
            items: links
        });
    } else {
        res.send({message: "403"})
    }
}