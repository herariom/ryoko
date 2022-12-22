import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import Button from './Button'
import Icon from '../assets/logo.jpg'

const Header = ({ title, onAdd, showAdd }) => {
  const location = useLocation()

  return (
    <header className='header'>
      <div className='header'>
        <img src={Icon} alt='Logo' className='logo' />
        <h1>{title}</h1>
      </div>
      {location.pathname === '/' && (
        <Button
          color={showAdd ? '#ED6A5A' : '#F0BE19'}
          text={showAdd ? 'Close' : 'Search'}
          onClick={onAdd}
        />
      )}
    </header>
  )
}

Header.defaultProps = {
  title: 'Ryoko',
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Header
