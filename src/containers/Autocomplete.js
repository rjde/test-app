import Downshift from 'downshift'
import React from 'react'
import { connect } from 'react-redux'

import { debounce } from '../utils'
import { fetchUsers } from '../actions'

class Autocomplete extends React.Component {
  constructor() {
    super()

    this.fetchRepository = this.fetchRepository.bind(this)
  }

  fetchRepository = debounce(value => {
    this.props.fetchUsers(value)
  }, 300)

  render() {
    const {items, onChange} = this.props

    console.log(this.props.usersData)

    return (
      <Downshift
        onChange={onChange}
        render={({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue,
          selectedItem,
          highlightedIndex,
        }) => (
          <div style={{position: 'relative'}}>
            <input {...getInputProps({onChange: event => {
                const value = event.target.value
                if (!value) {
                  return
                }
                this.fetchRepository(value)
              },
              placeholder: 'Type Github Username'})} 
              className="search-input" />
            {isOpen ? (
              <div style={{border: '1px solid #ccc', position: 'absolute'}} className="search-items">
                {this.props.usersData.map((user, index) => {
                    const item = user.login
                    const url = '//github.com/'+user.login

                    return <div
                      {...getItemProps({item})}
                      className="search-item"
                      key={item}
                      style={{
                        backgroundColor:
                          highlightedIndex === index ? 'steelblue' : 'white',
                        color:
                          highlightedIndex === index ? 'white' : '',
                        fontWeight: selectedItem === item ? 'bold' : 'normal',
                      }}
                    >
                      <div style={{display: 'flex'}}>
                        <img src={user.avatar_url} className="user-image" />
                        <a href={url} style={{marginTop: '10px'}}>{item}</a>
                      </div>
                    </div>
                })}
              </div>
            ) : null}
          </div>
        )}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    usersData: state.usersData
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return { 
    fetchUsers: (username) => { dispatch(fetchUsers(username)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Autocomplete)
