import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Cities from './components/Cities'
import Search from './components/Search'
import About from './components/About'

const App = () => {
  const [showSearch, setShowSearch] = useState(false)
  const [cities, setCities] = useState([])

  useEffect(() => {
    const getCities = async () => {
      const citiesResult = await fetchCities()
      setCities(citiesResult)
    }

    getCities()
  }, [])

  const fetchCities = async () => {
    const res = await fetch('http://localhost:5000/api/cities', {
      method: 'GET',
      mode: 'cors'
    })
    var data = await res.json()
    data = data['d']

    return data
  }

  const search = async (query) => {
    console.log("Called");
    const res = await fetch('http://localhost:5000/api/cities', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(query)
    })

    var data = await res.json()

    if (res.status !== 200) {
      setCities({})
      return
    }

    data = data['d']
    setCities(data)
  }

  return (
    <Router>
      <div className='container'>
        <Header
          onAdd={() => setShowSearch(!showSearch)}
          showAdd={showSearch}
        />
        <Routes>
          <Route
            path='/'
            element={
              <>
                {showSearch && <Search onSearch={search} />}
                {cities.length > 0 ? (
                  <Cities
                    cities={cities}
                  />
                ) : (
                  'No cities'
                )}
              </>
            }
          />
          <Route path='/about' element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
