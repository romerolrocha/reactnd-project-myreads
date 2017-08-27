import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Debounce } from 'react-throttle';
import * as BooksAPI from './api/BooksAPI';
import BookList from './data/BookList';
import AlertContainer from 'react-alert';

class BookSearch extends Component {
  state = {
    books: []
  };

  alertOptions = {
    offset: 14,
    position: 'bottom left',
    theme: 'light',
    time: 5000,
    transition: 'scale'
  };

  executeQuery = query => {
    if (!query) {
      this.setState({ books: [] });
      return;
    }

    BooksAPI.search(query.trim(), 20).then(books => {
      if (books.length > 0) {
        this.setState({ books });
      } else {
        this.setState({ books: [] });
      }
    });
  };

  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(response => {
      if (response) {
        book.shelf = shelf;
        const books = this.state.books.filter(item => book.id !== item.id);
        this.setState({ books });
        this.msg.success(`Book '${book.title}' added to shelf.`);
      }
    });
  };

  render() {
    const { books } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <Debounce time="500" handler="onChange">
              <input
                type="text"
                onChange={event => this.executeQuery(event.target.value)}
                placeholder="Search by title or author"
              />
            </Debounce>
          </div>
        </div>
        <div className="search-books-results">
          <h4 className="results-text">
            {books.length > 0
              ? `Showing ${books.length} results.`
              : 'No results were found.'}
          </h4>
          <BookList books={books} moveBook={this.moveBook} />
        </div>
        <div>
          <AlertContainer ref={a => (this.msg = a)} {...this.alertOptions} />
        </div>
      </div>
    );
  }
}

export default BookSearch;
