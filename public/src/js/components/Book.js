import React from 'react'

class Book extends React.Component {
  render() {
    let {author, title, _id} = this.props.item
    console.log(_id);
    return (
      <li>
        {author}: {title}
        <span
          id={_id}
          className="book-delete"
          onClick={this.props.handleDelete}> -</span>
      </li>
    )
  }
}

export default Book
