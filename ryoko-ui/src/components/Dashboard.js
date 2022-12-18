import React from 'react'
import walkscoreLogo from '../assets/walkscore-logo.png'

const Dashboard = ({scores, links}) => {
    return (
        <div>
        <h1>Details</h1>
        <h3>City Details</h3>
        <p className="dashboard">
            <img src={walkscoreLogo} alt='walkscore logo' className="dashboard-image" /> 
            Walk score: {scores.walk} Bike score: {scores.bike} Transportation score: {scores.transit}
        </p>
        <h3>Jobs</h3>
        <a href={links.indeed} target="_blank" rel="noreferrer">
            <button className='btn'>Indeed.com</button>
        </a>
        <a href={links.glassdoor} target="_blank" rel="noreferrer">
            <button className='btn'>Glassdoor</button>
        </a>
        <h3>Housing</h3>
        <a href={links.zillow} target="_blank" rel="noreferrer">
            <button className='btn'>Zillow</button>
        </a>
        </div>
    )
}

export default Dashboard