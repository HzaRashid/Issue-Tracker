export default function MonoCtxProvider(props) {
    const { components = [], children } = props

    return (
        <>
            {components.reduceRight((acc, Comp) => {
                return <Comp>{acc}</Comp>
            }, children)}
        </>
    )
}