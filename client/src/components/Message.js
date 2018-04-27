import React, { Component } from 'react';

class Message extends Component {

    COLORS = [
        '#e21400', '#91580f', '#f8a700', '#f78b00',
        '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
        '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
    ];

    constructor(props) {
        super(props);
        this.state = {
            username: props.username ? props.username : '',
            message: props.message ? props.message : ''
        };
    }

    getUsernameColor() {
        var username = this.state.username;
        // Compute hash code
        var hash = 7;
        for (var i = 0; i < username.length; i++) {
            hash = username.charCodeAt(i) + (hash << 5) - hash;
        }
        // Calculate color
        var index = Math.abs(hash % this.COLORS.length);
        return this.COLORS[index];
    }

    render() {
        const color = {
            color: this.getUsernameColor()
        };
        return (
            <li className='message'>
                <span className="username" style={color}>
                    {this.state.username}
                </span>
                <span className="messageBody">
                    {this.state.message}
                </span>
            </li>
        )
    }
}


export default Message;