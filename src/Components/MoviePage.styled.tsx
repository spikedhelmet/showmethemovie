import { styled } from "styled-components";
import { devices } from "../constants";

export const Backdrop = styled.div`
  position: relative;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(
    0,
    0,
    0,
    0.25
  ); /* Adjust the alpha value for the desired opacity */
  z-index: 1; /* Ensure the overlay is above the image */
`;

export const BackdropImg = styled.img`
  position: absolute;
  /* top: 0; */
  z-index: -1;
  width: 100%;
  /* height: 100%; */
  object-fit: cover;
  opacity: 0.25;
`;

export const FlexCont = styled.div`
  display: flex;
  height: 50dvh;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin: 1rem;
`;

// * Movie
export const MovieContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
`;

export const Image = styled.img`
  width: 15rem;
  /* height: 20rem; */
  object-fit: contain;
  border-radius: var(--border-radius-slight);

  @media only screen and (${devices.md}) {
    width: 8em;
  }

  @media only screen and (${devices.sm}) {
    /* width: 8em;
    height: 12em; */
  }
`;

export const MovieDescription = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  gap: 0rem;
`;

export const MovieTitle = styled.h2`
  color: var(--font-color-white);
`;

export const MovieType = styled.p`
  color: var(--font-color-grey);
`;

export const MovieOverview = styled.p`
  color: #fff;
`;

export const MovieGenre = styled.p`
  /* color: var(--font-color-grey); */
  color: #fff9;
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

export const MovieDetails = styled.div`
  display: flex;
  gap: 0.4rem;
  color: var(--font-color-white);
  flex-wrap: wrap;

  span {
    background-color: var(--bg-color-secondary);
    border-radius: var(--border-radius-curved);
    padding: 0.4rem 0.6rem;
  }

  @media only screen and (${devices.md}) {
    span {
      /* padding: 0.7em; */
    }
  }

  @media only screen and (${devices.sm}) {
    span {
      /* font-size: 0.8em; */
    }
  }
`;

export const DescriptionItem = styled.span`
  display: flex;
  align-items: center;
`;
