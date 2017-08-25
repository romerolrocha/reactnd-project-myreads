import React from 'react'
import './css/App.css'
import BookSearch from './BookSearch'
import BookShelves from './BookShelves'
import { Route } from 'react-router-dom'

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BookShelves />
        )}/>
        <Route path='/add' render={() => (
          <BookSearch />
        )}/>
      </div>
    )
  }
}

export default App
