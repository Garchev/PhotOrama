import { Link } from 'react-router-dom';
import { Image, Container } from 'react-bootstrap';
import './ImageFrame.css';

function ImageFrame({
    id,
    imageUrl,
    author,
    imageName,
    likes
}) {
    return (
        <Container className="imageContainer" fluid='sm'>
            <Link className="link-details" to={`/images/details/${id}`} > <h3> {imageName}</h3></Link>
            <Image className="image" src={imageUrl} fluid />
            <p><q> Author: </q></p>
            <h4 id="authorName"> {author} </h4>
            <p> Likes: {likes.length}</p>
        </Container>
    )
}

export default ImageFrame;