import React from 'react'
import axios from 'axios'

import Book from './Book'

class BookList extends React.Component {
  constructor () {
    super()
    this.state = {
      books: []
    }
  }
  componentDidMount () {
    axios.get('/books')
      .then(response => this.setState({ books: response.data.books }))
      // TODO: display error to user
      .catch(err => console.error(err))
  }

  render () {
    return (
      <div className="booklist">
        <ul>
          {this.state.books.map(book => <Book key={book._id} item={book} />)}
        </ul>
      </div>
    )
  }
}

export default BookList
