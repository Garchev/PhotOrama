import { useEffect, useContext, useState } from 'react';
import * as imageServices from '../../services/images';
import { UserContext } from '../../UserContext';
import ImageFrame from './ImageFrame';
import './Home.css';

function Home() {
    const {user} = useContext(UserContext);

    const [images, setImages] = useState({})
    const [isLoaded, setIsloaded] = useState(false)

    useEffect(() => {
        imageServices.getTop3Images(user.user.id)
            .then(res => {
                setImages({ res });
                setIsloaded(true);
            });
    }, [])




    let content;
    if (isLoaded) {
        content =
            <div className="homeContent">
                <h1>Welcome to PhotOrama!</h1>
                <h2>Here's the top 3 liked photos</h2>
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

export default Home;