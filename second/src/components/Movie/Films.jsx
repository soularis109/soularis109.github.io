import React from 'react';
import axios from "axios";
import Film from "./Film";

const Films = () => {
    axios.get(`https://yts.mx/api/v2/list_movies.json`)
        .then(response => {
            console.log(response.data.data.movies)
        })
    const films = [
        {id: 34341, url: "https://yts.mx/movies/brave-2007", imdb_code: "tt1149582",
            title: "Brave", title_english: "Brave", background_image: "https://yts.mx/assets/images/movies/brave_2007/background.jpg",
            background_image_original: "https://yts.mx/assets/images/movies/brave_2007/background.jpg",
            large_cover_image: "https://yts.mx/assets/images/movies/brave_2007/large-cover.jpg",
            title_long: "Brave (2007)"}
    ]
    return (
        <div>
            {films.map(film => <Film
                title={film.title}
                title_long={film.title_long}
                cover={film.large_cover_image}
            />)}
        </div>
    );
};

export default Films;