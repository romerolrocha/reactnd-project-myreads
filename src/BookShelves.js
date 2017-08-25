import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './data/BookShelf';
import * as BooksAPI from './api/BooksAPI'

class BookShelves extends Component {

  state = {
    reading: [],
    wantToRead: [],
    read: []
  }

  loadBooks(id) {
    let { reading, wantToRead, read } = this.state;
    BooksAPI.get(id).then(book => {
        reading.push(book);
        read.push(book);
        wantToRead.push(book);
        this.setState({ reading, wantToRead, read });
    })
  }

  componentDidMount() {
    this.loadBooks('nggnmAEACAAJ');
    this.loadBooks('Xi34AwAAQBAJ');
    this.loadBooks('YpknWQLzVA4C');
    this.loadBooks('4ymVpRiXsMIC');
    this.loadBooks('gW6yXkPWhfcC');
  }

  render() {
    const { reading, wantToRead, read } = this.state;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf title='Currently Reading' books={reading} />
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