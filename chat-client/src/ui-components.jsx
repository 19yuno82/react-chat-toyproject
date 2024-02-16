import styled from 'styled-components';

const UlMessage = styled.ul`
    max-width: 800px;
    margin: 10px auto;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 5px;
`;
const LiMessage = styled.li`
    backround-color : lightblue;
    border: 2px solid dodgerblue;
    padding : 10px 20px;
`;
export {UlMessage, LiMessage}