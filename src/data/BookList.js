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
        {books.map(item => (
          <ol key={item.id} className="books-grid">
            <Book book={item}/>
          </ol>
        ))}
      </div>
    );
  }
}

export default BookList;