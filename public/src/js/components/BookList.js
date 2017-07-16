import React from 'react'
import axios from 'axios'
import _ from 'lodash'

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

  handleDelete(e) {
    let _id = e.target.id;
    axios.delete('/books/' + _id)
      .then(response => {
        let updatedBooks = _.filter(this.state.books, book => book._id !== _id)
        this.setState({ books: updatedBooks})
      })
      .catch(err => console.error(err))
  }

  render () {
    return (
      <div className="booklist">
        <ul>
          {this.state.books.map(
            book => <Book key={book._id} item={book}
              handleDelete={this.handleDelete.bind(this)} />
          )}
        </ul>
        <form action="/books" method="post">
          <h2>Add a book</h2>
          <input name="author" />
          <input name="title" />
          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
}

export default BookList
