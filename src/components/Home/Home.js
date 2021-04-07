import React, { Component } from 'react';
import * as imageServices from '../../services/images';
import { UserContext } from '../../UserContext';
import ImageFrame from '../Images/ImageFrame';
import './Home.css';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: []
        }
    }
    static contextType = UserContext;

    componentDidMount() {
        imageServices.getTop3Images()
            .then(res => {
                this.setState({ images: res });
            });
    }

    render() {
        let content;
        if (this.state.images.length > 0) {
            content =
                <div className="homeContent">
                    <h1>Welcome to PhotOrama!</h1>
                    <h2>Here's the top 3 liked photos</h2>
                    <ul>
                        {this.state.images.map(x =>
                            <ImageFrame key={x.id} {...x} />
                        )}
                    </ul>
                </div>
        } else {
            content = <h2> Loading...</h2>
        }
        return content;
    }
}

export default Home;