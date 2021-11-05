import React, {useEffect, useState} from 'react';
import './filmsPage.css'
import {useParams} from "react-router-dom";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setMoviesDetails ,addComments} from "../redux/films-reducer";
import Comments from './Comments'
import {MOVIES_ROUTE} from "../../utils/consts";
import {useHistory} from "react-router-dom";

const FilmsPage = () => {

    const history = useHistory();
    const dispatch = useDispatch()
    const details = useSelector(state => state.movies.details)
    const {id} = useParams();
    const [value, setValue] = useState({
        title: ''
    })

    useEffect(() => {
            axios.get(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
                .then(response => {
                    dispatch(setMoviesDetails(response.data.data.movie))

                })
    },[])

    if (details < 1) {
        return <h1>wait</h1>
    }


    return (
        <div>
            <div className='navbar__movie'>
                <div className='navbar__title'>{details.title}</div>
                <button className='navbar__button' onClick={() => history.push(MOVIES_ROUTE)}>Back</button>
            </div>

        <div className='container__movie'>
            <div className='col__movie'>
                <img src={details.large_cover_image} className='img__movie'/>
            </div>
            <div className='col__movie'>
                <div className='title_long'>{details.title_long}</div>
                <div className='title__movie'>{details.title}</div>
                <div className='description'>{details.description_full}</div>
                <div className='comments'>Comments</div>
                <div>
                    <Comments id={id}/>
                </div>
            </div>
        </div>
        </div>
    );
};

export default FilmsPage;