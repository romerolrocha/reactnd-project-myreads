import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Debounce } from 'react-throttle';
import * as BooksAPI from './api/BooksAPI';
import BookList from './data/BookList';

class BookSearch extends Component {
  state = {
    books: []
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
          <BookList books={books} moveBook={this.moveBook} />
        </div>
      </div>
    );
  }
}

export default BookSearch;
