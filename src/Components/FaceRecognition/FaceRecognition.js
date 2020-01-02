import React from 'react';
import './FaceRecognition.css';
                        // Recall we use {someVar} to tell JSX we need to interpret someVar as a javascript variable and not a string
const FaceRecognition = ({imageUrl,box}) => { 
    return(
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id="inputImage" alt="" src={imageUrl} width='100%' height='auto'/>
                <div className="bounding-box" style={{top:box.topRow, right:box.rightCol, bottom:box.bottomRow, left: box.leftCol }}></div>
            </div>
        </div>
    )
}

export default FaceRecognition;