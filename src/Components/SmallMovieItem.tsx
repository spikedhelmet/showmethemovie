import { Image, ImageContainer } from "../App.styled";
const posterBaseUrl = "https://image.tmdb.org/t/p/w500";

interface SmallMovieItemProps {
	poster: string;
	title: string;
}

function SmallMovieItem({ poster, title }: SmallMovieItemProps) {
	return (
		<ImageContainer>
			<Image src={`${posterBaseUrl}${poster}`} alt={`${title} poster`} />
		</ImageContainer>
	);
}

export default SmallMovieItem;
