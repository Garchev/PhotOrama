import React, { useState } from 'react';
import Cookie from 'js-cookie';
import { Container, Form, Button, ProgressBar } from 'react-bootstrap'
import { uploadImage } from '../../services/images'
import './Upload.css';


function Upload(props) {
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState('');
    const [imageDescr, setImageDescr] = useState('');

    const cookie = JSON.parse(Cookie.get('auth'))


    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const handleUpload = (e) => {
        e.preventDefault();
        uploadImage(image, progress, setProgress, cookie, imageName, imageDescr);
    }

    return (
        <Container id="uploadContainer" fluid="sm">
            <Form>
                <Form.Group>
                    <ProgressBar now={progress} label={`${progress}%`} />
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
                </Form.Group>

                <Button variant="primary" type="submit" onClick={handleUpload}> Upload </Button>
            </Form>
        </Container>
    )
}

export default Upload;