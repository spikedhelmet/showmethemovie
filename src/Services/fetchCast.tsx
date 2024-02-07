import { MovieCast } from "../interfaces";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYWUwNWM0ZWEwNDhjNDc1NTc5MTJjMWYyZjVkNzdiMiIsInN1YiI6IjY0ZDM2YzFhYmYzMWYyMDFjYjY4MTA0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._7oyBDB_CiVPWW4rMu10ZuO7WKia27OTasbdS4SnD5s",
  },
};

async function fetchCast(id: number): Promise<MovieCast> {
  const URL = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;

  try {
    const response = await fetch(URL, options);

    if (!response.ok) {
      throw new Error(
        `Error fetching movie details! status: ${response.status}`
      );
    }
    const data = await response.json();
    // console.log(data);

    return data as MovieCast;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default fetchCast;
