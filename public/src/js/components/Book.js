import React from 'react'

class Book extends React.Component {
  render() {
    let {author, title} = this.props.item
    return (
      <li>{author}: {title}</li>
    )
  }
}

export default Book
