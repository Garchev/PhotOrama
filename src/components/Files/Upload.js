import React, { useState } from 'react';
import Cookie from 'js-cookie';
import { Container, Form, ProgressBar } from 'react-bootstrap'
import { uploadImage } from '../../services/firebase'
import './Upload.css';


function Upload(props) {
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState('');
    const [imageDescr, setImageDescr] = useState('');

    const [url, setUrl] = useState("");
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
                    <Form.Control value={imageName} onChange={(e) => setImageName(e.target.value)}id="imageName" name="imageName" type="text" placeholder="Image Name" label="Image Name" />
                    <Form.Control value={imageDescr} onChange={(e) => setImageDescr(e.target.value)}id="imageDescr" name="imageDescr" type="text" placeholder="Image Description" label="Image Description" />
                </Form.Group>
                <ProgressBar now={progress} label={`${progress}%`} />

                <input type="file" onChange={handleChange} />
                <button onClick={handleUpload}> Upload </button>
            </Form>
        </Container>
    )
}

export default Upload;