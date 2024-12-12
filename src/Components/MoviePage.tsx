import { useState, useEffect } from "react";
import {
	MovieContainer,
	Image,
	ImageContainer,
	MovieTitle,
	MovieOverview,
	MovieDetails,
	MovieGenre,
	DescriptionItem,
	FlexCont,
	ActorImage,
	CastList,
	ActorCard,
	DescriptionContainer,
	PageContainer,
} from "./MoviePage.styled";

import { TrailerContainer, TrailerPopup, WatchTrailerButton, CloseTrailerButton } from "../App.styled";

import fetchTrailer from "../Services/fetchTrailer";
import fetchDataById from "../Services/fetchDataById";
import fetchCast from "../Services/fetchCast";
import formatTime from "../Scripts/formatTime";
import Trailer from "./Trailer";
import { BackdropImg } from "./MoviePage.styled";
import { CastMember, MovieDetailsInterface } from "../interfaces";
import { useParams } from "react-router-dom";
import { NextButton, PrevButton } from "./Carousel.styled";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Mousewheel, Navigation } from "swiper/modules";

type idParams = {
	id: string;
};

function MoviePage() {
	const { id } = useParams<idParams>();
	const movieId = Number(id);

	const [movieData, setMovieData] = useState<MovieDetailsInterface | null>(null);
	const [movieCast, setMovieCast] = useState<CastMember[]>([]);
	const [trailer, setTrailer] = useState("");
	const [isOpenTrailer, setIsOpenTrailer] = useState(false);

	const posterBaseUrl = "https://image.tmdb.org/t/p/w500";
	const backdropBaseUrl = "https://image.tmdb.org/t/p/original"; // Use 'original' for the highest resolution

	useEffect(() => {
		fetchDataById(movieId).then((data) => {
			setMovieData(data);
		});

		fetchCast(movieId).then((data) => {
			setMovieCast(data.cast);
		});
	}, [movieId]);

	const backdropUrl = backdropBaseUrl + movieData?.backdrop_path;

	function handleTrailer(id: number) {
		fetchTrailer(id).then((trailerKey) => {
			if (trailerKey) {
				setTrailer(trailerKey); // Set the trailer in the state
				setIsOpenTrailer(!isOpenTrailer);
			}
		});
	}

	function handleOpenTrailer() {
		setIsOpenTrailer(!isOpenTrailer);
	}

	const genresJoined = movieData?.genres ? movieData?.genres.map((genre) => genre.name).join(", ") : "";

	return (
		<PageContainer>
			<BackdropImg src={backdropUrl} />
			<FlexCont>
				<MovieContainer>
					<ImageContainer>
						<Image src={`${posterBaseUrl}${movieData?.poster_path}`} alt={`${movieData?.title} poster`} />
					</ImageContainer>
					<DescriptionContainer>
						<MovieTitle>{movieData?.title}</MovieTitle>
						<MovieGenre>{genresJoined} </MovieGenre>
						<MovieDetails>
							<DescriptionItem>📆 {movieData?.release_date}</DescriptionItem>
							<DescriptionItem>🕛 {formatTime(movieData?.runtime)}</DescriptionItem>
							<DescriptionItem>⭐ {movieData?.vote_average}</DescriptionItem>
						</MovieDetails>
						<MovieOverview>{movieData?.overview}</MovieOverview>
						<WatchTrailerButton onClick={() => handleTrailer(movieId)}>▶️ Watch trailer</WatchTrailerButton>
					</DescriptionContainer>
				</MovieContainer>
			</FlexCont>

			{/* <CastList>
				{movieCast.slice(0, 12).map((castMember, index) => (
					<ActorCard key={index}>
						<ActorImage src={`${posterBaseUrl}${castMember.profile_path}`} />
						<p>{castMember.name}</p>
					</ActorCard>
				))}
			</CastList> */}
			<CastList>
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
					modules={[Navigation, Mousewheel, Autoplay, Keyboard]}
					navigation={{
						nextEl: ".carousel_right",
						prevEl: ".carousel_left",
					}}
					// loop={true}
					// autoplay={{ delay: 1500 }}
					mousewheel={true}
					keyboard={true}>
					<PrevButton>
						<CaretLeft className="carousel_left" size={32} color={"#fff"} />
					</PrevButton>
					<NextButton>
						<CaretRight className="carousel_right" size={32} color={"#fff"} />
					</NextButton>

					{movieCast.slice(0, 12).map((castMember, index) => (
						<SwiperSlide key={index}>
							<ActorCard>
								<ActorImage src={`${posterBaseUrl}${castMember.profile_path}`} />
								<figcaption>{castMember.name}</figcaption>
							</ActorCard>
						</SwiperSlide>
					))}
				</Swiper>
			</CastList>

			{/* Touch nothing below */}
			{isOpenTrailer && (
				<TrailerPopup>
					<TrailerContainer>
						<CloseTrailerButton onClick={handleOpenTrailer}>
							<span>Close Trailer</span>
							<i className="ph ph-x"></i>
						</CloseTrailerButton>
						<Trailer trailer={trailer} />
					</TrailerContainer>
				</TrailerPopup>
			)}
		</PageContainer>
	);
}

export default MoviePage;
