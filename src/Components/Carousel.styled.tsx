import { styled } from "styled-components";
// import { devices } from "./constants";

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
