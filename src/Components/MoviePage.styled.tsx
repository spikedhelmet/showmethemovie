import { styled } from "styled-components";
import { devices } from "../constants";

export const PageContainer = styled.section`
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
`;

// export const Overlay = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.45);
//   z-index: 1; /* Ensure the overlay is above the image */
// `;

export const BackdropImg = styled.img`
	position: absolute;
	/* top: 0; */
	z-index: -1;
	width: 100%;
	/* height: 100%; */
	object-fit: cover;
	opacity: 0.1;
`;

export const FlexCont = styled.div`
	display: flex;
	width: 90%;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 5rem;
	margin: 1rem 0;
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
	width: 16rem;
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

export const DescriptionContainer = styled.div`
	display: grid;
	grid-template-rows: 2rem 2rem 3rem 10rem 2.5rem;
	align-content: space-between;
	gap: 1rem;
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
		/* background-color: var(--bg-color-secondary); */
		/* border-radius: var(--border-radius-curved); */
		margin: 0 1.5rem 0 0;
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

// CastList
export const CastList = styled.ul`
	width: 90%;
	list-style-type: none;
	list-style-position: inside;
	margin: 0;
	padding: 0;
	display: flex;
	position: relative;
	top: 0;
	left: 0;
	-webkit-overflow-scrolling: touch;
	overflow-y: hidden;
	overflow-x: scroll;
	margin-top: -10px;
	padding-bottom: 10px;
`;

export const ActorCard = styled.li`
	margin: 10px 4px 10px 10px;
	padding-bottom: 10px;
	overflow: hidden;
	min-width: 170px;
	/* width: 150px; */
	color: #fff;
`;

export const ActorImage = styled.img`
	width: 10rem;
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
