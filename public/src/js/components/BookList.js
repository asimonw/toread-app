import React from 'react'
import axios from 'axios'
import _ from 'lodash'

import Book from './Book'

class BookList extends React.Component {
  constructor () {
    super()
    this.state = {
      books: [],
      newAuthor: '',
      newTitle: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAuthorChange = this.handleAuthorChange.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
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

  handleAuthorChange(e) {
    this.setState({ newAuthor: e.target.value })
  }

  handleTitleChange(e) {
    this.setState({ newTitle: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    let newBook = {
      author: this.state.newAuthor,
      title: this.state.newTitle
    }
    axios.post('/books', newBook)
      .then(response => {
        let updatedBooks = [...this.state.books, response.data.book]
        this.setState({
          books: updatedBooks,
          newAuthor: '',
          newTitle: ''
        })
      })
      .catch(err => console.error(err))
  }

  render () {
    // TODO: refactor out form
    return (
      <div className="booklist">
        <ul>
          {this.state.books.map(
            book => <Book key={book._id} item={book}
              handleDelete={this.handleDelete.bind(this)} />
          )}
        </ul>
        <form onSubmit={this.handleSubmit}>
          <h2>Add a book</h2>
          <input name="author" value={this.state.newAuthor}
            onChange={this.handleAuthorChange} />
          <input name="title" value={this.state.newTitle}
            onChange={this.handleTitleChange} />
          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
}

export default BookList
