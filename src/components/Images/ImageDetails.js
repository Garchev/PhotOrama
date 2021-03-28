import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {Container, Image} from 'react-bootstrap'
import * as imageServices from '../../services/images'
import './ImageFrame.css';

const ImageDetails = ({
    match
}) => {
    let [img, setImg] = useState({});
    let [isLoaded, setIsloaded] = useState(false)
    useEffect(() => {
        imageServices.getOne(match.params.id).then((res) => {
            setImg(res.data())
            setIsloaded(true);
        })
    }, [match.params.id] );

    if (isLoaded) {

        return (

            <Container className="imageContainer" id="detailsContainer" fluid="sm">
                <h3>{img.title}</h3>
                <p>Likes: {img.likes}
                    <button className="button" >
                        <i className="fas fa-heart"></i>Like
                </button>
                </p>
                <Image className="image" src={img.url} />
                <p className="description">{img.description}</p>
                <div className="pet-info">
                    <Link to={`/images/details/${img.id}/edit`}><button className="button">Edit</button></Link>
                    <Link to="/images/details"><button className="button">Delete</button></Link>
                </div>
            </Container>
        );
    } else {
        return <h3>Loading...</h3>
    }
};

export default ImageDetails;