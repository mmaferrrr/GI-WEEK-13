import express from 'express';
import axios from 'axios'; 
import cors from 'cors';


const app = express();
const port = 3000;
const apiKey = '0795660929a223748cc51173fe65d536';

app.use(express.json());

app.use(cors());


app.get('/search', async (req, res) => {
    const { movie } = req.query;
    const url = `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        if (!data.results || data.results.length === 0) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        const movieId = data.results[0].id;
        const urlId = `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1&api_key=${apiKey}`;
        const responseSimilar = await axios.get(urlId);
        const similarMovies = responseSimilar.data;

        const result = {
            movie: data.results[0],
            similarMovies: similarMovies.results,
        };

        res.json(result);

    } catch (error) {
        console.error('error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

