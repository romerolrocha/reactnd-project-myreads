import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Debounce } from 'react-throttle';
import * as BooksAPI from './api/BooksAPI';
import BookList from './data/BookList';

class BookSearch extends Component {
  state = {
    books: []
  };

  updateQuery = query => {
    if (!query) {
      this.clearBookSearch();
      return;
    }

    BooksAPI.search(query.trim(), 20).then(books => {
      if (books.length > 0) {
        this.setState({ books });
      } else {
        this.clearBookSearch();
      }
    });
  };

  clearBookSearch = () => {
    this.setState({ books: [] });
  };

  moveBook = addedBook => {
    const showingBooks = this.state.books.filter(
      book => book.id !== addedBook.id
    );
    this.setState({ books: showingBooks });
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
                onChange={event => this.updateQuery(event.target.value)}
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
