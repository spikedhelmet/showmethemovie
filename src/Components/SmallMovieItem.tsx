import { useNavigate } from "react-router";
import { SwiperMovieCard, SwiperMovieCardImage, SwiperMovieCardInfo } from "./Carousel.styled";
const posterBaseUrl = "https://image.tmdb.org/t/p/w500";

interface SmallMovieItemProps {
	id: number | string;
	poster: string;
	title: string;
}

function SmallMovieItem({ id, poster, title }: SmallMovieItemProps) {
	const navigate = useNavigate();

	return (
		<SwiperMovieCard
			onClick={() => {
				navigate(`/movie/${id}`);
			}}>
			<SwiperMovieCardImage src={`${posterBaseUrl}${poster}`} alt={`${title} poster`} />
			<SwiperMovieCardInfo>{title}</SwiperMovieCardInfo>
		</SwiperMovieCard>
	);
}

export default SmallMovieItem;
