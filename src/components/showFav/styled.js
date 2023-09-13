import styled from "styled-components";

export const Main = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 16px;
  }

  @media screen and (max-width: 390px) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 10px; 
  }

    
`;