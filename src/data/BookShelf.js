import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookList from './BookList';

class BookShelf extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
          <div className="bookshelf-books">
            <BookList books={this.props.books} />
          </div>
      </div>
    );
  }
}

export default BookShelf;