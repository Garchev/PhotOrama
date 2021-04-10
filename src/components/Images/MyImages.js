import { useEffect, useContext, useState } from 'react';
import * as imageServices from '../../services/images';
import { UserContext } from '../../UserContext';
import ImageFrame from './ImageFrame';
import './MyImages.css'
function MyImages() {
    const {user} = useContext(UserContext);
    
    const [images, setImages] = useState({})
    const [isLoaded, setIsloaded] = useState(false)

    useEffect(() => {
        imageServices.getAllUserImages(user.user.email)
        .then(res => {
                setImages(res);
                setIsloaded(true);
            });
    }, [])




    let content;
    if (isLoaded) {
        content =
            <div className="userContent">
                <h1>{user.user.username} photos:</h1>
                {images === null || images.length === 0 ? <h2>It seems, that you don't have uploaded images yet</h2>
                :
                <ul>
                    {images.map(x =>
                        <ImageFrame key={x.id} {...x} />
                    )}
                </ul>}
            </div>
    } else {
        content = <h2> Loading...</h2>
    }
    return content;

}

export default MyImages;