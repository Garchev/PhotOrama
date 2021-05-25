import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap';
import * as imageServices from '../../services/images';
import ImageFrame from '../Images/ImageFrame';
import './Home.css';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: []
        }
    }


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
                <>
                    <h1>Welcome to PhotOrama!</h1>
                    <h2>Here's the top 3 liked photos</h2>
                    <ul>
                        {this.state.images.map(x =>
                            <ImageFrame key={x.id} {...x} />
                        )}
                    </ul>
                </>
        } else {
            content =
                <>
                    <Spinner animation="border" role="status">
                    </Spinner>
                    <h3 >Loading...</h3>
                </>
            }
            return content;
        }
    }

    export default Home;