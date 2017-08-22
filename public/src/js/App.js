import React from 'react'
import {Route} from 'react-router-dom'

import BookList from './components/BookList'

const Login = () => (<div>Login</div>)

class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <h1>Reading list</h1>
        <Route exact path="/" component={BookList} />
        <Route path="/login" component={Login} />
      </div>
    )
  }
}

export default App
