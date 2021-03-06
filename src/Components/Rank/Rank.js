import React from 'react';
import './Rank.css';

const Rank = ({name,entries}) => {
    return(
        <div className='rankDisplay' style={{display:'flex', alignContent: 'center',justifyContent:'center', flexDirection:'column'}}>
            <div className='white f3'>
                {`${name}, your entry count is`}
            </div>
            <div className='white f1'><br></br>
                {`${entries}`}
            </div>
        </div>
    );
}

export default Rank;