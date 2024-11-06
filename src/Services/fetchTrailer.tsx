interface trailer {
  type: string;
}

async function fetchTrailer(movieId: number) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=1ae05c4ea048c47557912c1f2f5d77b2`
    );
    if (!response.ok) {
      throw new Error(`Error fetching trailer! status: ${response.status}`);
    }
    const data = await response.json();
    // Find the video that represents the trailer (usually has type "Trailer")
    const trailer = data.results.find(
      (video: trailer) => video.type === "Trailer"
    );
    const urlKey = trailer ? trailer.key : null;
    return urlKey; // Return only the key property
  } catch (error) {
    console.error("Error fetching trailer:", error);
    throw new Error("Error fetching trailer");
  }
}

export default fetchTrailer;
