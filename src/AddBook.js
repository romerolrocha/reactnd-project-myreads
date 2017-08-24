import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './data/BooksAPI'

class AddBook extends Component {

  state = {
    books: [],
    query: ''
  }

  updateQuery = (e) => {
    if(e.target.value) {
      this.setState({query: e.target.value});
      BooksAPI.search(e.target.value, 20).then(books => {
        this.setState({ books });
      });
    } else {
      this.setState({query: ''});
    }
  }

  render() {

    const { books , query } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className='close-search' to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" 
              value={query}
              onChange={this.updateQuery}
              placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          {books.map(book => (
            <ol key={book.id} className="books-grid">
              {book.title}
            </ol>
          ))}
        </div>
      </div>
    );
  }
}

export default AddBook;