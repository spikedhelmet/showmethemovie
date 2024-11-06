import SmallMovieItem from "./SmallMovieItem";
import { CarouselContainer, PrevButton, NextButton } from "../Components/Carousel.styled";
import { CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Mousewheel, Navigation } from "swiper/modules";
import "swiper/css";

interface MovieObject {
	id: number | string;
	title: string;
	poster: string;
}

interface CarouselProps {
	items: MovieObject[];
	heading: string;
}

function Carousel({ items, heading }: CarouselProps) {
	return (
		<CarouselContainer>
			<h3 style={{ color: "#fff", margin: "2rem 0rem 1rem 1rem" }}>{heading}</h3>
			<Swiper
				spaceBetween={15}
				slidesPerView={2}
				breakpoints={{
					470: {
						slidesPerView: 3,
					},
					640: {
						slidesPerView: 4,
					},
					768: {
						slidesPerView: 5,
					},
					1024: {
						slidesPerView: 6,
						spaceBetween: 15,
					},
					1366: {
						slidesPerView: 8,
						spaceBetween: 15,
					},
				}}
				// loop={true}
				modules={[Navigation, Mousewheel, Autoplay, Keyboard]}
				navigation={{
					nextEl: ".carousel_right",
					prevEl: ".carousel_left",
				}}
				mousewheel={true}
				keyboard={true}
				autoplay={{ delay: 1500 }}>
				<PrevButton>
					<CaretLeft className="carousel_left" size={32} color={"#fff"} />
				</PrevButton>
				<NextButton>
					<CaretRight className="carousel_right" size={32} color={"#fff"} />
				</NextButton>
				{items.map((movie: MovieObject) => (
					<SwiperSlide key={movie.id}>
						<SmallMovieItem title={movie.title} poster={movie.poster}></SmallMovieItem>
					</SwiperSlide>
				))}
			</Swiper>
		</CarouselContainer>
	);
}

// function Carousel({ items, heading }: CarouselProps) {
// 	return (
// 		<>
// 			<h3 style={{ color: "#fff", margin: "2rem 0rem 1rem 1rem" }}>{heading}</h3>
// 			<RelativeContainer>
// 				<CarouselContainer>
// 					{/* <CaretLeft size={32} /> */}
// 					<CarouselContent>
// 						{items.map((movie: MovieObject) => (
// 							<SmallMovieItem key={movie.id} title={movie.title} poster={movie.poster}></SmallMovieItem>
// 						))}
// 					</CarouselContent>
// 				</CarouselContainer>
// 			</RelativeContainer>
// 		</>
// 	);
// }

export default Carousel;
