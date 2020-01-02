import React from 'react';
//const Tilt = require('react-tilt');
import josherlogo from './josherlogo.png';

const Logo = () => {
    return(
        <img src={josherlogo} alt='josherlog' className='grow' style={{width:150,height:150,display:'flex',justifyContent:'flex-start'}}/>
    );
}

export default Logo;