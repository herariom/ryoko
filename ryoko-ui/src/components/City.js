import { FaTimes } from 'react-icons/fa'

const City = ({ cityResult, onDelete, onToggle }) => {
  return (
    <div className='task' onDoubleClick={() => onToggle(cityResult.id)}>
        <h3>{cityResult.city} <FaTimes style={{color: 'red', cursor: 'pointer'}} onClick={() => onDelete(cityResult.id)}/>
        </h3>
        <p>State: {cityResult.state}</p>
        <p>Population: {cityResult.population}</p>
        <p>Density: {cityResult.density}</p>
        <p>Lat: {cityResult.lat}</p>
        <p>Long: {cityResult.long}</p>
    </div>
  )
}

export default City