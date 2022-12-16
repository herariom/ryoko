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

    const options = [
        'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
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
            query['d'].push({"field": "population", "value": population, "operator": popOperator})
        }

        if (density !== 0) {
            query['d'].push({"field": "density", "value": density, "operator": denOperator})
        }

        if (stateVal !== 'State' || stateVal !== '') {
            query['d'].push({"field": "state", "value": stateVal, "operator": "="})
        }

        if (lat !== 0.0) {
            query['d'].push({"field": "lat", "value": lat, "operator": latOperator})
        }

        if (long !== 0.0) {
            query['d'].push({"field": "long", "value": long, "operator": lonOperator})
        }

        onSearch(query['d'])
    }

  return (
    <form className='add-form' onSubmit={onSubmit}>
        <div className='form-control'>
            <label>
                Population
                <Dropdown options={operators} onChange={_onSelectPop} value={popOperator} placeholder="=" />
                <input type='text' placeholder='Population' onChange={(e) => setPopulation(e.target.value)} />
            </label>
            <label>
                Density
                <Dropdown options={operators} onChange={_onSelectDen} value={denOperator} placeholder="=" />
                <input type='text' placeholder='Density' onChange={(e) => setDensity(e.target.value)} />
            </label>
            <label>
                State
                <Dropdown options={options} onChange={_onSelectSta} value={stateVal} placeholder="State" />
            </label>
            <label>
                Lat
                <Dropdown options={operators} onChange={_onSelectLat} value={latOperator} placeholder="=" />
                <input type='text' placeholder='Lat' onChange={(e) => setLat(e.target.value)} />
            </label>
            <label>
                Long
                <Dropdown options={operators} onChange={_onSelectLon} value={lonOperator} placeholder="=" />
                <input type='text' placeholder='Long' onChange={(e) => setLong(e.target.value)} />
            </label>
        </div>
        <input type='submit' value='Search' className='btn btn-block' />
    </form>
  )
}

export default Search