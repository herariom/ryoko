import React, { useState } from 'react';
import Dashboard from './Dashboard'


const City = ({ cityResult, onDelete, onToggle }) => {
  const [showDashboard, setShowDashboard] = useState(false)
  const [links, setLinks] = useState({indeed: '', glassdoor: '', zillow: ''})
  const [scores, setScores] = useState({walk: "Not Available", bike: "Not Available", transit: "Not Available"})
  const [fetched, setFetched] = useState(false)


  const handleClick = async ()  => {
    if (fetched) {
      setShowDashboard(!showDashboard)
      return
    }

    const response = await fetch(`http://localhost:5000/api/city?city=${cityResult.city}`, {
      method: 'GET',
      mode: 'cors',
      headers:{
        'Content-Type': 'application/json'
      }})
    const data = await response.json()

    setScores(data['scores'])
    setLinks(data['links'])
    setFetched(true)

    setShowDashboard(!showDashboard)
  }

  return (
    <div className='task'>
        <h3>{cityResult.city}</h3>
        <p>State: {cityResult.state}</p>
        <p>Population: {cityResult.population}</p>
        <p>Density: {cityResult.density}</p>
        <p>Lat: {cityResult.lat}</p>
        <p>Long: {cityResult.long}</p>
        <button className='btn' onClick={handleClick}>Details</button>
        {showDashboard && <Dashboard scores={scores} links={links} />}
    </div>
  )
}

export default City