import React from 'react';
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';
import './Home.css';

const Home = () => {
	const images = [
		'https://source.unsplash.com/featured/?{hurricane}',
		'https://source.unsplash.com/featured/?{hurricane}',
		'https://source.unsplash.com/featured/?{hurricane}'
	];

	return (
		<Slide>
			<div className="each-slide-effect">
				<div style={{ 'backgroundImage': `url(${images[0]})` }}>
					<span>Slide 1</span>
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