import { styled } from "styled-components";
import { devices } from "../constants";

export const SwiperMovieCard = styled.figure`
	position: relative;
	margin: 0;
	overflow: hidden;
	cursor: pointer;
	border-radius: var(--border-radius-slight);

	&:hover {
		& > figcaption {
			transform: translateY(0);
		}

		& img {
			transform: translateY(-10%);
		}
	}
`;

export const SwiperMovieCardImage = styled.img`
	width: 100%;
	overflow: hidden;
	object-fit: contain;
	border-radius: var(--border-radius-slight);
	transition: all 0.3s ease;

	@media only screen and (${devices.md}) {
	}
	@media only screen and (${devices.sm}) {
	}
`;

export const SwiperMovieCardInfo = styled.figcaption`
	position: absolute;
	bottom: 0;
	transform: translateY(100%);
	transition: all 0.3s ease;

	width: 100%;
	padding: 0.4rem 0;
	text-align: center;
	/* color: var(--bg-color-main);
	background-color: #fff; */
	color: var(--font-color-white);
	background-color: var(--bg-color-main);
`;

// Carousel

export const CarouselContainer = styled.div`
	width: 95%;
	margin: 0 auto;
	/* overflow: scroll; */
`;

export const RelativeContainer = styled.div`
	position: relative;
`;

export const CarouselButton = styled.button`
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	background: rgba(0, 0, 0, 0.5);
	color: white;
	border: none;
	padding: 10px;
	cursor: pointer;
`;

export const PrevButton = styled(CarouselButton)`
	position: absolute;
	left: 0;
	z-index: 9999;
`;

export const NextButton = styled(CarouselButton)`
	position: absolute;
	right: 0;
	z-index: 9999;
`;

export const CarouselContent = styled.div`
	display: flex;
	transition: transform 0.5s ease-in-out;
`;
