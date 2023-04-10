import styled from 'styled-components';

export const BackgroundImage = styled.div`
    border-radius: 50%;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-image: ${({image}) => `url(${image})`};
    border: black solid 1px;
`;