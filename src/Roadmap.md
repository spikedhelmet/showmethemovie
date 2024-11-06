It's a small and simple web app where you can create a list of movies you plan to watch in the future but can't quite find the time for.

App has sections:

1. Search
2. To-Watch List
3. Watched List

&Search:
Search bar
Sort by genres (popup menu)
Results (component tree)

<!--^ To-Watch List: -->

A column contanining movie components:

<!--^ Component consists of: -->

(on the left):
Poster

(on the right):
Name
Type: Movie/Series
Genre
Year
Length
Rating
Watched / Not Watched Status
Add to list (button)

<!-- TODOS -->

1. ✅Figure out how to get data from the API:
   https://developer.themoviedb.org/docs/finding-data

   Note: You can use this search URL to find movies, series, actors, characters etc.
   `https://api.themoviedb.org/3/search/multi?query=${title}&include_adult=true&language=en-US&page=1`;

2. ✅Build Static Components

3. ✅Add search functionality
   -Default sorting should be rating (or some kind of relevancy)

4. ✅Map through search results and render each result in a component

-Posters are working ✅
(with exceptions - implement data validation)
-Genres are working ✅
-Get duration ✅
-Get age restriction

5. ✅Load and view trailer for each movie component only when clicked on "Watch Trailer"
   -If there is no trailer I want a message instead that says the trailer hasn't been found
   -Adjust trailer size accordingly ✅

6.
