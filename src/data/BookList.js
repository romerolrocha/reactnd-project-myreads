import React from 'react';
import Book from './Book';

const BookList = ({ books, moveBook }) => {
  return (
    <div>
      <ol className="books-grid">
        {books.map(item =>
          <li key={item.id}>
            <Book book={item} moveBook={moveBook} />
          </li>
        )}
      </ol>
    </div>
  );
};

export default BookList;
