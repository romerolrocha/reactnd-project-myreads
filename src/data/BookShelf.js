import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookList from './BookList';

class BookShelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    moveBook: PropTypes.func.isRequired
  };

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">
          {this.props.title}
        </h2>
        <div className="bookshelf-books">
          <BookList books={this.props.books} moveBook={this.props.moveBook} />
        </div>
      </div>
    );
  }
}

export default BookShelf;
