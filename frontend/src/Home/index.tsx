import React from 'react';
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';
import './Home.css';

import slide1 from './background1.webp';
import slide2 from './background2.jpg';
import slide3 from './background3.jpg';

const Home = () => {
	const images = [slide1, slide2, slide3];

	return (
		<Slide>
			<div className="each-slide-effect">
				<div style={{ 'backgroundImage': `url(${images[0]})` }}>
					<span>Southwest Hurricane Aid</span>
				</div>
			</div>

			<div className="each-slide-effect">
				<div style={{ 'backgroundImage': `url(${images[1]})` }}>
					<span>Slide 2</span>
				</div>
			</div>

			<div className="each-slide-effect">
				<div style={{ 'backgroundImage': `url(${images[2]})` }}>
					<span>Slide 3</span>
				</div>
			</div>
			

		</Slide>
	);
};

export default Home;