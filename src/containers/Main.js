import React from 'react'
import Header from '../components/Header'
import Search from './Search'
import BodyContainer from './BodyContainer';

const Main = () => (
  <div>
    <Header title="Github Search"/>
    <Search />
    <BodyContainer />
  </div>
)

export default Main
