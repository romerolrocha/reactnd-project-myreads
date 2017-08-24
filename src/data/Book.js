import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component {
  
  static propTypes = {
    book: PropTypes.object.isRequired
  }

  render() {
    const { book } = this.props

    return (
      <div>
        <li>{book.title}</li>
        <li>{book.id}</li>
      </div>
    );
  }
}

export default Book;