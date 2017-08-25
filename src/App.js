import React from 'react'
import './css/App.css'
import BookSearch from './BookSearch'
import BookShelf from './BookShelf'
import { Route } from 'react-router-dom'

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BookShelf />
        )}/>
        <Route path='/add' render={() => (
          <BookSearch />
        )}/>
      </div>
    )
  }
}

export default App
