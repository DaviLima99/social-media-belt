import Heading1 from "@/components/Heading1";
import Heading2 from "@/components/Heading2";
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";



const schema = yup.object({
    slung: yup.string().required(),
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

const Links = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: yupResolver(schema)
    });

    const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

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

            <form className="container max-w-2xl mx-auto shadow-md mt-11 md:w-3/4" onSubmit={handleSubmit(onSubmit)}>
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
        </>
    )
}

export default Links;