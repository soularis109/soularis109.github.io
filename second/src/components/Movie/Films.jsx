import React, {useEffect, useState} from 'react';
import Film from "./Film";
import './films.css';
import {useDispatch, useSelector} from "react-redux";
import {getMovies} from "../redux/films-reducer";
import {useHistory} from "react-router-dom";
import {MOVIE_ROUTE} from "../../utils/consts";
import Pagination from '../NavBar/Pagination'
import {searchMovie} from '../redux/films-reducer'

const Films = ({movie}) => {
    const films = useSelector(state => state.movies.films)
    const currentPage = useSelector(state => state.movies.currentPage)
    const pageSize = useSelector(state => state.movies.pageSize)
    const dispatch = useDispatch();
    const [sort, setSort] = useState('default',
        JSON.parse(localStorage.getItem('type')) || []
    )
    const [searchName, setSearchName] = useState('');

    function searchChangeHandler(e){
        setSearchName(e.target.value)
        dispatch(searchMovie(e.target.value))
    }

   useEffect(() => {
       localStorage.setItem('type', JSON.stringify(sort))
       dispatch(getMovies(currentPage, pageSize, sort))
   }, [currentPage, pageSize, sort, searchName])

    return (
        <div>
            <div className='navbar'>
                <div className='navbar__name'>Movies</div>
                <input placeholder='movie search' value={searchName} onChange={searchChangeHandler}/>
                <button>Search</button>
                <div className='pagination'><Pagination/></div>
            </div>

            <select value={sort} onChange={e => setSort(e.target.value)} className='movie__select'>
                <option value='default'>Default</option>
                <option value='title'>Name</option>
                <option value='year'>Year</option>
                <option value='rating'>Rating</option>
            </select>

            <div className='container'>
                {films.map(film => <Film key={film.id}
                                         id={film.id}
                                         title={film.title}
                                         title_long={film.title_long}
                                         cover={film.large_cover_image} description={film.description_full}
                />)}
            </div>
        </div>

    );
};

export default Films;