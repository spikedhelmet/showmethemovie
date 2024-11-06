import { MovieDetailsInterface } from "../interfaces";

async function fetchDataById(id: number): Promise<MovieDetailsInterface> {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=1ae05c4ea048c47557912c1f2f5d77b2`
    );
    if (!response.ok) {
      throw new Error(
        `Error fetching movie details! status: ${response.status}`
      );
    }
    const data = await response.json();
    return data as MovieDetailsInterface; // Return the entire movie details object
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default fetchDataById;
