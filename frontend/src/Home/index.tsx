import React from "react";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import "./Home.css";

const Home = () => {
    const images = [
        "image1.jpg",
        "image2.jpg",
        "image3.jpg",
        "image4.jpg",
        "image5.jpg",
    ];

    return (
        <Slide>
            {images.map((image) => {
                return (
                    <div className="each-slide-effect">
                        <div style={{ backgroundImage: `url(img/${image})` }}>
                            <span>Southwest Hurricane Aid</span>
                            <p>Providing help to those in the Gulf Coast</p>
                        </div>
                    </div>
                );
            })}
        </Slide>
    );
};

export default Home;
