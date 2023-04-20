import Head from "next/head"

interface Props {
    title: string
    description?: string
}

const Seo = ({title, description}: Props) => {
    return (
        <Head>
            <title>{title}</title>
            {description && <meta name={description} content="Meta Tags na Social MEdia Belt"/>}
            <link rel="icon" href="/fav.ico"/>
        </Head>
    )
}

export default Seo;