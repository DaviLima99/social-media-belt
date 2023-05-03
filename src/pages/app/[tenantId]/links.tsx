import Heading1 from "@/components/Heading1";
import Heading2 from "@/components/Heading2";
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Link } from "@prisma/client";
import { useGet } from "@/hooks/api";
import { delet, post } from "@/lib/fetch";


const schema = yup.object().shape({
    slug: yup.string().required(),
    name: yup.string().required(),
    publicName: yup.string().required(),
    destination: yup.string().required(),
    appLink: yup.string().required()
}).required();


type Inputs = {
    slug: string,
    name: string,
    publicName: string,
    destination: string,
    appLink: string
};


//@ts-ignore

const Links = () => {
    const router = useRouter();

    const { data, mutate, isLoading, error } = useGet(`/api/${router?.query?.tenantId}/links`)


    const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>({
        resolver: yupResolver(schema)
    });

    const submit: SubmitHandler<Inputs> = async (input) => {
        const data = await post({url: `/api/${router?.query?.tenantId}/links`, data: input})
        await mutate();
        reset();
    }

    const deleteLink = async (id: string) => {
        await delet({url: `/api/${router?.query?.tenantId}/links/${id}`})

        await mutate();
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div>
                    <Heading1>
                        Gerenciador de links
                    </Heading1>
                    <Heading2>
                        Gerenciador de links
                    </Heading2>
                </div>
                <div className="flex items-center">
                    <button type="button" className="w-full px-4 py-2 text-base font-medium text-black bg-white border-t border-b border-l rounded-l-md hover:bg-gray-100">
                        Criar link
                    </button>
                    <button type="button" className="w-full px-4 py-2 text-base font-medium text-black bg-white border hover:bg-gray-100">
                        Criar grupo
                    </button>
                </div>
            </div>

            <form className="container max-w-2xl mx-auto shadow-md mt-11 md:w-3/4" onSubmit={handleSubmit(submit)}>
                <div className="p-4 border-t-2 border-indigo-400 rounded-lg bg-gray-100/5 ">
                    <div className="max-w-sm mx-auto md:w-full md:mx-0">
                        <div className="inline-flex items-center space-x-4">
                            <Heading2>Preencha os campos de crie seu link</Heading2>
                        </div>
                    </div>
                </div>
                <div className="space-y-6 bg-white">
                    <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                        <h2 className="max-w-sm mx-auto md:w-1/3">
                            Identificação
                        </h2>
                        <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
                            <div>
                                <div className=" relative ">
                                    <input type="text" {...register("slug")} className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Identificador (slug)" />
                                    <p>{errors.slug?.message}</p>
                                </div>
                            </div>
                            <div>
                                <div className=" relative ">
                                    <input type="text" {...register("name")} className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Nome interno" />
                                    <p>{errors.name?.message}</p>
                                </div>
                            </div>
                            <div>
                                <div className=" relative ">
                                    <input type="text" {...register("publicName")} className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Nome público" />
                                    <p>{errors.publicName?.message}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                        <h2 className="max-w-sm mx-auto md:w-1/3">
                            Destino
                        </h2>
                        <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
                            <div>
                                <div className=" relative ">
                                    <input type="text" {...register("destination")} className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="https://" />
                                    <p>{errors.destination?.message}</p>
                                </div>
                            </div>
                            <div>
                                <div className=" relative ">
                                    <input type="text" {...register("appLink")} className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="TBD link interno para app" />
                                    <p>{errors.appLink?.message}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
                        <button type="submit" className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                            Save
                        </button>
                    </div>
                </div>
            </form>

            {isLoading && (
                <div className="container max-w-2xl mx-auto shadow-md mt-11 md:w-3/4 text-center">
                    <h1>Loading</h1>
                </div>
            )}

            {data?.length > 0 && (
                <div className="container max-w-3xl px-4 mx-auto sm:px-8">
                    <div className="py-8">
                        <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
                            <h2 className="text-2xl leading-tight">
                                Seus Links
                            </h2>
              
                        </div>
                        <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                                <table className="min-w-full leading-normal">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                                Links
                                            </th>
                                            <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                                Nome Público
                                            </th>
                                            <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                                Destino
                                            </th>
                                            <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                                status
                                            </th>
                                            <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data && data.map((link: Link) => (
                                            <tr>
                                                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                    <div className="flex items-center">
                                                        <div className="ml-3">
                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                {link.name}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        {link.publicName}
                                                    </p>
                                                </td>
                                                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        {link.destination}
                                                    </p>
                                                </td>
                                                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                    <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                                                        <span aria-hidden="true" className="absolute inset-0 bg-green-200 rounded-full opacity-50">
                                                        </span>
                                                        <span className="relative">
                                                            active
                                                        </span>
                                                    </span>
                                                </td>
                                                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                    <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                        Edit
                                                    </a>

                                                    <button onClick={() => deleteLink(link.id)} className="text-indigo-600 ml-4 hover:text-indigo-900">Delete</button>
                                                </td>
                                            </tr>
                                        ))}


                                    </tbody>
                                </table>


                                <div className="flex flex-col items-center px-5 py-5 bg-white xs:flex-row xs:justify-between">
                                    <div className="flex items-center">
                                        <button type="button" className="w-full p-4 text-base text-gray-600 bg-white border rounded-l-xl hover:bg-gray-100">
                                            <svg width={9} fill="currentColor" height={8} viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z">
                                                </path>
                                            </svg>
                                        </button>
                                        <button type="button" className="w-full px-4 py-2 text-base text-indigo-500 bg-white border-t border-b hover:bg-gray-100 ">
                                            1
                                        </button>
                                        <button type="button" className="w-full px-4 py-2 text-base text-gray-600 bg-white border hover:bg-gray-100">
                                            2
                                        </button>
                                        <button type="button" className="w-full px-4 py-2 text-base text-gray-600 bg-white border-t border-b hover:bg-gray-100">
                                            3
                                        </button>
                                        <button type="button" className="w-full px-4 py-2 text-base text-gray-600 bg-white border hover:bg-gray-100">
                                            4
                                        </button>
                                        <button type="button" className="w-full p-4 text-base text-gray-600 bg-white border-t border-b border-r rounded-r-xl hover:bg-gray-100">
                                            <svg width={9} fill="currentColor" height={8} viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z">
                                                </path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        </>
    )
}

export default Links;