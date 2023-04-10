import React from 'react';

import './custom-button.styles.scss';

const getButtonStyles = props => {
    return props.isFaceBookSignIn? 'facebook-signin': (props.isGoogleSignIn? 'google-signin': '');
}

const CustomButton = ({ children, ...props}) => {
    return (
        <button className={`ct-btn ${getButtonStyles(props)}`} {...props}>
            {children}
        </button>
    )
}


export default CustomButton;