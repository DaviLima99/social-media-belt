import { getSession } from "next-auth/react"
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "@/lib/prisma";
// import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { Prisma } from "@prisma/client";

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

const getPaginatedLinks = async (tenantId: string, cursor: string, take: number) => {
    const takeNumber = Number(take || 10)
    const args: Prisma.LinkFindManyArgs = {
        where: {
            tenantId: {
                equals: tenantId
            }
        },
        take: takeNumber + 1,
        orderBy: {
            id: 'asc'
        }
    }

    if (cursor) {
        args.cursor = {
            id: String(cursor)
        }
    }

    const links = await prisma.link.findMany(args);
    const nextLink = await prisma.link.findFirst({
        select: {
            id: true
        },
        where: {
            id: {
                gt: links[links.length-1].id
            }
        },
        orderBy: {
            id: 'asc'
        }
    })

    const prevLink = await prisma.link.findMany({
        select: {
            id: true
        },
        where: {
            id: {
                lt: links[0].id
            }
        },
        orderBy: {
            id: 'desc'
        },
        take: takeNumber
    })

    return {
        items: links,
        nextCursor: nextLink?.id || '',
        prevCursor: prevLink?.[prevLink.length - 1]?.id || ''
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<String>) {

    const session = await getSession({ req })

    if (session) {
        const tenantId = String(req.query.tenantId);

        const { cursor, take } = req.query;
        
        const page = await getPaginatedLinks(tenantId, String(cursor), Number(take))

    }

 
}
