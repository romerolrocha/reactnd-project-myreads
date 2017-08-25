import React, { Component } from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

class BookList extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired
  }

  render() {
    const { books } = this.props;

    return (
      <div>
        <ol className="books-grid">
          {books.map(item => (<Book book={item} />))}
        </ol>
      </div>
    );
  }
}

export default BookList;