import React, { Component } from 'react';
import { sendMsg } from '../chat';


class InputMessage extends Component {

    componentDidMount() {
        setInterval(() => sendMsg('123'), 1000);
    }

    render() {
        return (
            <input className="inputMessage" placeholder="Type here..." />
        )
    }
}

export default InputMessage;