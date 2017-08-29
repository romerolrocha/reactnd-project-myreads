import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookShelf from '../data/BookShelf';
import * as BooksAPI from '../api/BooksAPI';
import AlertContainer from 'react-alert';

class BookShelves extends Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  };

  alertOptions = {
    offset: 14,
    position: 'top left',
    theme: 'light',
    time: 2000,
    transition: 'scale'
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => this.arrangeBooks(books));
  }

  arrangeBooks = books => {
    this.setState({
      currentlyReading: books.filter(book => book.shelf === 'currentlyReading'),
      wantToRead: books.filter(book => book.shelf === 'wantToRead'),
      read: books.filter(book => book.shelf === 'read')
    });
  };

  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(response => {
      if (response) {
        book.shelf = shelf;
        const books = this.getListOfBooks();
        this.arrangeBooks(books);
        this.handleMovingMessage(book);
      } else {
        this.msg.error('Error ocurred trying to move book.');
      }
    });
  };

  handleMovingMessage = book => {
    const response =
      book.shelf === 'none'
        ? `Book '${book.title}' removed from shelf.`
        : `Moved '${book.title}'.`;
    this.msg.success(response);
  };

  getListOfBooks = () => {
    return this.state.currentlyReading.concat(
      this.state.wantToRead,
      this.state.read
    );
  };

  render() {
    const { currentlyReading, wantToRead, read } = this.state;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              title="Currently Reading"
              books={currentlyReading}
              moveBook={this.moveBook}
            />
          </div>
          <div>
            <BookShelf
              title="Want to Read"
              books={wantToRead}
              moveBook={this.moveBook}
            />
          </div>
          <div>
            <BookShelf title="Read" books={read} moveBook={this.moveBook} />
          </div>
        </div>
        <div className="open-search">
          <Link
            to={{
              pathname: '/search',
              state: { books: this.getListOfBooks() }
            }}
          >
            Add a book
          </Link>
        </div>
        <div>
          <AlertContainer ref={a => (this.msg = a)} {...this.alertOptions} />
        </div>
      </div>
    );
  }
}

export default BookShelves;
