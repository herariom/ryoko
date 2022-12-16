import City from './City'

const Cities = ({ cities }) => {
    return (
        <>
            {cities.map((cityResult, index) => (
                <City key={index} cityResult={cityResult}/> 
            ))}
        </>
    )
}

export default Cities