import React from 'react'
import ReactDOM from 'react-dom'

import BookList from './components/BookList'

class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <h1>Reading list</h1>
        <BookList />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
