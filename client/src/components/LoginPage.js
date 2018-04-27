import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class LoginPage extends Component {

    componentDidMount() {
        newMsg(data => {
            this.setState(prevState => ({
                messages: [...prevState.messages, data]
            }));
        });
    }

    componentWillUnmount() {

    }

    componentDidUpdate(prevProps) {
        const node = ReactDOM.findDOMNode(this);
        const messages = node.getElementsByClassName('messages')[0];
        messages.scrollTop = messages.scrollHeight;
    }

    render() {
        return (
            <li className="chat page">
                <div className="chatArea">
                    <ul className="messages">
                        {this.state.messages.map((msg, index) => (
                            <Message username={msg.username} message={msg.message} key={index} />
                        ))}
                    </ul>
                </div>
                <InputMessage />
            </li>
        )
    }
}

export default LoginPage;