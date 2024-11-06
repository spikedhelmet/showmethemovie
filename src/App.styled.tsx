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
    font-family: 'Roboto', sans-serif;    
    background-color: var(--bg-color-main);

    @media only screen and (${devices.md}) {
      font-size: 1em;
   }
    @media only screen and (${devices.sm}) {
     font-size: 0.8em;
   }
    @media only screen and (${devices.xs}) {
     font-size: 0.7em;
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
	background-color: var(--bg-color-secondary);
	color: var(--font-color-white);
	padding: 1rem 1.5rem;
	min-width: 95%;
	border-radius: var(--border-radius-slight);
	margin-top: 1rem;
	margin-bottom: 1rem;

	&:focus {
		outline: 2px solid rgba(255, 255, 255, 0.9);
	}
`;

export const StyledMovieList = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
	align-items: top;
	width: 95%;
	column-gap: 1rem;
	row-gap: 2rem;

	@media only screen and (max-width: 1085px) {
		grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
	}
	@media only screen and (max-width: 975px) {
		grid-template-columns: 1fr;
	}
`;

// * Movie item

export const MovieContainer = styled.div`
	display: grid;
	grid-template-columns: 10rem 1fr;
	grid-template-rows: 1fr minmax(1rem, 2.2rem);
	column-gap: 1rem;
	row-gap: 0.5rem;
`;

export const ImageContainer = styled.div`
	/* display: flex;
	flex-direction: column;
	align-self: flex-start; */
	border-radius: var(--border-radius-slight);
`;

export const Image = styled.img`
	width: 100%;
	overflow: hidden;
	object-fit: contain;
	border-radius: var(--border-radius-slight);

	/* height: 15rem; */
	/* border-top-left-radius: var(--border-radius-slight);
  border-top-right-radius: var(--border-radius-slight); */

	@media only screen and (${devices.md}) {
		/* width: 8em;
    height: 12em; */
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
		height: 100vh;
	}
`;

export const TrailerContainer = styled.div`
	width: 100%;
	max-width: 800px;
	height: 100%;
	max-height: 80vh;
	position: relative;

	@media (max-width: 768px) {
		max-height: 60vh;
	}
`;

export const WatchTrailerButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	font-family: inherit;
	font-size: inherit;
	border: none;
	font-weight: 600;
	color: #ffdecc;
	background-color: #fe5800;
	padding: 0.4rem 0.6rem;
	border-radius: var(--border-radius-slight);
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
		/* font-size: 0.8em; */
		padding: 0.2rem 0.4rem;
	}
	@media only screen and (${devices.xs}) {
		/* font-size: 0.8em; */
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

// * Navbar

export const NavMenu = styled.nav`
	/* display: grid;
  grid-template-columns: repeat(3, 1fr); */
	display: flex;
	justify-content: flex-start;
	align-items: center;
	min-width: 100%;
	background-color: var(--bg-color-secondary);
	padding-left: 1rem;
	gap: 2rem;
`;

export const NavItem = styled.button`
	background-color: inherit;
	border: none;
	color: var(--font-color-white);
	text-align: center;
	padding: 0.5rem;
	margin: 0.5rem;
	font-size: 1rem;

	/* background-color: #3c3f48; */
	border-radius: var(--border-radius-slight);
	cursor: pointer;

	&:hover,
	&:focus,
	&:active {
		background-color: #3c3f48;
	}
`;

export const NavDropDown = styled.input``;

// * Background Poster
export const PosterContainer = styled.div`
	width: 100%;
	/* height: 20rem; */
	margin-bottom: 2rem;
	position: relative;
`;

export const HomepageHeading = styled.h1`
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	width: 100%;
	text-align: center;
	white-space: nowrap;
	color: #fff;
	box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -2px rgba(0, 0, 0, 0.12),
		0px 1px 5px 0px rgba(0, 0, 0, 0.2);
	padding: 1rem;
`;

export const BackgroundPoster = styled.img`
	width: 100%;
	height: 20rem;
	object-fit: cover;
	object-position: center;
	opacity: 40%;

	@media only screen and (${devices.md}) {
		height: 18rem;
	}
	@media only screen and (${devices.sm}) {
		height: 15rem;
	}
	@media only screen and (${devices.xxs}) {
		height: 10rem;
	}
`;

// // Carousel
// export const SmallMovieContainer = styled.div`
// 	/* margin-right: 0.8rem; */
// `;

// export const CarouselContainer = styled.div`
// 	width: 95%;
// 	margin: 0 auto;
// 	/* overflow: scroll; */
// `;

// export const RelativeContainer = styled.div`
// 	position: relative;
// `;

// export const CarouselButton = styled.button`
// 	position: absolute;
// 	top: 50%;
// 	transform: translateY(-50%);
// 	background: rgba(0, 0, 0, 0.5);
// 	color: white;
// 	border: none;
// 	padding: 10px;
// 	cursor: pointer;
// `;

// export const PrevButton = styled(CarouselButton)`
// 	position: absolute;
// 	left: 0;
// 	z-index: 9999;
// `;

// export const NextButton = styled(CarouselButton)`
// 	position: absolute;
// 	right: 0;
// 	z-index: 9999;
// `;

// export const CarouselContent = styled.div`
// 	display: flex;
// 	transition: transform 0.5s ease-in-out;
// `;
