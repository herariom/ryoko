import { useState } from 'react'
import Dropdown from 'react-dropdown';

const Search = ({ onSearch }) => {
    const [population, setPopulation] = useState(0)
    const [popOperator, setPopOperator] = useState('=')

    const [density, setDensity] = useState(0)
    const [denOperator, setDenOperator] = useState('=')
    
    const [lat, setLat] = useState(0.0)
    const [latOperator, setLatOperator] = useState('=')
    
    const [long, setLong] = useState(0.0)
    const [lonOperator, setLonOperator] = useState('=')
    
    const [stateVal, setStateVal] = useState('')

    const [locationData, setLocationData] = useState([]);

    const addLocationItem = () => {
      setLocationData([...locationData, {lat: 0, long: 0, distance: 0}]);
    }

    const removeLocationItem = () => {
        if (locationData.length === 0) {
          return;
        }
        const newLocationData = [...locationData];
        newLocationData.pop();
        setLocationData(newLocationData);
    }

    const onLocationDataChange = (index, event) => {
        const newLocationData = [...locationData];
        newLocationData[index][event.target.name] = parseFloat(event.target.value);
        setLocationData(newLocationData);
    }

    const options = [
        'State', 'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
      ];

    const operators = [
        '=', '<', '>', '<>'
    ];
    
    const _onSelectSta = (option) => {
        setStateVal(option.label)
    }

    const _onSelectPop = (option) => {
        setPopOperator(option.label)
    }

    const _onSelectDen = (option) => {
        setDenOperator(option.label)
    }

    const _onSelectLat = (option) => {
        setLatOperator(option.label)
    }

    const _onSelectLon = (option) => {
        setLonOperator(option.label)
    }

    const onSubmit = (e) => {
        e.preventDefault()

        var query = {}
        query['d'] = []

        if (population !== 0) {
            query['d'].push({"field": "population", "value": parseInt(population), "operator": popOperator})
        }

        if (density !== 0) {
            query['d'].push({"field": "density", "value": parseFloat(density), "operator": denOperator})
        }

        if (stateVal !== 'State' && stateVal !== '') {
            query['d'].push({"field": "state", "value": stateVal, "operator": "="})
        }

        if (lat !== 0.0) {
            query['d'].push({"field": "lat", "value": parseFloat(lat), "operator": latOperator})
        }

        if (long !== 0.0) {
            query['d'].push({"field": "long", "value": parseFloat(long), "operator": lonOperator})
        }

        // Probably a better way to do this, fix in the future
        for (var i = 0; i < locationData.length; i++) {
            locationData[i].lat = parseFloat(locationData[i].lat)
            locationData[i].long = parseFloat(locationData[i].long)
            locationData[i].distance = parseFloat(locationData[i].distance)
        }

        query['l'] = locationData
        onSearch(query)
    }

  return (
    <form className='add-form' onSubmit={onSubmit}>
        <div className='form-control'>
            <label>
                Population
                <Dropdown options={operators} onChange={_onSelectPop} value={popOperator} placeholder="=" />
                <input type='number' placeholder='*' onChange={(e) => setPopulation(e.target.value)} />
            </label>
            <label>
                Density
                <Dropdown options={operators} onChange={_onSelectDen} value={denOperator} placeholder="=" />
                <input type='number' step="0.001" placeholder='*' onChange={(e) => setDensity(e.target.value)} />
            </label>
            <label>
                State
                <Dropdown options={options} onChange={_onSelectSta} value={stateVal} placeholder="State" />
            </label>
            <label>
                Lat
                <Dropdown options={operators} onChange={_onSelectLat} value={latOperator} placeholder="=" />
                <input type='number' step="0.001" placeholder='*' onChange={(e) => setLat(e.target.value)} />
            </label>
            <label>
                Long
                <Dropdown options={operators} onChange={_onSelectLon} value={lonOperator} placeholder="=" />
                <input type='number' step="0.001" placeholder='*' onChange={(e) => setLong(e.target.value)} />
            </label>
            <br />
            <br />
            <div className='form-control'>
                {locationData.map((item, index) => (
                <div className='form-control' key={index}>
                <label><span className='location-label'>Latitude</span>
                    <input className='location-filters' name='lat' type='number' step="0.001" placeholder='*' onChange={(e) => onLocationDataChange(index, e)}/>
                </label>
                <label><span className='location-label'>Longitude</span>
                    <input className='location-filters' name='long' type='number' step="0.001" placeholder='*' onChange={(e) => onLocationDataChange(index, e)}/>
                </label>
                <label><span className='location-label'>Distance</span>
                    <input className='location-filters' name='distance' type='number' step="0.001" placeholder='* (km)' onChange={(e) => onLocationDataChange(index, e)}/>
                </label>
                <span className='location-label'>
                    |
                </span>
                </div>
                ))}
        
            </div>
        </div>
        <button type='button' className='btn btn-loc' onClick={addLocationItem}>+ Location Filter</button>
        <button type='button' className='btn btn-loc' onClick={removeLocationItem}>- Location Filter</button>
        <input type='submit' value='Search' className='btn btn-block' />
    </form>
  )
}

export default Search