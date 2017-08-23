import React from 'react'
import * as BooksAPI from './data/BooksAPI'
import './css/App.css'
import AddBook from './AddBook'
import BookShelf from './BookShelf'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BookShelf />
        )}/>
        <Route path='/add' render={() => (
          <AddBook />
        )}/>
      </div>
    )
  }
}

export default BooksApp
