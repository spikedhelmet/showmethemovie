export interface MovieComponentInterface {
	id: number;
	title: string;
	overview: string;
	releaseDate: string;
	rating: number;
	genres: Array<string>;
	poster: string;
	runtime: number;
	budget: number;
}

interface Genre {
	id: number;
	name: string;
}

interface ProductionCompany {
	id: number;
	logo_path: string | null;
	name: string;
	origin_country: string;
}

interface ProductionCountry {
	iso_3166_1: string;
	name: string;
}

interface SpokenLanguage {
	english_name: string;
	iso_639_1: string;
	name: string;
}

export interface MovieDetailsInterface {
	adult: boolean;
	backdrop_path: string | null;
	belongs_to_collection: null | object; // Specify the shape of the object if known
	budget: number;
	genres: Genre[];
	homepage: string;
	id: number;
	imdb_id: string;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string | null;
	production_companies: ProductionCompany[];
	production_countries: ProductionCountry[];
	release_date: string;
	revenue: number;
	runtime: number;
	spoken_languages: SpokenLanguage[];
	status: string;
	tagline: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

// for fetchCast
export interface CastMember {
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string;
	cast_id: number;
	character: string;
	credit_id: string;
	order: number;
}

export interface MovieCast {
	id: number;
	cast: CastMember[];
}
