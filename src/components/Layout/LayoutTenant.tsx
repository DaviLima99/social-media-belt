interface Props {
    children: React.ReactNode
}

const LayoutTenant = ({ children }: Props) => {
    return (
        <>
            <h1>Layout Tentant</h1>
            { children }
        </>
    )
}

export default LayoutTenant;