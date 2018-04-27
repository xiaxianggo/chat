import React, { Component } from 'react';
import './App.css';
import ChatPage from './components/ChatPage';




class App extends Component {

  render() {
    return (
      <div className="App">
        <ul className="pages">
          <ChatPage />
        </ul>
      </div>
    );
  }
}

export default App;
