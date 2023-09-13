import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 150px;
  height: 150px;
  background-color: #f0f3f7;
  box-shadow: 5px 5px 5px lightgray;
  border-radius: 4px;
  margin: 10px auto;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const CardTitle = styled.h2`
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 20px;
  color: black;
  margin-bottom: 8px;
`;

export const FavoriteButton = styled.button`
  background-color: #ffcc00;
  color: #fff;
  border: none;
  padding: 4px 4px; 
  border-radius: 4px;
  cursor: pointer;
  position: absolute;
  top: 8px; 
  right: 8px; 
  max-width: 50px; 
  font-size: 15px; 
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff9900;
  }
`;


