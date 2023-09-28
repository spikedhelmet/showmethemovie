//^ STYLED COMPONENTS
import { styled } from "styled-components";
import { createGlobalStyle } from "styled-components";
import { devices } from "./constants";

export const GlobalStyle = createGlobalStyle`
  :root {
    --color-test: #F5005E;
    --font-color-white: #EAEAEB;
    --font-color-grey: #5B5C61;
    --bg-color-main: #181A20;
    --bg-color-secondary: #262A34;
    --border-radius-slight: 9px;
    --border-radius-curved: 13px;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Rubik', sans-serif;
    background-color: var(--bg-color-main);

    @media only screen and (${devices.md}) {
      font-size: 1em;
   }

    @media only screen and (${devices.sm}) {
     font-size: 0.8em;
   }
    @media only screen and (${devices.xs}) {
     font-size: 0.6em;
   }

  }
`;

export const Container = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SearchBar = styled.input`
  font-family: inherit;
  border: none;
  outline: none;
  background-color: var(--bg-color-secondary);
  color: var(--font-color-white);

  padding: 1rem 1.5rem;
  min-width: 80%;
  border-radius: var(--border-radius-slight);
  margin-top: 4rem;
  margin-bottom: 2rem;

  &:focus {
    outline: 2px solid white;
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 2rem;
`;

export const MovieList = styled.div`
  display: grid;
  grid-auto-flow: row;
  align-content: center;
  width: 80%;
`;

export const MovieContainer = styled.div`
  /* padding: 0 1rem; */

  display: flex;
  align-items: center;
  gap: 2rem;
`;

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
`;

export const Image = styled.img`
  width: 10rem;
  height: 15rem;
  border-top-left-radius: var(--border-radius-slight);
  border-top-right-radius: var(--border-radius-slight);

  @media only screen and (${devices.md}) {
    /* width: 8em;
    height: 12em; */
  }

  @media only screen and (${devices.sm}) {
    width: 8em;
    height: 12em;
  }
`;

export const MovieHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export const MovieTitle = styled.h2`
  color: var(--font-color-white);
`;

export const MovieType = styled.p`
  color: var(--font-color-grey);
`;

export const MovieOverview = styled.p`
  color: #a5a5a5;
  /* color: #c5c6c9; */
`;

export const MovieGenre = styled.p`
  color: var(--font-color-grey);
`;

export const ReadMoreButton = styled.button`
  display: block;
  font-family: inherit;
  font-size: inherit;
  border: none;
  font-weight: 600;
  color: var(--font-color-grey);
  background-color: transparent;
  cursor: pointer;
  margin-top: 0.5rem;
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  gap: 0.4rem;
`;

export const MovieDetails = styled.div`
  display: flex;
  gap: 0.5rem;
  color: var(--font-color-white);
  /* width: 60%; */
  flex-wrap: wrap;
  flex-grow: 0;

  span {
    background-color: var(--bg-color-secondary);
    padding: 0.8rem;
    border-radius: var(--border-radius-curved);
  }

  @media only screen and (${devices.md}) {
    span {
      font-size: 1em;
      padding: 0.7em;
    }
  }

  @media only screen and (${devices.sm}) {
    span {
      font-size: 0.8em;
    }
  }
`;

export const DescriptionItem = styled.span``;

export const StatusContainer = styled.div`
  display: flex;
  /* align-items: flex-start; */
  flex-direction: column;
  gap: 0.2rem;
`;

export const Status = styled.p`
  color: var(--font-color-grey);
`;

export const AddToListButton = styled.button`
  /* background-color: var(--bg-color-secondary); */
  /* color: var(--font-color-white);
  background-color: #ff7300; */
  font-family: inherit;
  font-size: inherit;
  border: none;
  font-weight: 600;
  color: #ffdecc;
  background-color: #fe5800;
  padding: 0.4rem 0.6rem;
  border-radius: var(--border-radius-curved);
  transition: ease-in 0.2s;

  &:hover,
  :active {
    background-color: #e54f00;
    opacity: 95%;
  }
`;

// const TrailerPopup = styled.div`
//export    display: flex;
//   align-items: center;
//   justify-content: center;
//   position: absolute;
//   /* top: 0; */
//   height: 100vh;
//   width: 100vw;
//   background-color: black;
//   /* opacity: 0.9; */
//   z-index: 9999;
//   /* pointer-events: none; */
// `;

export const TrailerPopup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed; /* Use fixed positioning for the popup */
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 9999;

  @media (max-width: 768px) {
    height: 100vh; /* Adjust as needed */
  }
`;

export const TrailerContainer = styled.div`
  width: 100%;
  max-width: 800px; /* Set a maximum width for the container */
  height: 100%;
  max-height: 80vh; /* Set a maximum height for the container */
  position: relative; /* Relative positioning to center the iframe */

  @media (max-width: 768px) {
    max-height: 60vh; /* Adjust as needed */
  }
`;

export const WatchTrailerButton = styled.button`
  font-family: inherit;
  font-size: inherit;
  border: none;
  font-weight: 600;
  color: #ffdecc;
  background-color: #fe5800;
  padding: 0.4rem 0.6rem;
  /* border-radius: var(--border-radius-slight); */
  border-bottom-left-radius: var(--border-radius-slight);
  border-bottom-right-radius: var(--border-radius-slight);
  transition: ease-in 0.2s;

  &:hover,
  :active {
    background-color: #e54f00;
    opacity: 95%;
    cursor: pointer;
  }

  @media only screen and (${devices.md}) {
    font-size: 1em;
  }

  @media only screen and (${devices.sm}) {
    font-size: 0.8em;
    padding: 0.2rem 0.4rem;
  }
  @media only screen and (${devices.xs}) {
    font-size: 0.6em;
    padding: 0.2rem 0.4rem;
  }
`;

export const CloseTrailerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: inherit;
  font-size: inherit;
  border: none;
  font-weight: 600;
  color: #fff;
  background-color: var(--font-color-grey);
  padding: 0.4rem 0.6rem;
  border-top-left-radius: var(--border-radius-slight);
  border-top-right-radius: var(--border-radius-slight);
  transition: ease-in 0.2s;

  &:hover,
  :active {
    opacity: 95%;
    cursor: pointer;
  }
`;

// const TrailerNotFoundMessage = styled.div`
//export    position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   background-color: rgba(0, 0, 0, 0.8);
//   color: white;
//   padding: 1rem;
//   border-radius: 8px;
//   z-index: 9999;
//   text-align: center;
// `;

// function TrailerNotFound() {
//   return (
//     <TrailerNotFoundMessage>
//       Trailer not found for this movie.
//     </TrailerNotFoundMessage>
//   );
// }
