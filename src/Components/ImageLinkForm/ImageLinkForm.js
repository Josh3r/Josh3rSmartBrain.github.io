import React from 'react';
import './ImageLinkForm.css'
const ImageLinkForm = ({onInputChange,onImageSubmit}) => {
    return(
        <div style={{display: 'flex',flexDirection:'column',justifyContent:'center', alignItems:'center'}}>
            <p className='f3 w-1000'>
                This Magic Brain detects faces
            </p>
            <div className='pattern form'>
                <input type='text' className='w-1000' onChange={onInputChange}/>
                <br></br>
                <button className= 'w-100 grow f4 link ph3 pv2 dib white bg-orange' onClick={onImageSubmit}>Detect</button>
            </div>
        </div>
    );
}

export default ImageLinkForm