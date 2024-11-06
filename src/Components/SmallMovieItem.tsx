import { useNavigate } from "react-router";
import { Image, ImageContainer, SmallMovieContainer } from "../App.styled";
const posterBaseUrl = "https://image.tmdb.org/t/p/w500";

interface SmallMovieItemProps {
	id: number | string;
	poster: string;
	title: string;
}

function SmallMovieItem({ id, poster, title }: SmallMovieItemProps) {
	const navigate = useNavigate();

	return (
		<SmallMovieContainer
			onClick={() => {
				navigate(`/movie/${id}`);
			}}>
			<ImageContainer>
				<Image src={`${posterBaseUrl}${poster}`} alt={`${title} poster`} />
			</ImageContainer>
		</SmallMovieContainer>
	);
}

export default SmallMovieItem;
