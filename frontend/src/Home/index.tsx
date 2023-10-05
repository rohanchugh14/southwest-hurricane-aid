// import { Container, Typography } from '@mui/material'
// import React from 'react'
// import './Home.css'

// const Home = () => {
//   return (
//     <Container>
//       <Typography variant="h2">
//         Southwest Hurricane Aid
//       </Typography>
//       <Typography variant='h5'>
//         providing aid to those living on the Texas coast
//       </Typography>
//     </Container>

//   )
// }

// export default Home



import React, { Component } from 'react';
import './Home.css';

class Home extends Component {
render() {
	return (
	<div className="homePage">
    <h1 className="title">SOUTHWEST HURRICANE AID</h1>
    <h6>Providing aid to those affect by hurricanes in Texas</h6>
	</div>
	);
}
}

export default Home;
