import React, { useState, useContext } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { uploadImage } from '../../services/images';
import './Upload.css';
import { UserContext } from '../../UserContext';


function Upload({ history }) {
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState('');
    const [imageDescr, setImageDescr] = useState('');
    const [imageCategory, setImageCategory] = useState('');

    const {user} = useContext(UserContext);

    const handleError = (e) => {
        let errorBar = document.getElementById('error');
                errorBar.innerText = e;
                errorBar.style.display = "block";
    
                setTimeout(() => {
                    errorBar.style.display = "none";
                }, 2000);
    }
    
    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const handleUpload = (e) => {
        e.preventDefault();
        uploadImage(image, user.user, imageName, imageDescr, imageCategory)
            .then(() => history.push('/'))
            .catch((e) => handleError(e))
    }


    return (
        <Container id="uploadContainer" fluid="sm">
            <Form>
                <Form.Group>
                    <Alert id="error" variant="danger">Error</Alert>
                    <Form.File id="custom-file" label="Choose image to upload" onChange={handleChange} />
                    <Form.Control value={imageName}
                        onChange={(e) => setImageName(e.target.value)}
                        id="imageName"
                        name="imageName"
                        type="text"
                        placeholder="Image Name"
                        label="Image Name"
                    />
                    <Form.Control value={imageDescr}
                        onChange={(e) => setImageDescr(e.target.value)}
                        id="imageDescr" name="imageDescr"
                        type="text"
                        placeholder="Image Description"
                        label="Image Description"
                    />
                    <Form.Control as="select" name="imageCategory" onChange={(e) => setImageCategory(e.target.value)}>
                        <option value="Nature">Nature</option>
                        <option value="People">People</option>
                        <option value="Vacation">Other</option>
                    </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit" onClick={handleUpload}> Upload </Button>
            </Form>
        </Container>
    )
}

export default Upload;