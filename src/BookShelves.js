import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './data/BookShelf';
import * as BooksAPI from './api/BooksAPI'

class BookShelves extends Component {

  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => this.arrangeBooks(books));
  }

  arrangeBooks = (books) => {
    let currentlyReading = books.filter(book => book.shelf === 'currentlyReading');
    let wantToRead = books.filter(book => book.shelf === 'wantToRead');
    let read = books.filter(book => book.shelf === 'read');

    this.setState({ currentlyReading, wantToRead, read });
  }

  render() {
    const { currentlyReading, wantToRead, read } = this.state;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf title='Currently Reading' books={currentlyReading} />
          </div>
          <div>
            <BookShelf title='Want to Read' books={wantToRead} />
          </div>
          <div>
            <BookShelf title='Read' books={read} />
          </div>
        </div>
        <div className="open-search">
          <Link to='/add'>Add a book</Link>
        </div>
      </div>
    );
  }
}

export default BookShelves;