import React from 'react';
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';
import './Home.css';

import slide1 from './image1.jpg';
import slide2 from './image2.jpg';
import slide3 from './image3.jpg';
import slide4 from './image4.jpg';
import slide5 from './image5.jpg';

const Home = () => {
	const images = [slide1, slide2, slide3, slide4, slide5];

	return (
		<Slide>
			<div className="each-slide-effect">
				<div style={{ 'backgroundImage': `url(${images[0]})` }}>
					<span>Southwest Hurricane Aid</span>
					
				</div>
			</div>

			<div className="each-slide-effect">
				<div style={{ 'backgroundImage': `url(${images[1]})` }}>
					<span>Southwest Hurricane Aid</span>
				</div>
			</div>

			<div className="each-slide-effect">
				<div style={{ 'backgroundImage': `url(${images[2]})` }}>
					<span>Southwest Hurricane Aid</span>
				</div>
			</div>
			
			<div className="each-slide-effect">
				<div style={{ 'backgroundImage': `url(${images[3]})` }}>
					<span>Southwest Hurricane Aid</span>
				</div>
			</div>
			
			<div className="each-slide-effect">
				<div style={{ 'backgroundImage': `url(${images[4]})` }}>
					<span>Southwest Hurricane Aid</span>
				</div>
			</div>
			

		</Slide>
	);
};

export default Home;