import React from 'react'
import walkscoreLogo from '../assets/walkscore-logo.png'

const Dashboard = ({scores, links}) => {
    return (
        <div>
        <h3>Details</h3>
        <p className="dashboard">
            <img src={walkscoreLogo} alt='walkscore logo' className="dashboard-image" /> 
            {scores.walk} {scores.bike} {scores.transit}
        </p>
        <div className='dashboard-details'>
            <div className='dashboard-details'>
            <h3>Jobs</h3>
            <div className='break'></div>
            <a href={links.indeed} target="_blank" rel="noreferrer">
                <button className='btn'>Indeed.com</button>
            </a>
            <a href={links.glassdoor} target="_blank" rel="noreferrer">
                <button className='btn'>Glassdoor</button>
            </a>
            </div>
            <div className='dashboard-details'>
            <h3>Housing</h3>
            <div className='break'></div>
            <a href={links.zillow} target="_blank" rel="noreferrer">
                <button className='btn'>Zillow</button>
            </a>
            </div>
        </div>
        </div>
    )
}

export default Dashboard