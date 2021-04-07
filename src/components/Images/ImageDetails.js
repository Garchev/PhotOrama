import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import {Container, Image, Button} from 'react-bootstrap'
import * as imageServices from '../../services/images'
import './ImageFrame.css';
import {UserContext} from '../../UserContext'
function ImageDetails ({match, history}) {
    const [img, setImg] = useState({});
    const [isLoaded, setIsloaded] = useState(false);
    
    const {user} = useContext(UserContext)
    
    useEffect(() => {
        imageServices.getOne(match.params.id).then((res) => {
            setImg(res.data())
            setIsloaded(true);
        })
    }, [match.params.id, img] );

    function handleLike (e) {
        imageServices.addLikeToImage(match.params.id, user.user.id);
        setImg(null);
        setIsloaded(false);
    }

    if (isLoaded) {
        let isLiked = img.likes.includes(user.user.id)
        return (

            <Container className="imageContainer" id="detailsContainer" fluid="sm">
                <h3>{img.imageName}</h3>
                 <p id="likesParagraph">Likes: {img.likes.length}
                </p>
                 {isLiked ? null : <Button variant="primary" onClick={handleLike} id="likeButton" size="sm">
                  Like </Button>}
                <Image className="image" src={img.url} />
                <label id="categoryParagraph">Image category:</label>
                <h4> {img.category}</h4>
                <label id="descritexttionParagraph">Image Description:</label>
                <h5>{img.description}</h5>
                { user.user.username === img.author ? 
                <div>
                    <Link to={`/images/${match.params.id}/edit`}><Button varidnt="primary" id="editBtn">Edit</Button></Link>
                    <Link to="/images/delete"><Button varidnt="primary" id="deleteBtn">Delete</Button></Link>
                </div> 
                : null }
            </Container>
        );
    } else {
        return <h3>Loading...</h3>
    }
};

export default ImageDetails;