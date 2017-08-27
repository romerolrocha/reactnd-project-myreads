import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookList from './BookList';
import ReactLoading from 'react-loading';

class BookShelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    moveBook: PropTypes.func.isRequired
  };

  state = {
    loading: true
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">
          {this.props.title}
        </h2>
        <div className="bookshelf-books">
          {this.state.loading
            ? <ReactLoading
                type="spin"
                delay={1}
                color="#6568a4"
                className="loader"
              />
            : <BookList
                books={this.props.books}
                moveBook={this.props.moveBook}
              />}
        </div>
      </div>
    );
  }
}

export default BookShelf;
