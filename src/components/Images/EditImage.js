import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { updateImage, getOne } from '../../services/images';
import '../Files/Upload.css';


function EditImage({ match, history }) {
    const [image, setImage] = useState(null);
    
    const [isLoaded, setIsloaded] = useState(false);

    useEffect(() => {
        getOne(match.params.id).then((res) => {
            setImage(res.data())
            setIsloaded(true);
        })
    }, [] );

    const handleError = (e) => {
        let errorBar = document.getElementById('error');
                errorBar.innerText = e;
                errorBar.style.display = "block";
    
                setTimeout(() => {
                    errorBar.style.display = "none";
                }, 2000);
    }

    function handleUpdate (e) {
        e.preventDefault();
        updateImage(match.params.id, e.target.imageName.value, e.target.imageDescr.value, e.target.imageCategory.value)
            .then(() => history.push('/'))
            .catch((e) => handleError(e))
    }


if(isLoaded){

    return (
        <Container id="uploadContainer" fluid="sm">
            <Form  onSubmit={handleUpdate}>
                <Form.Group>
                    <Alert id="error" variant="danger">Error</Alert>
                    <Form.Label>Image Name</Form.Label>
                    <Form.Control 
                        id="imageName"
                        name="imageName"
                        type="text"
                        defaultValue= {image.imageName}
                    />
                    <Form.Label>Image Description</Form.Label>
                    <Form.Control                         
                        id="imageDescr" name="imageDescr"
                        type="text"
                        defaultValue={image.description}
                        
                    />
                    <Form.Label>Category</Form.Label>
                    <Form.Control as="select" name="imageCategory" defaultValue={image.category}>
                        <option value="Nature">Nature</option>
                        <option value="People">People</option>
                        <option value="Other">Other</option>
                    </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit"> Update </Button>
            </Form>
        </Container>
    )
} else {
    return  <h3>Loading...</h3> ;
}
}

export default EditImage;