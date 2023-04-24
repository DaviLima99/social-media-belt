import { getSession } from "next-auth/react"
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "@/lib/prisma";


type TenantsData = {
    id: string
    slug: string
    name: string
  }

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<TenantsData[]>) {

    const session = await getSession({ req });
    if (session) {
        const tenants = await prisma.tenant.findMany({
            where: {
                users: {
                    some: {
                        // @ts-ignore
                        userId: session.user.id
                    }
                }
            }
        })

        res.send(tenants)
    } else {
         
    }
}