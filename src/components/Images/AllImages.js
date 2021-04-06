import { useEffect, useState } from 'react';
import * as imageServices from '../../services/images';
import ImageFrame from './ImageFrame';
import './MyImages.css'

function AllImages() {
   
    
    const [images, setImages] = useState({})
    const [isLoaded, setIsloaded] = useState(false)

    useEffect(() => {
        imageServices.getAllImages()
        .then(res => {
                setImages(res);
                setIsloaded(true);
            });
    }, [])


    let content;
    if (isLoaded) {
        content =
            <div className="userContent">
                <ul>
                    {images.map(x =>
                        <ImageFrame key={x.id} {...x} />
                    )}
                </ul>
            </div>
    } else {
        content = <h2> Loading...</h2>
    }
    return content;

}

export default AllImages;