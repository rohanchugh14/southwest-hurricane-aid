import React from 'react';
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';
import './Home.css';

import slide1 from './slide1.jpg';
import slide2 from './slide2.jpg';
import slide3 from './slide3.jpg';
import slide4 from './slide4.jpg';
import slide5 from './slide5.webp';

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
					<span>Slide 2</span>
				</div>
			</div>

			<div className="each-slide-effect">
				<div style={{ 'backgroundImage': `url(${images[2]})` }}>
					<span>Slide 3</span>
				</div>
			</div>

			<div className="each-slide-effect">
				<div style={{ 'backgroundImage': `url(${images[3]})` }}>
					<span>Slide 4</span>
				</div>
			</div>

			<div className="each-slide-effect">
				<div style={{ 'backgroundImage': `url(${images[4]})` }}>
					<span>Slide 5</span>
				</div>
			</div>

			

		</Slide>
	);
};

export default Home;