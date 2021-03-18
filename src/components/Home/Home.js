import React, { Component } from 'react';
import Cookie from 'js-cookie';

class Home extends Component {
    constructor() {
        super();
    }

    render() {
        let cookie = Cookie.get('auth') || null;
        if(cookie) {
            cookie = JSON.parse(cookie);
            console.log(cookie.username)
            return <h1>Welcome {cookie.username}</h1>
        }
        return (
            <h1>Home</h1>
        )
    }
}

export default Home;