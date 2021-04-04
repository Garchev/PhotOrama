import { Link } from 'react-router-dom';
import { Image, Container } from 'react-bootstrap';
import './ImageFrame.css';
function ImageFrame({
    id,
    imageUrl,
    author,
    imageName,
    description,
    likes
}) {
    return (
        <Container className="imageContainer" fluid='sm'>
            <Link className="link-details" to={`/images/details/${id}`}><h3>{imageName}</h3></Link>
            <Image className="image"
                src={imageUrl} fluid />

            <table className="image-details">
                <tbody>
                    <tr><td>Author: {author}</td></tr>
                    <tr><td>Likes: {likes.length}</td></tr>
                </tbody>
            </table>
        </Container>
    )
}

export default ImageFrame;