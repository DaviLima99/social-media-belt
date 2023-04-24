import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then(res => res.json())

const AppIndex = () => {
    const router = useRouter()
    const [shouldRedirect, setShouldRedirect] = useState(false)
    const { data } = useSWR('/api/tenants', fetcher)
    const { data: session } = useSession()

    const name = session?.user?.name ? session?.user?.name : ""
    const image = session?.user?.image ? session?.user?.image : ""

    console.log(data)
    useEffect(() => {
        if (data && data.length === 1) {
            setShouldRedirect(true)
        }
    }, [data])

    useEffect(() => {
        if(shouldRedirect) {
            setTimeout(() => {
                router.push('/app/' + data[0].id)
            }, 3000)
            setShouldRedirect(false)   
        }
    }, [shouldRedirect])

    return (
        <div className="max-w-lg text-center mx-auto my-6">

            <img src={image} alt={name} className="rounded-full w-16 inline-block" />
            <h1>{name}</h1>
            <div className="mt-6">
                {data && data.lenght && data.map((tenant) => (
                    <Link href={"/app/" + tenant.id} legacyBehavior>
                        <a className="inline-block w-full px-4 py-2 text-center font-medium text-black bg-white border rounded-md hover:bg-gray-100">{tenant.name}</a>
                    </Link>
                ))}
            </div>
            <div>
                <svg className="" width={45} height={45} viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
                    <g fill="none" fillRule="evenodd" transform="translate(1 1)" strokeWidth={2}>
                        <circle cx={22} cy={22} r={6} strokeOpacity={0}>
                            <animate attributeName="r" begin="1.5s" dur="3s" values="6;22" calcMode="linear" repeatCount="indefinite" />
                            <animate attributeName="stroke-opacity" begin="1.5s" dur="3s" values="1;0" calcMode="linear" repeatCount="indefinite" />
                            <animate attributeName="stroke-width" begin="1.5s" dur="3s" values="2;0" calcMode="linear" repeatCount="indefinite" />
                        </circle>
                        <circle cx={22} cy={22} r={6} strokeOpacity={0}>
                            <animate attributeName="r" begin="3s" dur="3s" values="6;22" calcMode="linear" repeatCount="indefinite" />
                            <animate attributeName="stroke-opacity" begin="3s" dur="3s" values="1;0" calcMode="linear" repeatCount="indefinite" />
                            <animate attributeName="stroke-width" begin="3s" dur="3s" values="2;0" calcMode="linear" repeatCount="indefinite" />
                        </circle>
                        <circle cx={22} cy={22} r={8}>
                            <animate attributeName="r" begin="0s" dur="1.5s" values="6;1;2;3;4;5;6" calcMode="linear" repeatCount="indefinite" />
                        </circle>
                    </g>
                </svg>
            </div>
        </div>
    )
}

export default AppIndex;