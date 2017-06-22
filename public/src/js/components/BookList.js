import React from 'react'

import Book from './Book'
import books from '../../../../books.json'

class BookList extends React.Component {
  render() {
    return (
      <div className="booklist">
        <ul>
          {books.map(book => <Book />)}
        </ul>
      </div>
    )
  }
}

export default BookList
