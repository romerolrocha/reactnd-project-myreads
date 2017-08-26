import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './data/BookShelf';
import * as BooksAPI from './api/BooksAPI';

class BookShelves extends Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
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
        const books = this.state.currentlyReading
          .concat(this.state.wantToRead)
          .concat(this.state.read);
        this.arrangeBooks(books);
      }
    });
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
          <Link to="/add">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default BookShelves;
