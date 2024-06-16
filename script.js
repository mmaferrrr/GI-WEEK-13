document.getElementById('submit').addEventListener('submit', (e) => {
    e.preventDefault();

    const input = document.getElementById("searchBar").value;
    const similarMoviesDiv = document.getElementById("similarMovies");
    similarMoviesDiv.innerHTML = "";

    fetch(`http://localhost:3000/search?movie=${input}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            let moviesData = '';

            if (!data.movie) {
                moviesData = `<p>Movie not found</p>`;
                similarMoviesDiv.innerHTML = moviesData;
                return;
            }

            moviesData += `
                <div class="similar-movies">
                <h1>${data.movie.title}</h1>
                    <img src="https://image.tmdb.org/t/p/w500/${data.movie.poster_path}" alt="${data.movie.title}" class="images">
                </div>
            `;

            if (data.similarMovies.length === 0) {
                moviesData += `<p>No similar movies found</p>`;
            } else {
                data.similarMovies.forEach(similarMovie => {
                    moviesData += `
                        <div class="similar-movies">
                            <h1>${similarMovie.title}</h1>
                            <img src="https://image.tmdb.org/t/p/w500/${similarMovie.poster_path}" alt="${similarMovie.title}" class="images">
                        </div>
                    `;
                });
            }

            similarMoviesDiv.innerHTML = moviesData;
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

