import { Link } from "react-router-dom";
import { Image, Container } from "react-bootstrap";
import "./ImageFrame.css";

interface ImageFrameProps {
  id: string;
  imageUrl: string;
  author: string;
  imageName: string;
  likes: string[];
}

function ImageFrame({ id, imageUrl, author, imageName, likes }: ImageFrameProps) {
  return (
    <Container
      className="imageContainer"
      fluid="sm"
      style={{ maxWidth: '30vw'}}
    >
      <Link className="link-details" to={`/images/details/${id}`}>
        {" "}
        <h3>
          <em>{imageName}</em>
        </h3>
      </Link>
      <Image className="image" src={imageUrl} fluid />
      <p>
        <em> Author: </em>
      </p>
      <h4 id="authorName"> {author} </h4>
      <p>
        <em>Likes:</em> {likes.length}
      </p>
    </Container>
  );
}

export default ImageFrame;
