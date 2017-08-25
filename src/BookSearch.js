import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './api/BooksAPI'
import { Debounce } from 'react-throttle';
import BookList from './data/BookList'

class AddBook extends Component {

  state = {
    books: []
  }

  updateQuery = (query) => {
    if(!query) {
      this.cleanBookSearch();
    }

    BooksAPI.search(query.trim(), 20).then(books => {
      if(books.length > 0) {
        this.setState({ books });
      } else {
        this.cleanBookSearch();
      }
    });
  }

  cleanBookSearch = () => {
    this.setState({ books: [] });
  }

  render() {

    const { books } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className='close-search' to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <Debounce time="500" handler="onChange">
              <input type="text"
                  onChange={(event) => this.updateQuery(event.target.value)}
                  placeholder="Search by title or author"/>
            </Debounce>
          </div>
        </div>
        <div className="search-books-results">
          <BookList books={books} />
        </div>
      </div>
    );
  }
}

export default AddBook;