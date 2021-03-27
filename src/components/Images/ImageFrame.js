import { Image, Container } from 'react-bootstrap';
import './ImageFrame.css'
function ImageFrame({
    imageUrl,
    author,
    title, 
    description,
    likes

}) {
    return (
        <Container className= "imageContainer" fluid='sm'>
            <Image className="image" src={imageUrl} fluid />
            <p>{author}</p>
            <p>{title}</p>
            <p>{description}</p>
            <p>{likes}</p>
        </Container>
    )
}

export default ImageFrame