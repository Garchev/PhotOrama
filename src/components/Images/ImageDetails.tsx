import { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Image, Button, Spinner } from 'react-bootstrap';
import * as imageServices from '../../services/images';
import { UserContext } from '../../UserContext';
import './ImageFrame.css';

function ImageDetails({ match, history }) {
  const params = useParams();
  
  const [img, setImg] = useState({});
  const [isLoaded, setIsloaded] = useState(false);

  const { user } = useContext(UserContext);

  useEffect(() => {
    imageServices.getOne(params.id as string).then((res) => {
      setImg(res.data());
      setIsloaded(true);
      console.log('loaded');
    });
  }, [isLoaded]);

  function handleLike(e) {
    imageServices.addLikeToImage(match.params.id, user.user.id);
    setImg(null);
    setIsloaded(false);
  }

  function handleDeleteImage() {
    imageServices
      .deleteImage(match.params.id)
      .then(() => {
        history.push(`/users/${user.user.id}/images`);
      })
      .catch((e) => console.log(e));
  }

  if (isLoaded) {
    const isLiked = user ? img.likes.includes(user.user.id) : true;

    return (
      <Container className='imageContainer' id='detailsContainer' fluid='sm'>
        <h3>
          <em>{img.imageName}</em>
        </h3>
        <p id='likesParagraph'>
          <em>Likes:</em> <strong>{img.likes.length}</strong>
        </p>

        {isLiked ? null : (
          <Button
            variant='primary'
            onClick={handleLike}
            id='likeButton'
            size='sm'
          >
            {' '}
            Like{' '}
          </Button>
        )}
        <Image className='image' src={img.url} />
        <p id='categoryParagraph'>
          <em>Image category:</em>
        </p>
        <h4> {img.category}</h4>
        <p id='descriptionParagraph'>
          <em>Image Description:</em>
        </p>
        <h5>{img.description}</h5>
        {user?.user.username === img.author ? (
          <div className='buttons-container'>
            <Link to={`/images/${match.params.id}/edit`}>
              <Button variant='primary' id='editBtn'>
                Edit
              </Button>
            </Link>
            <Link to={`/images/${match.params.id}delete`}>
              <Button
                variant='primary'
                id='deleteBtn'
                onClick={handleDeleteImage}
              >
                Delete
              </Button>
            </Link>
          </div>
        ) : null}
      </Container>
    );
  } else {
    return (
      <>
        <Spinner animation='border' role='status'></Spinner>
        <h3>Loading...</h3>
      </>
    );
  }
}

export default ImageDetails;
