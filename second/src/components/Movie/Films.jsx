import React, {useEffect} from 'react';
import Film from "./Film";
import './films.css';
import {useDispatch, useSelector} from "react-redux";
import {getMovies} from "../redux/films-reducer";
import {useHistory} from "react-router-dom";
import {MOVIE_ROUTE} from "../../utils/consts";

const Films = ({movie}) => {
    const films = useSelector(state => state.movies.films)
    const dispatch = useDispatch();


   useEffect(() => {
       dispatch(getMovies())
   }, [])

    return (
        <div className='container'>
            {films.map(film => <Film key={film.id}
                id={film.id}
                title={film.title}
                title_long={film.title_long}
                cover={film.large_cover_image} description={film.description_full}
            />)}

        </div>

    );
};

export default Films;