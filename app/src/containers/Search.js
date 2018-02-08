import React from 'react'
import Autocomplete from './Autocomplete'

class Search extends React.Component {
  render() {
    return (
      <div className="search-container">
        <Autocomplete
          onChange={selectedItem => console.log(selectedItem)}
        />
      </div>
    )
  }
}

export default Search
