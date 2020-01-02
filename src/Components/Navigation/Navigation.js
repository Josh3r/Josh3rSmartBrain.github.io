import React from 'react';

// Navigation is basically out sign out function/ button 
const Navigation = ({onRouteChange}) => {
    return(
        <nav className='f3 link dim black underline pa3 pointer' style={{height:10,display:'flex',justifyContent:'flex-end'}} onClick={()=>onRouteChange('signin')}>
            <p>
            Sign out
            </p>
        </nav> // Recall that the nav tag indicates a navigation link
    );
}
export default Navigation;